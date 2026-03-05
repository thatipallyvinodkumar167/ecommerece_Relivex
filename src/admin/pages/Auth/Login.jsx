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
    IconButton
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Email as EmailIcon,
    Lock as LockIcon,
    HealthAndSafety as HospitalIcon
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { user, token } = await authService.login(email, password);
            login(user, token);
        } catch (err) {
            setError(err.message || 'Authentication failed');
            setLoading(false);
        }
    };

    return (
        <Box sx={{
            height: '100vh',
            display: 'flex',
            overflow: 'hidden',
            background: '#f8fafc'
        }}>
            {/* Left Side: Animated Brand Area */}
            <Box sx={{
                flex: 1,
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #008a45 0%, #064e3b 100%)',
                color: 'white',
                position: 'relative',
                p: 6
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <HospitalIcon sx={{ fontSize: 100, mb: 4, opacity: 0.9 }} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <Typography variant="h2" sx={{ fontWeight: 800, textAlign: 'center', mb: 2 }}>
                        HospEcom Admin
                    </Typography>
                    <Typography variant="h5" sx={{ opacity: 0.8, textAlign: 'center', maxWidth: 450 }}>
                        The complete ecosystem for Hospital Pain Treatment E-commerce management.
                    </Typography>
                </motion.div>

                {/* Floating Particles Mockup */}
                {[...Array(6)].map((_, i) => (
                    <Box
                        key={i}
                        component={motion.div}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 20, 0],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        sx={{
                            position: 'absolute',
                            width: 20 + i * 10,
                            height: 20 + i * 10,
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            top: `${20 + i * 12}% `,
                            left: `${10 + i * 15}% `,
                        }}
                    />
                ))}
            </Box>

            {/* Right Side: Login Form */}
            <Box sx={{
                flex: { xs: 1, md: 0.8 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%', maxWidth: 450 }}
                >
                    <Box className="glass-card" sx={{ p: { xs: 4, md: 6 } }}>
                        <Typography variant="h4" sx={{ mb: 1, fontWeight: 800, color: '#1e293b' }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                            Sign in to manage your medical commerce hub
                        </Typography>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit}>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    variant="outlined"
                                    placeholder="admin@hospecom.com"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="action" sx={{ mr: 1 }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    variant="outlined"
                                    placeholder="••••••••"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="action" sx={{ mr: 1 }} />
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
                            </motion.div>

                            <Box sx={{ textAlign: 'right', mt: 1, mb: 4 }}>
                                <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ fontWeight: 600, color: '#008a45' }}>
                                    Forgot Password?
                                </Link>
                            </Box>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    className="gradient-button"
                                    sx={{ py: 1.8, fontSize: '1.1rem' }}
                                >
                                    {loading ? 'Authenticating...' : 'Sign In'}
                                </Button>
                            </motion.div>
                        </form>

                        <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
                            New Administrator? {' '}
                            <Link component={RouterLink} to="/register" sx={{ fontWeight: 700 }}>
                                Create Account
                            </Link>
                        </Typography>
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
};

export default Login;
