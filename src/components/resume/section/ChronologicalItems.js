import React from 'react';
import Files from "./Files";

function ChronologicalItems(props) {

    function buildKey(name, index = '') {
        let mobile = props.isMobile === true ? 'mobile' : 'desktop'
        return [props.kkey, name, mobile, index].join('-')
    }

    return (
        <div className="resume-item" key={buildKey('item-chrono')}>
            <table key={buildKey('item-chrono-table')}>
                <tbody>
                {
                    props.items.map(function (item, index) {
                        return (
                            <>
                                <tr key={buildKey('-item-chrono-table-tr1', index)}>
                                    <td className="resume-item-period-field"><p
                                        className="resume-item-period">{item.period}</p></td>
                                    <td><p className="resume-chrono-item-title" itemProp="title">{item.title}</p></td>
                                </tr>
                                <tr key={buildKey('-item-chrono-table-tr2', index)}>
                                    <td></td>
                                    <td>
                                        {
                                            item.hasOwnProperty('orglink')
                                                ? <>
                                                    <a className="resume-item-organisation-link"
                                                       href={item.orglink}
                                                       target="_blank"
                                                       rel="noreferrer">
                                                        {/* eslint-disable-next-line react/style-prop-object */}
                                                        <p className="resume-item-organisation">
                                                            {item.organisation}
                                                        </p>
                                                    </a>
                                                </>
                                                : <p className="resume-item-organisation">{item.organisation}</p>
                                        }
                                    </td>
                                </tr>
                                <tr key={buildKey('-item-chrono-table-tr3', index)}>
                                    <td></td>
                                    <td className='resume-chrono-item-last no-print'>
                                        {item.hasOwnProperty('docs') ?
                                            <Files kkey={buildKey('item-chrono', index)}
                                                   files={item.docs}/> : null}
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
