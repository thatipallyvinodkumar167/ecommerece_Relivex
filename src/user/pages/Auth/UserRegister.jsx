import React, { useState } from 'react';
import {
    Box, Typography, Container, Paper, TextField,
    Button, Stack, InputAdornment, IconButton, Alert, Link,
    ToggleButton, ToggleButtonGroup
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Person as PersonIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    CheckCircle as SuccessIcon,
    Badge as AdminIcon,
    ShoppingBag as UserIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import authService from '../../../services/authService';
import { useAuth } from '../../../context/AuthContext';

const UnifiedRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [role, setRole] = useState('User');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (event, newRole) => {
        if (newRole !== null) {
            setRole(newRole);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const newUser = await authService.register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: role
            });

            setSuccess(true);
            setTimeout(() => {
                login(newUser, 'dummy_token_' + Date.now());
            }, 2000);
        } catch (err) {
            setError(err.message || 'Registration failed');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Container maxWidth="sm" sx={{ height: '80vh', display: 'flex', alignItems: 'center' }}>
                <Paper
                    component={motion.div}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    sx={{ p: 6, textAlign: 'center', borderRadius: '32px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}
                >
                    <SuccessIcon sx={{ fontSize: 80, color: '#00b259', mb: 2 }} />
                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>Account Created!</Typography>
                    <Typography color="textSecondary">Welcome to Relivex. Redirecting you as {role}...</Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: '32px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.03)'
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: '#1e293b' }}>Create Account</Typography>
                <Typography variant="body1" sx={{ color: '#64748b', mb: 4 }}>
                    Choose your account type and start today.
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 700, color: '#475569' }}>Registering as:</Typography>
                    <ToggleButtonGroup
                        value={role}
                        exclusive
                        onChange={handleRoleChange}
                        fullWidth
                        sx={{
                            '& .MuiToggleButton-root': {
                                py: 1.5,
                                borderRadius: '12px !important',
                                border: '1px solid #e2e8f0 !important',
                                textTransform: 'none',
                                fontWeight: 700,
                                gap: 1,
                                '&.Mui-selected': {
                                    bgcolor: '#00b259',
                                    color: 'white',
                                    '&:hover': { bgcolor: '#008a45' }
                                }
                            }
                        }}
                    >
                        <ToggleButton value="User">
                            <UserIcon /> Customer
                        </ToggleButton>
                        <ToggleButton value="Admin">
                            <AdminIcon /> Admin
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                <AnimatePresence>
                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 3, borderRadius: '12px' }}
                        >
                            {error}
                        </Alert>
                    )}
                </AnimatePresence>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2.5}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: '#94a3b8' }} />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: '16px' }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{ color: '#94a3b8' }} />
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: '16px' }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: '#94a3b8' }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                sx: { borderRadius: '16px' }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            InputProps={{
                                sx: { borderRadius: '16px' }
                            }}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                py: 2,
                                borderRadius: '16px',
                                bgcolor: role === 'Admin' ? '#2e3192' : '#00b259',
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                textTransform: 'none',
                                mt: 2,
                                '&:hover': { bgcolor: role === 'Admin' ? '#1e2163' : '#008a45' }
                            }}
                        >
                            {loading ? 'Creating Account...' : `Register as ${role}`}
                        </Button>
                    </Stack>
                </form>

                <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: '#64748b' }}>
                    Already have an account? {' '}
                    <Link component={RouterLink} to="/login" sx={{ color: '#00b259', fontWeight: 700, textDecoration: 'none' }}>
                        Login here
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default UnifiedRegister;
