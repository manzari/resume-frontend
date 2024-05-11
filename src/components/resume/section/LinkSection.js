import React from 'react';
import Section from "../Section";
import LinkListItem from "./LinkListItem";

function LinkSection(props) {
    return (
        <>
            <Section kkey={props.kkey + '-pn'} title={props.title} printNever>
                <LinkListItem kkey={props.kkey} links={props.links}/>
            </Section>
            <Section kkey={props.kkey + '-p'} title={props.title} printOnly>
                <LinkListItem kkey={props.kkey} links={props.links} print/>
            </Section>
        </>
    );
}

export default LinkSection;
