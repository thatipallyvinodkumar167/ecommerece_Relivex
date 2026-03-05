import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Alert,
    Snackbar,
    Container
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    LocalHospital as MedicalIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const VendorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // In a real app, we'd use vendorService.login
            // For this demo, let's use the shared auth context
            const success = await login(email, password);
            if (success) {
                setOpenSnackbar(true);
                setTimeout(() => navigate('/vendor/dashboard'), 1500);
            } else {
                setError('Invalid credentials or unauthorized role');
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                p: 2
            }}
        >
            <Container maxWidth="sm">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: '24px',
                            boxShadow: '0 20px 40px rgba(0, 138, 69, 0.1)',
                            border: '1px solid rgba(0, 138, 69, 0.1)',
                            textAlign: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: '16px',
                                bgcolor: '#008a45',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 24px'
                            }}
                        >
                            <MedicalIcon sx={{ color: '#fff', fontSize: 32 }} />
                        </Box>

                        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                            Vendor Portal
                        </Typography>
                        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                            Manage your medical supply store effortlessly
                        </Typography>

                        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Business Email"
                                variant="outlined"
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                variant="outlined"
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                component={motion.button}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                sx={{
                                    mt: 4,
                                    mb: 2,
                                    height: 56,
                                    borderRadius: '12px',
                                    bgcolor: '#008a45',
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    boxShadow: '0 8px 16px rgba(0, 138, 69, 0.2)',
                                    '&:hover': { bgcolor: '#064e3b' }
                                }}
                            >
                                Sign In to Dashboard
                            </Button>
                        </form>

                        <Box sx={{ mt: 3 }}>
                            <Typography color="textSecondary">
                                New vendor?{' '}
                                <Button
                                    onClick={() => navigate('/vendor/register')}
                                    sx={{ fontWeight: 700, color: '#008a45', textTransform: 'none' }}
                                >
                                    Apply Now
                                </Button>
                            </Typography>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert severity="success" sx={{ width: '100%', borderRadius: '12px' }}>
                    Welcome back! Accessing secure dashboard...
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default VendorLogin;
