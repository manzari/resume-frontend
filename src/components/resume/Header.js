import React from 'react';
import {useAuthContext} from "../useAuth";
import {FaMapMarkedAlt, FaTools, FaGitkraken, FaStackOverflow, FaPhone, FaGlobeEurope, FaFilePdf} from "react-icons/fa";
import FetchImg from "./FetchImg";

function Header(props) {
    const {getRole} = useAuthContext();

    function getIcons(icons) {
        let iconList = [];
        if (icons.hasOwnProperty('github')) {
            iconList.push(getIcon(icons.github, <FaGitkraken className={'fa'}/>, 'gh'))
        }
        if (icons.hasOwnProperty('stackexchange')) {
            iconList.push(getIcon(icons.stackexchange, <FaStackOverflow className={'fa'}/>, 'so'))
        }
        if (icons.hasOwnProperty('maplink')) {
            iconList.push(getIcon(icons.maplink, <FaMapMarkedAlt/>, 'ml'))
        }
        if (icons.hasOwnProperty('tel')) {
            iconList.push(getIcon('tel:' + icons.tel, <FaPhone/>, 'tel'))
        }
        if (icons.hasOwnProperty('website')) {
            iconList.push(getIcon(icons.website, <FaGlobeEurope/>, 'www'))
        }
        if (icons.hasOwnProperty('pdf')) {
            iconList.push(getIcon(icons.pdf, <FaFilePdf/>, 'pdf'))
        }
        if (getRole() === 'ADMIN') {
            iconList.push(
                <li className="icon-link-item" key={'icon-admin'}>
                    <a href="#" onClick={props.toggleAdminPanel} className="icon-link">
                        <FaTools/>
                    </a>
                </li>
            )
        }
        return iconList;
    }

    function getIcon(link, icon, key) {
        return (
            <li className="icon-link-item" key={'icon-' + key}>
                <a rel="noreferrer" href={link} target="_blank" className="icon-link">
                    {icon}
                </a>
            </li>
        )
    }

    function getPrintText() {
        if (props.resumeLink !== '') {
            return <>
                <p className="header-contact-info-label print-only">View this page online:</p>
                <p className="header-contact-info-link print-only">{props.resumeLink}</p>
            </>
        }
        return <p className="header-contact-info print-only">{props.email}</p>

    }

    return (
        <header className="page-header">
            <FetchImg className='avatar' filename={'avatar.png'}/>
            <h1 className="header-name">{props.fullName}</h1>
            <div className="title-bar no-print">
                <h2 className="header-title">{props.jobTitle}</h2>
                <ul className="icon-links no-print">
                    {getIcons(props.icons ?? []).map(icon => icon)}
                </ul>
            </div>
            <div className="executive-summary" itemProp="description">
                <p>{props.summary}</p>
            </div>
            {getPrintText()}
            <a href={"mailto:" + props.email} className="contact-button no-print" itemProp="email">Contact me</a>
        </header>
    )
        ;
}

export default Header;
