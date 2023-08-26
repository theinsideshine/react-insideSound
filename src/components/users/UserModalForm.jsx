import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import { UserForm } from "./UserForm";
import { useUsers } from "../../hooks/useUsers";

export const UserModalForm = () => {
  const { userSelected, handlerCloseUserForm } = useUsers();

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogTitle>
        {userSelected.id > 0 ? "Editar" : "Crear"} Usuarios
        <IconButton
          edge="end"
          color="inherit"
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
