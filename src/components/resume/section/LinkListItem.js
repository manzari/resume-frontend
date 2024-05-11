import React from 'react';

function LinkListItem(props) {
    return (
        <div className="resume-item">
            <ul className="resume-item-link-list">
                {
                    props.links.map(function (link, index) {
                        if (props.hasOwnProperty('print')) {
                            return (<li key={props.key + '-' + index}><strong>{link.text}</strong>: {link.link}</li>)
                        }
                        return (
                            <li key={props.key + '-' + index}>
                                <a href={link.link} target="_blank" rel='noreferrer'>{link.text}</a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default LinkListItem;
