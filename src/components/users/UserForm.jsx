import React, { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-checked': {
    color: theme.palette.primary.main,
  },
}));

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const UserForm = ({ userSelected, handlerCloseForm }) => {
  const { initialUserForm, handlerAddUser, errors } = useUsers();
  const theme = useTheme(); 

  const [userForm, setUserForm] = useState(initialUserForm);
  const [checked, setChecked] = useState(userForm.admin);
  const { id, username, password, email, admin } = userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: '',
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  const onCheckboxChange = () => {
    const newAdmin = !admin;
    setChecked(newAdmin);
    setUserForm({
      ...userForm,
      admin: newAdmin,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handlerAddUser(userForm);
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control my-3 w-75"
        placeholder="Username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.username}</p>

      {id > 0 || (
        <input
          className="form-control my-3 w-75"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
      )}
      <p className="text-danger">{errors?.password}</p>

      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <p className="text-danger">{errors?.email}</p>

      <CustomFormControlLabel
        control={
          <CustomCheckbox
            checked={admin}
            onChange={onCheckboxChange}
            name="admin"
          />
        }
        label="Admin"
      />

      <input type="hidden" name="id" value={id} />

      <div className="d-flex">
        <Button
          variant="contained"
          style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary, marginRight: '8px' }}
          type="submit"
        >
          {id > 0 ? 'Editar' : 'Crear'}
        </Button>

        {handlerCloseForm && (
          <Button
            variant="contained"
            style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary }}
            onClick={onCloseForm}
          >
            Cerrar
          </Button>
        )}
      </div>
    </form>
  );
};
