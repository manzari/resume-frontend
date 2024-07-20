import React from 'react';

function Footer(props) {
    function getPrintFooter() {
        let lines = []
        if (props.print.hasOwnProperty('github')) {
            lines.push('Github: ' + props.print.github)
        }
        if (props.print.hasOwnProperty('stackexchange')) {
            lines.push('Stackexchange: ' + props.print.stackexchange)
        }
        if (props.print.hasOwnProperty('tel')) {
            lines.push('Tel:  ' + props.print.tel)
        }
        if (props.print.hasOwnProperty('email')) {
            lines.push('E-Mail: ' + props.print.email)
        }
        if (props.print.hasOwnProperty('address')) {
            lines.push(props.print.address)
        }
        return lines
    }

    return (
        <>
            <footer className="page-footer no-print">
                {
                    props.children.map((child, key) => <p className="footer-line" key={'foot' + key}>{child}</p>)
                }
            </footer>
            <footer className="page-footer print-only">
                {
                    getPrintFooter().map((child, key) => <p className="footer-line" key={'foot-print-' + key}>{child}</p>)
                }
            </footer>
        </>
    )
        ;
}

export default Footer;
