import React from 'react';

function TextItem(props) {
    return (
        <div key={props.kkey + 'div'} className="resume-item-last">
            {
                props.link && props.link.length > 0
                    ? <p><a key={props.kkey + 'heading'}
                         className="resume-item-heading-link"
                         href={props.link}
                         target="_blank"
                         rel="noreferrer">
                        {props.title}</a></p>
                    : <p key={props.kkey + 'heading'} className="resume-item-heading">{props.title}</p>
            }
            <p key={props.kkey + 'short'} className="resume-item-details">{props.short}</p>
            <p key={props.kkey + 'desc'} className="resume-item-description">{props.description}</p>
        </div>
    );
}

export default TextItem;
