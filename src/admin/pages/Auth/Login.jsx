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
    Container,
    Avatar,
    useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    VerifiedUser as LogoIcon,
    ArrowForward as ArrowIcon,
    ChevronLeft as BackIcon
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import authService from '../../../services/authService';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { user, token } = await authService.login(email, password);
            login(user, token);
            // Redirection is handled in AuthContext or ProtectedRoute, 
            // but let's be explicit based on role if needed.
            if (user.role === 'Admin') navigate('/admin');
            else if (user.role === 'Vendor') navigate('/vendor');
            else navigate('/');
        } catch (err) {
            setError(err.message || 'Authentication failed');
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
            alignItems: 'center',
            justifyContent: 'center',
            py: 6
        }}>
            <Container maxWidth="sm">
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography variant="h4" sx={{
                            fontWeight: 900,
                            color: '#008a45',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 1.5,
                            mb: 1.5
                        }}>
                            <LogoIcon sx={{ fontSize: 45 }} /> RELIVEX
                        </Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ fontWeight: 600, letterSpacing: 0.5 }}>
                            CLINICAL RECOVERY & WELLNESS
                        </Typography>
                    </motion.div>
                </Box>

                <Paper
                    component={motion.div}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    sx={{
                        p: { xs: 4, md: 6 },
                        borderRadius: '40px',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(0,0,0,0.02)',
                        overflow: 'hidden'
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 1, color: '#1e293b' }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#64748b', mb: 4, fontWeight: 500 }}>
                        Login to access your personalized medical portal.
                    </Typography>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: 'hidden' }}
                            >
                                <Alert severity="error" sx={{ mb: 3, borderRadius: '16px' }}>{error}</Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="name@example.com"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: '#94a3b8' }} />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: '18px', height: 64 }
                                }}
                            />

                            <Box>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
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
                                        sx: { borderRadius: '18px', height: 64 }
                                    }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
                                    <Link
                                        component={RouterLink}
                                        to="/forgot-password"
                                        sx={{
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            color: '#008a45',
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        Forgot Password?
                                    </Link>
                                </Box>
                            </Box>

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                disabled={loading}
                                endIcon={!loading && <ArrowIcon />}
                                sx={{
                                    py: 2.2,
                                    borderRadius: '18px',
                                    bgcolor: '#008a45',
                                    fontWeight: 900,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    boxShadow: '0 12px 24px rgba(0, 138, 69, 0.2)',
                                    mt: 1,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: '#006d36',
                                        boxShadow: '0 15px 30px rgba(0, 138, 69, 0.3)',
                                        transform: 'translateY(-2px)'
                                    },
                                    '&:disabled': { bgcolor: '#e2e8f0' }
                                }}
                            >
                                {loading ? 'Securing Connection...' : 'Sign In to Portal'}
                            </Button>
                        </Stack>
                    </form>

                    <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                            New to Relivex? {' '}
                            <Link
                                component={RouterLink}
                                to="/register"
                                sx={{
                                    color: '#008a45',
                                    fontWeight: 900,
                                    textDecoration: 'none',
                                    '&:hover': { textDecoration: 'underline' }
                                }}
                            >
                                Create Medical Account
                            </Link>
                        </Typography>
                    </Box>
                </Paper>

                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Button
                        onClick={() => navigate('/')}
                        startIcon={<BackIcon />}
                        sx={{ color: '#94a3b8', fontWeight: 700, textTransform: 'none' }}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
