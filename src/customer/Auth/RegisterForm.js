import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem,
    IconButton, InputAdornment, Alert
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { register } from '../../state/Auth/Action';

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('ROLE_USER');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email);
    const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    const handleEmailChange = (event) => {
        const value = event.target.value;
        setEmail(value);
        setEmailValid(validateEmail(value));
    };

    const handlePasswordChange = (event) => {
        const value = event.target.value;
        setPassword(value);
        setPasswordValid(validatePassword(value));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const data = new FormData(event.currentTarget);
        const userData = {
            firstname: data.get('firstname'),
            lastname: data.get('lastname'),
            email,
            password,
            role,
        };

        const result = await dispatch(register(userData));
        setLoading(false);

      
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
                    <Grid item xs={12} sm={6}>
                    <label htmlFor="firstname" style={{ fontWeight: 'bold' }}>
                            FirstName 
                        </label>
                        <TextField
                            required
                            id="firstname"
                            name="firstname"
                            fullWidth
                            // autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <label htmlFor="lastname" style={{ fontWeight: 'bold' }}>
                            LastName
                        </label>
                        <TextField
                            required
                            id="lastname"
                            name="lastname"
                            fullWidth
                            // autoComplete="family-name"
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <label htmlFor="email" style={{ fontWeight: 'bold' }}>
                            Email
                        </label>
                        <TextField
                            required
                            id="email"
                            name="email"

                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                            error={!emailValid && email.length > 0}
                            helperText={!emailValid && email.length > 0 ? "Enter a valid email (abc@def.com)" : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <label htmlFor="password" style={{ fontWeight: 'bold' }}>
                            Password
                        </label>
                        <TextField
                            required
                            id="password"
                            name="password"
                           
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            value={password}
                            onChange={handlePasswordChange}
                            error={!passwordValid && password.length > 0}
                            helperText={!passwordValid && password.length > 0 ? "Password must be at least 8 characters, one uppercase, one lowercase, one number, and one special character." : ""}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <label htmlFor="role" style={{ fontWeight: 'bold' }}>Role</label>
                        <FormControl fullWidth>
                            
                            <Select
                                required
                              
                                id="role"
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem value="ROLE_USER">User</MenuItem>
                                <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}
                            fullWidth
                            disabled={!emailValid || !passwordValid || loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <div className="flex justify-center flex-col items-center">
                <div className="py-3 flex items-center">
                    <p>If you already have an account? </p>
                    <Button onClick={() => navigate("/login")} className="ml-2" size="small">
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
