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

    const data = useMemo(() => props.users.map(
        (user) => {
            return {
                id: user.id,
                name: user.name,
                username: user.username,
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
        <table {...getTableProps()} style={{border: 'solid 1px blue'}}>
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps()}
                            style={{
                                borderBottom: 'solid 3px red',
                                background: 'aliceblue',
                                color: 'black',
                                fontWeight: 'bold',
                            }}
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
                                    style={{
                                        padding: '10px',
                                        border: 'solid 1px gray',
                                        background: 'papayawhip',
                                    }}
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
    )
}

export default UsersTable;