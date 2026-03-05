import React, { useState } from 'react';
import {
    Box, Typography, Container, Paper, TextField,
    Button, Stack, InputAdornment, IconButton, Alert, Link,
    ToggleButton, ToggleButtonGroup, useTheme, Avatar
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Person as PersonIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    CheckCircle as SuccessIcon,
    Badge as AdminIcon,
    ShoppingBag as UserIcon,
    ArrowForward as ArrowIcon,
    VerifiedUser as LogoIcon
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
    const theme = useTheme();
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
                navigate(role === 'Admin' ? '/admin' : '/');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Registration failed');
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
            }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '40px', maxWidth: 450, boxShadow: '0 25px 50px rgba(0,0,0,0.1)' }}>
                        <Avatar sx={{ width: 100, height: 100, bgcolor: '#f0fdf4', mx: 'auto', mb: 3 }}>
                            <SuccessIcon sx={{ fontSize: 60, color: '#008a45' }} />
                        </Avatar>
                        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, color: '#008a45' }}>Success!</Typography>
                        <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
                            Your medical account is ready. Redirecting you as {role}...
                        </Typography>
                    </Paper>
                </motion.div>
            </Box>
        );
    }

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
            py: 6
        }}>
            <Container maxWidth="sm">
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#008a45', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                        <LogoIcon sx={{ fontSize: 40 }} /> RELIVEX
                    </Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 500 }}>
                        Clinical-Grade Medical Devices & Recovery
                    </Typography>
                </Box>

                <Paper
                    component={motion.div}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    sx={{
                        p: { xs: 4, md: 5 },
                        borderRadius: '40px',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(0,0,0,0.02)'
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>Join Us</Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 4 }}>
                        Create an account to start your recovery journey.
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 800, color: '#475569' }}>Are you a customer or administrator?</Typography>
                        <ToggleButtonGroup
                            value={role}
                            exclusive
                            onChange={handleRoleChange}
                            fullWidth
                            sx={{
                                gap: 2,
                                '& .MuiToggleButton-root': {
                                    py: 1.5,
                                    borderRadius: '16px !important',
                                    border: '1px solid #e2e8f0 !important',
                                    textTransform: 'none',
                                    fontWeight: 800,
                                    flex: 1,
                                    transition: 'all 0.3s ease',
                                    '&.Mui-selected': {
                                        bgcolor: '#008a45',
                                        color: 'white',
                                        boxShadow: '0 8px 16px rgba(0, 138, 69, 0.2)',
                                        '&:hover': { bgcolor: '#006d36' }
                                    },
                                    '&:hover': { bgcolor: '#f1f5f9' }
                                }
                            }}
                        >
                            <ToggleButton value="User">
                                <UserIcon sx={{ mr: 1 }} /> Customer
                            </ToggleButton>
                            <ToggleButton value="Admin">
                                <AdminIcon sx={{ mr: 1 }} /> Staff
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>

                    <AnimatePresence>
                        {error && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                                <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>{error}</Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
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
                                required
                                value={formData.email}
                                onChange={handleChange}
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
                                required
                                value={formData.password}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon sx={{ color: '#94a3b8' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
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
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                InputProps={{ sx: { borderRadius: '16px' } }}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                endIcon={!loading && <ArrowIcon />}
                                sx={{
                                    py: 2,
                                    borderRadius: '16px',
                                    bgcolor: '#008a45',
                                    fontWeight: 900,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    mt: 2,
                                    boxShadow: '0 12px 24px rgba(0, 138, 69, 0.2)',
                                    '&:hover': { bgcolor: '#006d36' }
                                }}
                            >
                                {loading ? 'Initializing...' : `Go to Dashboard`}
                            </Button>
                        </Stack>
                    </form>

                    <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, color: '#64748b', fontWeight: 500 }}>
                        Already have an account? {' '}
                        <Link
                            component={RouterLink}
                            to="/login"
                            sx={{ color: '#008a45', fontWeight: 800, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                        >
                            Sign In
                        </Link>
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default UnifiedRegister;
