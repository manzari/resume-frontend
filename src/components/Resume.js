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
            avatarLink={content.person.avatar ?? ''}
            fullName={content.person.fullName}
            jobTitle={content.person.jobTitle}
            summary={content.person.summary ?? ''}
            email={content.person.contact.email ?? ''}
            icons={{
                'github': content.person.social.github,
                'stackexchange': content.person.social.stackexchange,
                'maplink': content.person.contact.maplink,
                'tel': content.person.contact.tel,
                //  'website': content.person.social.website,
                //  'pdf': content.pdf,
            }}
            toggleAdminPanel={props.toggleAdminPanel}
        />)
    }

    function getFooter() {
        let content = props.resumeData.content || {};
        if (!content.hasOwnProperty('footer')) {
            return;
        }
        return (<Footer>{content.footer.map((line) => line)}</Footer>)
    }

    function getSections() {
        let content = props.resumeData.content || {};
        if (!content.hasOwnProperty('sections')) {
            return;
        }
        let sections = content.sections.map((section, sectionIndex) => {
            switch (true) {
                case section.hasOwnProperty('links'):
                    return section.links.map(
                        (links, index) => (
                            <LinkSection kkey={sectionIndex + '- links-' + index}
                                         title={links.title}
                                         links={links.links}/>)
                    )
                case section.hasOwnProperty('text'):
                    return section.text.map(
                        (text, index) => (
                            <TextSection kkey={sectionIndex + '-texts-' + index} items={text.items}/>
                        )
                    )
                case section.hasOwnProperty('time'):
                    return section.time.map(
                        (time, index) => (
                            <Section kkey={sectionIndex + '-time-' + index} title={time.title}>
                                <ChronologicalItems kkey={sectionIndex + '-time-i-' + index} items={time.items}
                                                    isMobile={isMobile}/>
                            </Section>
                        )
                    )
                default:
                    return '';
            }
        })
        return sections.map((section, index) => {
            section.key = 'section-' + index;
            return section;
        })
    }
}

export default Resume;
