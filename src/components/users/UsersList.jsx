import React from "react";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../auth/hooks/useAuth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {UserRow} from "./UserRow"; // Make sure to import the UserRow component correctly

export const UsersList = () => {
    const { users } = useUsers();
    const { login } = useAuth();

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Users Table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>username</TableCell>
                        <TableCell>email</TableCell>
                        <TableCell>admin</TableCell>
                        {!login.isAdmin || (
                            <>
                                <TableCell>update</TableCell>
                                <TableCell>remove</TableCell>
                            </>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(({ id, username, email, admin }) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                            admin={admin}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
