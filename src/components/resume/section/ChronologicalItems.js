import React from 'react';

function ChronologicalItems(props) {
    if (props.isMobile === true) {
        return props.items.map(function (item, index) {
            return (
                <div className="resume-item" key={props.kkey + '-item-chrono-mob-' + index}>
                    <table>
                        <tbody>
                        <tr>
                            <td className="resume-item-period-field"><p className="resume-item-period">{item.period}</p>
                            </td>
                        </tr>
                        <tr>
                            <td><p className="resume-item-title" itemProp="title">{item.title}</p></td>
                        </tr>
                        <tr>
                            <td>
                                {
                                    item.hasOwnProperty('orglink')
                                        ? <a className="resume-item-organisation-link"
                                             href={item.orglink}
                                             target="_blank"
                                             rel="noreferrer">
                                            <p className="resume-item-organisation resume-item-last">{item.organisation}</p>
                                        </a>
                                        :
                                        <p className="resume-item-organisation resume-item-last">{item.organisation}</p>
                                }
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        })
    }

    return (
        <div className="resume-item" key={props.kkey + '-item-chrono'}>
            <table key={props.kkey + '-item-chrono-table'}>
                <tbody>
                {
                    props.items.map(function (item, index) {
                        return (
                            <>
                                <tr key={props.kkey + index + '-item-chrono-table-tr1'}>
                                    <td className="resume-item-period-field"><p
                                        className="resume-item-period">{item.period}</p></td>
                                    <td><p className="resume-item-title" itemProp="title">{item.title}</p></td>
                                </tr>
                                <tr key={props.kkey + index + '-item-chrono-table-tr2'}>
                                    <td></td>
                                    <td>
                                        {
                                            item.hasOwnProperty('orglink')
                                                ?
                                                <a className="resume-item-organisation-link"
                                                   href={item.orglink}
                                                   target="_blank"
                                                   rel="noreferrer">
                                                    <p className="resume-item-organisation resume-item-last">{item.organisation}</p>
                                                </a>
                                                :
                                                <p className="resume-item-organisation resume-item-last">{item.organisation}</p>
                                        }
                                    </td>
                                </tr>
                            </>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

export default ChronologicalItems;
