import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    Alert,
    Snackbar,
    Container
} from '@mui/material';
import { LocalHospital as MedicalIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VendorRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setOpenSnackbar(true);
        setTimeout(() => navigate('/vendor/login'), 2000);
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
            <Container maxWidth="md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: '32px',
                            boxShadow: '0 20px 40px rgba(0, 138, 69, 0.1)',
                            border: '1px solid rgba(0, 138, 69, 0.1)'
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '12px',
                                    bgcolor: '#008a45',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px'
                                }}
                            >
                                <MedicalIcon sx={{ color: '#fff' }} />
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                Vendor Registration
                            </Typography>
                            <Typography color="textSecondary">
                                Join our network of certified medical suppliers
                            </Typography>
                        </Box>

                        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        onChange={handleChange}
                                        required
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Business Email"
                                        name="email"
                                        type="email"
                                        onChange={handleChange}
                                        required
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        onChange={handleChange}
                                        required
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Business Name"
                                        name="businessName"
                                        onChange={handleChange}
                                        required
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        onChange={handleChange}
                                        required
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        onChange={handleChange}
                                        required
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                    />
                                </Grid>
                            </Grid>

                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                size="large"
                                component={motion.button}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                sx={{
                                    mt: 4,
                                    mb: 2,
                                    height: 56,
                                    borderRadius: '12px',
                                    bgcolor: '#008a45',
                                    fontWeight: 700,
                                    '&:hover': { bgcolor: '#064e3b' }
                                }}
                            >
                                Complete Application
                            </Button>
                        </form>

                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Typography color="textSecondary">
                                Already have an account?{' '}
                                <Button
                                    onClick={() => navigate('/vendor/login')}
                                    sx={{ fontWeight: 700, color: '#008a45', textTransform: 'none' }}
                                >
                                    Log In
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
                    Registration successful! Redirecting to login...
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default VendorRegister;
