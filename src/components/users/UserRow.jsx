import React from "react";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../auth/hooks/useAuth";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const UserRow = ({ id, username, email, admin }) => {
    const { handlerUserSelectedForm, handlerRemoveUser } = useUsers();
    const { login } = useAuth();

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{username}</TableCell>
            <TableCell>{email}</TableCell>
            <TableCell>{admin ? "Si" : "No"}</TableCell>

            {!login.isAdmin || (
                <>
                    <TableCell>
                        <IconButton
                            size="small"
                            color="primary"
                            onClick={() =>
                                handlerUserSelectedForm({
                                    id,
                                    username,
                                    email,
                                    admin,
                                })
                            }
                        >
                            <EditIcon />
                        </IconButton>
                    </TableCell>

                    <TableCell>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => handlerRemoveUser(id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </TableCell>
                </>
            )}
        </TableRow>
    );
};
