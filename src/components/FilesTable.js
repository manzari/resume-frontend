import React, {useCallback, useMemo} from "react";
import {useTable} from 'react-table'
import {FaTrash} from "react-icons/fa";
import {useAuthContext} from "./useAuth";
import {getEnv} from "./getEnv";

function FilesTable(props) {
    const {token} = useAuthContext();
    const deleteFile = useCallback((filename) => {
        fetch(getEnv('API_URL') + '/file/' + filename, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(() => props.fetchFiles())

    }, [token, props]);

    const data = useMemo(() => props.files.map(
        (file) => {
            return {
                filename: file,
                actions: (<FaTrash onClick={() => deleteFile(file)}/>)
            }
        }), [props.files, deleteFile]);
    const columns = useMemo(() => [
        {Header: 'Filename', accessor: 'filename'},
        {Header: 'Actions', accessor: 'actions'}
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data})

    return (
        <div className="entity-table-wrapper">
            <table {...getTableProps()} className="entity-table">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                className="entity-table-th-header"
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className="entity-table-th"
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default FilesTable;