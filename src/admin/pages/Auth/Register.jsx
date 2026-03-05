import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Link,
    Alert,
    InputAdornment,
    IconButton,
    MenuItem
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    Person as PersonIcon,
    Phone as PhoneIcon
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'Admin'
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Mock registration
        console.log('Registering:', formData);

        // Auto login after registration
        const mockUser = {
            name: formData.fullName,
            email: formData.email,
            role: formData.role
        };
        login(mockUser, 'dummy_token_' + Date.now());
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #008a45 0%, #064e3b 100%)',
                py: 4
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 450,
                    borderRadius: 3,
                    textAlign: 'center'
                }}
            >
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#008a45' }}>
                    Admin Register
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
                    Create your hospital administrator account
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        margin="dense"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        margin="dense"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EmailIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        margin="dense"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        select
                        fullWidth
                        label="Role"
                        name="role"
                        margin="dense"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="Super Admin">Super Admin</MenuItem>
                    </TextField>
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        margin="dense"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        margin="dense"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                    >
                        Create Account
                    </Button>
                </form>

                <Typography variant="body2" sx={{ mt: 3 }}>
                    Already have an account? {' '}
                    <Link component={RouterLink} to="/login" fontWeight="bold">
                        Login here
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default Register;
