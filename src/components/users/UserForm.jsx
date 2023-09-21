import { useEffect, useState } from "react"
import { useUsers } from "../../hooks/useUsers";
import { Button } from "@mui/base";
import { useTheme } from '@mui/material/styles'; // Importa useTheme
export const UserForm = ({ userSelected, handlerCloseForm }) => {

    const { initialUserForm, handlerAddUser, errors } = useUsers();
    const theme = useTheme(); // Obtiene el tema personalizado
    
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
        // console.log(target.value)
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value,
        })
    }

    const onCheckboxChange = () => {

        const newAdmin = !admin;
        setChecked(newAdmin);
        setUserForm({
            ...userForm,
            admin: newAdmin,
        }
        );
    }

    const onSubmit = (event) => {
        event.preventDefault();
       
        // guardar el user form en el listado de usuarios
        handlerAddUser(userForm);
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }
    return (
       
      
        <form onSubmit={ onSubmit }>
            <input
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={ username}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.username}</p>
            
            { id > 0 || <input
                className="form-control my-3 w-75"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={onInputChange} />}
            <p className="text-danger">{errors?.password}</p>
            
            <input
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
            <p className="text-danger">{errors?.email}</p>

            <div className="my-3 form-check">
                <input type="checkbox"
                    name="admin"
                    checked={admin}
                    className="form-check-input"
                    onChange={onCheckboxChange}
                />
                <label className="form-check-label">Admin</label>
            </div>

            <input type="hidden"
                name="id"
                value={id} />
            
            <Button
                variant="contained" // Puedes ajustar el tipo de botón (contained, outlined, etc.)
                style={{ color: theme.palette.primary.main }}
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </Button>

            {!handlerCloseForm || <Button
                
                variant="contained" // Puedes ajustar el tipo de botón (contained, outlined, etc.)
                style={{ color: theme.palette.primary.main }}
                onClick={() => onCloseForm()}>
                Cerrar
            </Button>}
            
        </form>
        
    )
}