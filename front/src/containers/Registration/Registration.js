import React, {useEffect, useState} from 'react';
import {Box, Container, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useDispatch, useSelector} from "react-redux";
import {clearRegisterErrors, registerUser} from "../../store/actions/usersActions";
import InputField from "../../components/UI/Form/InputField/InputField";
import FileInput from "../../components/UI/Form/FileInput/FileInput";

const Registration = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.registerLoading);
    const error = useSelector(state => state.users.registerError);

    const [user, setUser] = useState({
        displayName: '',
        password: '',
        email: '',
        avatarImage: ''
    });

    useEffect(() => {
        return () => {
            dispatch(clearRegisterErrors());
        }
    }, [dispatch]);

    const onChange = e => {
        const {name, value} = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onFileChange = e => {
        const name = e.target.name;
        const file = e.target.files[0];

        setUser(prev => ({...prev, [name]: file}));
    };

    const onSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(user).forEach(key => {
            formData.append(key, user[key]);
        });
        dispatch(registerUser(formData));
    };

    const getFieldError = fieldName => {
        try{
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{paddingTop: 6}}>
                <Typography component="h1" variant="h5" color="#fff">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={onSubmit}>
                    <InputField
                        name="email"
                        value={user.email}
                        onChange={onChange}
                        label="Email"
                        required={true}
                        error={getFieldError('email')}
                        margin="dense"
                        type="email"
                    />
                    <InputField
                        name="displayName"
                        value={user.displayName}
                        onChange={onChange}
                        label="Display Name"
                        required={true}
                        error={getFieldError('displayName')}
                        margin="dense"
                    />
                    <InputField
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        label="Password"
                        type="password"
                        required={true}
                        error={getFieldError('password')}
                        margin="dense"
                    />
                    <Box marginTop={1}>
                        <FileInput
                            name="avatarImage"
                            onChange={onFileChange}
                            label="Avatar Image"
                            error={getFieldError('avatarImage')}
                        />
                    </Box>
                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={loading}
                        disabled={loading}
                        loadingPosition="start"
                        startIcon={<AccountCircleIcon />}
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Link to="/login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Registration;