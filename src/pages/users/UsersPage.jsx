import React, { useEffect } from "react";
import { UserModalForm } from "../../components/users/UserModalForm";
import { UsersList } from "../../components/users/UsersList";
import { useUsers } from "../../hooks/useUsers";
import { useAuth } from "../../auth/hooks/useAuth";
import { Paginator } from "../../components/users/Paginator";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import LoadingIndicator from "../../components/layout/LoadingIndicator";

export const UsersPage = () => {
    const { page } = useParams();
    const {
        users,
        visibleForm,
        isLoading,
        paginator,
        handlerOpenUserForm,
        getUsers,
    } = useUsers();

    const { login } = useAuth();

    useEffect(() => {
        getUsers(page);
    }, [page]);

    if (isLoading) {
        return (
               <LoadingIndicator/>
            );
    }

    return (
        <>
            {!visibleForm || <UserModalForm />}
            <Container maxWidth="md" sx={{ marginTop: 4 }}>
               
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isAdmin) || (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ my: 2 }}
                                onClick={handlerOpenUserForm}
                            >
                                Nuevo Usuario
                            </Button>
                        )}

                        {users.length === 0 ? (
                            <Alert severity="warning">No hay usuarios en el sistema!</Alert>
                        ) : (
                            <>
                                <UsersList />
                                <Paginator url="/users/page" paginator={paginator} />
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </>
    );
};
