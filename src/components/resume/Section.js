import React from 'react';

function Section(props) {
    let print = '';
    if (props.hasOwnProperty('printOnly')) {
        print = " print-only"
    } else if (props.hasOwnProperty('printNever')) {
        print = " no-print"
    }
    return (
        <section className={"content-section" + print}>
            <header className="section-header">
                <h2>{props.title}</h2>
            </header>
            {props.children}
        </section>
    );
}

export default Section;
