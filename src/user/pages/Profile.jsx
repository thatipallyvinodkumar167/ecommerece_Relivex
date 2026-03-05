import React from 'react';
import {
    Box, Typography, Container, Paper, Avatar,
    Button, Grid, TextField, Stack, IconButton, Divider
} from '@mui/material';
import {
    Edit as EditIcon,
    Logout as LogoutIcon,
    History as HistoryIcon,
    Security as SecurityIcon,
    Notifications as NotificationIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 4 }}>My Profile</Typography>

            <Grid container spacing={4}>
                {/* Profile Card */}
                <Grid item xs={12} md={4}>
                    <Paper
                        component={motion.div}
                        whileHover={{ y: -5 }}
                        sx={{
                            p: 4, textAlign: 'center', borderRadius: '24px',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.03)'
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 100, height: 100, mx: 'auto', mb: 2,
                                bgcolor: '#00b259', fontSize: '2.5rem', fontWeight: 900
                            }}
                        >
                            {user.name.charAt(0)}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>{user.name}</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>{user.email}</Typography>

                        <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700 }}
                        >
                            Edit Profile
                        </Button>
                    </Paper>

                    <Paper sx={{ mt: 3, p: 2, borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <Stack spacing={1}>
                            <Button fullWidth align="left" startIcon={<HistoryIcon />} component={Link} to="/orders" sx={{ justifyContent: 'flex-start', color: '#1e293b' }}>
                                Order History
                            </Button>
                            <Button fullWidth align="left" startIcon={<NotificationIcon />} sx={{ justifyContent: 'flex-start', color: '#1e293b' }}>
                                Notifications
                            </Button>
                            <Button fullWidth align="left" startIcon={<SecurityIcon />} sx={{ justifyContent: 'flex-start', color: '#1e293b' }}>
                                Privacy & Security
                            </Button>
                            <Divider sx={{ my: 1 }} />
                            <Button
                                fullWidth align="left"
                                startIcon={<LogoutIcon />}
                                onClick={logout}
                                sx={{ justifyContent: 'flex-start', color: '#ef4444' }}
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Account Settings */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 4, borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Account Information</Typography>
                        <Stack spacing={3}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Full Name" defaultValue={user.name} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Email Address" defaultValue={user.email} disabled />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Phone Number" defaultValue="+91 9876543210" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Role" defaultValue={user.role} disabled />
                                </Grid>
                            </Grid>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: '#00b259', borderRadius: '12px', px: 4,
                                        '&:hover': { bgcolor: '#008a45' }, fontWeight: 700
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </Box>
                        </Stack>

                        <Divider sx={{ my: 4 }} />

                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Change Password</Typography>
                        <Stack spacing={3}>
                            <TextField fullWidth label="Current Password" type="password" />
                            <TextField fullWidth label="New Password" type="password" />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button variant="outlined" sx={{ borderRadius: '12px', px: 4, fontWeight: 700 }}>
                                    Update Password
                                </Button>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
