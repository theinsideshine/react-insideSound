import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { UserForm } from "./UserForm";
import { useUsers } from "../../hooks/useUsers";
import { useTheme } from '@mui/material/styles'; // Importa useTheme

export const UserModalForm = () => {
  const theme = useTheme(); // Obtiene el tema personalizado
  const { userSelected, handlerCloseUserForm } = useUsers();

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogTitle>
        {userSelected.id > 0 ? "Editar" : "Crear"} Usuarios
        <IconButton
          edge="end"
          style={{ color: theme.palette.primary.main }}
          onClick={handlerCloseUserForm}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <UserForm userSelected={userSelected} handlerCloseForm={handlerCloseUserForm} />
      </DialogContent>
    </Dialog>
  );
};
