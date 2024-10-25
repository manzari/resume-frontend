import React from 'react';

function Footer(props) {
    function hasContactDetails() {
        return (
            props.print.hasOwnProperty('tel')
            || props.print.hasOwnProperty('email')
            || props.print.hasOwnProperty('address')
        );
    }

    function getContactDetails() {
        let elements = []
        if (props.print.hasOwnProperty('tel')) {
            elements.push('Tel:  ' + props.print.tel)
        }
        if (props.print.hasOwnProperty('email')) {
            elements.push('E-Mail: ' + props.print.email)
        }
        if (props.print.hasOwnProperty('address')) {
            elements.push(props.print.address)
        }
        return elements.map((child, key) => <p className="footer-line" key={'foot' + key}>{child}</p>)
    }

    function hasLinks() {
        return (
            props.print.hasOwnProperty('github')
            || props.print.hasOwnProperty('stackexchange')
        );
    }

    function getLinks() {
        let elements = []
        if (props.print.hasOwnProperty('github')) {
            elements.push('Github: ' + props.print.github)
        }
        if (props.print.hasOwnProperty('stackexchange')) {
            elements.push('Stackexchange: ' + props.print.stackexchange)
        }
        return elements.map((child, key) => <p className="footer-line" key={'foot' + key}>{child}</p>)
    }

    function getPrintFooter() {
        let elements = []
        if (hasContactDetails()) {
            elements.push(<p className="footer-heading">Contact Details:</p>)
            elements = elements.concat(getContactDetails())
            elements.push(<br/>)
        }
        if (hasLinks()) {
            elements.push(<p className="footer-heading">Links:</p>)
            elements = elements.concat(getLinks())
        }
        return elements
    }

    function getWebFooter(props) {
        return props.children.map((child, key) => <p className="footer-line" key={'foot' + key}>{child}</p>)
    }

    return (
        <>
            <footer className="page-footer print-only">
                {getPrintFooter()}
            </footer>
            <footer className="page-footer no-print">
                {getWebFooter(props)}
            </footer>
        </>
    )
        ;
}

export default Footer;
