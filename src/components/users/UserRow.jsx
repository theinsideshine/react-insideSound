import React from "react";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../auth/hooks/useAuth";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from '@mui/material/styles'; // Importa useTheme

export const UserRow = ({ id, username, email, admin , isMobile}) => {
    const theme = useTheme(); // Obtiene el tema personalizado
    const { handlerUserSelectedForm, handlerRemoveUser } = useUsers();
    const { login } = useAuth();

    return (
        <TableRow>            
            <TableCell>{username}</TableCell>
            {!isMobile && <TableCell>{email}</TableCell>}
            {!isMobile && <TableCell>{admin ? "Si" : "No"}</TableCell>}

            {!login.isAdmin || (
                <>
                    <TableCell>
                        <IconButton
                            size="small"
                            style={{ color: theme.palette.primary.main }}
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
                            style={{ color: theme.palette.primary.main }}
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
