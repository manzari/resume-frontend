import React, {useCallback, useEffect} from 'react';
import Header from "./resume/Header";
import Section from "./resume/Section";
import Footer from "./resume/Footer";
import ChronologicalItems from "./resume/section/ChronologicalItems";
import {useMediaQuery} from 'react-responsive';
import {useAuthContext} from "./useAuth";
import LinkSection from "./resume/section/LinkSection";
import TextSection from "./resume/section/TextSection";
import {getEnv} from "./getEnv";

function Resume(props) {
    const isMobile = useMediaQuery({query: `(max-width: 760px)`});
    const {token} = useAuthContext();
    const setResumeData = props.setResumeData;

    const fetchResumeData = useCallback(() => fetch(getEnv('API_URL') + '/resume/1', {
        headers: {
            Authorization: "Bearer " + token
        }
    })
        .then((response) => response.json()), [token]);

    useEffect(() => {
        fetchResumeData().then((data) => {
            setResumeData(data);
        });
    }, [fetchResumeData, setResumeData]);


    return (
        <div className="wrapper" itemScope itemType="https://schema.org/Person">
            {getHeader()}
            {getSections()}
            {getFooter()}
        </div>
    );

    function getHeader() {
        let content = props.resumeData.content || {};
        if (!content.hasOwnProperty('person')) {
            return (<Header toggleAdminPanel={props.toggleAdminPanel}/>);
        }
        return (<Header
            fullName={content.person.fullName}
            jobTitle={content.person.jobTitle}
            summary={content.person.summary ?? ''}
            email={content.person.contact.email ?? ''}
            resumeLink={content.person.contact.resumeLink ?? ''}
            icons={{
                'github': content.person.social.github,
                'stackexchange': content.person.social.stackexchange,
                'maplink': content.person.contact.maplink,
                'tel': content.person.contact.tel
        }}
            toggleAdminPanel={props.toggleAdminPanel}
        />)
    }

    function getFooter() {
        let content = props.resumeData.content || {};
        if (!content.hasOwnProperty('footer')) {
            return;
        }
        return (<Footer print={{
            'github': content.person.social.github,
            'stackexchange': content.person.social.stackexchange,
            'address': content.person.contact.address,
            'tel': content.person.contact.tel,
            'email': content.person.contact.email
        }}>{content.footer.map((line) => line)}</Footer>)
    }

    function getSections() {
        let content = props.resumeData.content || {};
        if (!content.hasOwnProperty('sections')) {
            return;
        }
        let sections = content.sections.map((section, sectionIndex) => {
            if (!section.hasOwnProperty('type')
                || !section.hasOwnProperty('items')
                || !section.hasOwnProperty('title')
                || !section.hasOwnProperty('order')
            ) {
                return <></>
            }
            section.items.sort((a, b) => a.order - b.order);
            switch (section.type) {
                case 'links':
                    return <LinkSection kkey={sectionIndex + '- links-' + section.order}
                                        title={section.title}
                                        links={section.items}/>
                case 'text':
                    return <TextSection kkey={sectionIndex + '-texts-' + section.order}
                                        title={section.title}
                                        items={section.items}/>
                case 'time':
                    return <Section kkey={sectionIndex + '-time-' + section.order}
                                    title={section.title}>
                        <ChronologicalItems kkey={sectionIndex + '-time-i-' + section.order}
                                            items={section.items}
                                            isMobile={isMobile}/>
                    </Section>
                default:
                    return <></>
            }
        })

        return sections.sort((a, b) => a.order - b.order);
    }
}

export default Resume;
