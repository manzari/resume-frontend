import React from 'react';

function Footer(props) {
    return (
        <footer className="page-footer">
            {
                props.children.map((child, key) => <p className="footer-line" key={'foot' + key}>{child}</p>)
            }
        </footer>
    );
}

export default Footer;
