import React, {useCallback, useMemo} from "react";
import {useTable} from 'react-table'
import {FaTrash} from "react-icons/fa";
import {useAuthContext} from "./useAuth";
import {getEnv} from "./getEnv";

function UsersTable(props) {
    const {token} = useAuthContext();
    const deleteUser = useCallback((id) => {
        fetch(getEnv('API_URL') + '/user/' + id, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(() => props.fetchUsersData())

    }, [token]);

    function trimUsername(username) {
        if (!username) {
            return null;
        }
        if (username.length < 48) {
            return username
        }
        return username.slice(0, 48 - 3) + '...';
    }

    const data = useMemo(() => props.users.map(
        (user) => {
            return {
                id: user.id,
                name: user.name,
                username: trimUsername(user.username),
                role: user.role,
                actions: (<FaTrash onClick={() => deleteUser(user.id)}/>)
            }
        }), [props.users, deleteUser]);
    const columns = useMemo(() => [
        {Header: 'Id', accessor: 'id'},
        {Header: 'Name', accessor: 'name'},
        {Header: 'Username', accessor: 'username'},
        {Header: 'Role', accessor: 'role'},
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

export default UsersTable;