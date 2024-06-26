import React from 'react';
import Section from "../Section";
import TextItem from "./TextItem";

function TextSection(props) {
    return (
        <>
            <Section key={props.kkey} kkey={props.kkey} title={props.title}>
                {
                    props.items.map(function (item, index) {
                        return (
                            <TextItem
                                title={item.title}
                                description={item.description ?? ''}
                                short={item.short ?? ''}
                                kkey={props.kkey + '-' + index}
                                key={props.kkey + '-' + index}
                                link={item.link}
                            />
                        )
                    })
                }
            </Section>
        </>
    );
}

export default TextSection;
