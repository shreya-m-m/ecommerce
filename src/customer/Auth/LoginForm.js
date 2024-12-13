import React, { useState } from 'react';
import { Button, TextField, Grid, Alert, InputAdornment, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../state/Auth/Action';

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const data = new FormData(event.currentTarget);
        const userData = {
            email: data.get("email"),
            password: data.get("password"),
        };
    
        const result = await dispatch(login(userData)); // Dispatch login action and await result
    
        if (result.success) {
            setErrorMessage(""); // Clear error message on success
            navigate('/'); // Navigate to another route on success
        } else {
            setErrorMessage(result.error); // Display the error message on failure
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {errorMessage && (
                        <Grid item xs={12}>
                            <Alert severity="error">{errorMessage}</Alert> 
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <label htmlFor="email" style={{ fontWeight: 'bold' }}>
                            Email
                        </label>
                        <TextField
                            required
                            id='email'
                            name="email"
                            fullWidth
                            autoComplete='email'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label htmlFor="password" style={{ fontWeight: 'bold' }}>
                            Password
                        </label>
                        <TextField
                            required
                            id='password'
                            name="password"
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                            fullWidth
                            autoComplete='current-password'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            className='bg-[#9155FD] w-full'
                            type='submit'
                            variant='contained'
                            size='large'
                            sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div className='flex justify-center flex-col items-center'>
                <div className='py-3 flex items-center'>
                    <p>If you don't have an account?</p>
                    <Button onClick={() => navigate("/register")} className='ml-5' size="small">Register</Button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
