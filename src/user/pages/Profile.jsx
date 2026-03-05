import React from 'react';
import {
    Box, Typography, Container, Paper, Avatar,
    Button, Grid, TextField, Stack, IconButton, Divider,
    Card, CardContent, Chip, useTheme
} from '@mui/material';
import {
    Edit as EditIcon,
    Logout as LogoutIcon,
    History as HistoryIcon,
    Security as SecurityIcon,
    Notifications as NotificationIcon,
    LocationOn as LocationIcon,
    Payment as PaymentIcon,
    ChevronRight as RightIcon,
    VerifiedUser as VerifiedIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();

    if (!user) return null;

    const menuItems = [
        { icon: <HistoryIcon />, label: 'My Orders', desc: 'Track and manage your orders', path: '/orders', color: '#3b82f6' },
        { icon: <LocationIcon />, label: 'Saved Addresses', desc: 'Manage your delivery locations', path: '#', color: '#ef4444' },
        { icon: <PaymentIcon />, label: 'Payment Methods', desc: 'Manage your cards and UPI', path: '#', color: '#10b981' },
        { icon: <NotificationIcon />, label: 'Notifications', desc: 'Manage alerts and updates', path: '#', color: '#f59e0b' },
        { icon: <SecurityIcon />, label: 'Privacy & Security', desc: 'Manage your account safety', path: '#', color: '#6366f1' },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 6 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>Account Settings</Typography>
                <Typography variant="body1" color="textSecondary">Manage your profile and preferences</Typography>
            </Box>

            <Grid container spacing={6}>
                {/* Left: Profile Overview */}
                <Grid item xs={12} md={4}>
                    <Stack spacing={4}>
                        <Card sx={{
                            borderRadius: '32px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(0,0,0,0.04)',
                            textAlign: 'center',
                            p: 4,
                            background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)'
                        }}>
                            <Box sx={{ position: 'relative', display: 'inline-block', mx: 'auto', mb: 3 }}>
                                <Avatar
                                    sx={{
                                        width: 120, height: 120,
                                        bgcolor: '#008a45', fontSize: '3rem', fontWeight: 900,
                                        boxShadow: '0 10px 30px rgba(0, 138, 69, 0.2)'
                                    }}
                                >
                                    {user.name.charAt(0)}
                                </Avatar>
                                <IconButton sx={{
                                    position: 'absolute', bottom: 0, right: 0,
                                    bgcolor: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    '&:hover': { bgcolor: '#f1f5f9' }
                                }}>
                                    <EditIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </Box>

                            <Typography variant="h5" sx={{ fontWeight: 900 }}>{user.name}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mb: 3 }}>
                                <VerifiedIcon sx={{ color: '#008a45', fontSize: 18 }} />
                                <Typography variant="caption" sx={{ color: '#008a45', fontWeight: 700, textTransform: 'uppercase' }}>
                                    Verified Member
                                </Typography>
                            </Box>

                            <Stack spacing={2}>
                                <Chip
                                    label={user.email}
                                    sx={{ bgcolor: '#f1f5f9', fontWeight: 700, borderRadius: '12px' }}
                                />
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={logout}
                                    startIcon={<LogoutIcon />}
                                    sx={{
                                        borderRadius: '16px',
                                        py: 1.5,
                                        fontWeight: 800,
                                        textTransform: 'none',
                                        borderWidth: '2px',
                                        '&:hover': { borderWidth: '2px' }
                                    }}
                                >
                                    Sign Out
                                </Button>
                            </Stack>
                        </Card>

                        <Paper sx={{ p: 3, borderRadius: '24px', bgcolor: '#f0fdf4', border: '1px solid #dcfce7' }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#166534', mb: 1 }}>Premium Support</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ color: '#15803d', display: 'block', mb: 2 }}>
                                As a verified member, you have access to 24/7 priority medical support.
                            </Typography>
                            <Button size="small" sx={{ fontWeight: 800, color: '#008a45' }}>Contact Expert</Button>
                        </Paper>
                    </Stack>
                </Grid>

                {/* Right: Quick Links & Settings */}
                <Grid item xs={12} md={8}>
                    <Stack spacing={4}>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Quick Navigation</Typography>
                            <Grid container spacing={2}>
                                {menuItems.map((item, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Card
                                            component={motion.div}
                                            whileHover={{ x: 5 }}
                                            onClick={() => item.path !== '#' && navigate(item.path)}
                                            sx={{
                                                p: 2,
                                                borderRadius: '20px',
                                                cursor: 'pointer',
                                                border: '1px solid rgba(0,0,0,0.03)',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                                                '&:hover': { bgcolor: '#f8fafc' }
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                                                <Avatar sx={{ bgcolor: `${item.color}15`, color: item.color, borderRadius: '12px' }}>
                                                    {item.icon}
                                                </Avatar>
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{item.label}</Typography>
                                                    <Typography variant="caption" color="textSecondary">{item.desc}</Typography>
                                                </Box>
                                                <RightIcon sx={{ color: '#94a3b8' }} />
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>

                        <Card sx={{ p: 4, borderRadius: '32px', border: '1px solid rgba(0,0,0,0.04)' }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>Account Information</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth label="Full Name" defaultValue={user.name}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth label="Phone Number" defaultValue="+91 98765 43210"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth label="Email Address" defaultValue={user.email} disabled
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 4,
                                    bgcolor: '#008a45',
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '16px',
                                    fontWeight: 800,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: '#006d36' }
                                }}
                            >
                                Update Information
                            </Button>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Profile;
