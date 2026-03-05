import React, { useState } from 'react';
import {
    AppBar, Toolbar, Typography, Button, IconButton, Badge,
    Box, Avatar, Menu, MenuItem, Divider, Tooltip, Container, Stack,
    useScrollTrigger
} from '@mui/material';
import {
    ShoppingCart as CartIcon,
    Person as ProfileIcon,
    ShoppingBag as OrdersIcon,
    Logout as LogoutIcon,
    LocalHospital as HospitalIcon,
    Search as SearchIcon,
    NotificationsNone as NotificationIcon
} from '@mui/icons-material';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const ElevationScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
        sx: {
            backgroundColor: trigger ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: trigger ? 'none' : '1px solid rgba(0,0,0,0.05)',
            transition: 'all 0.3s ease-in-out'
        }
    });
};

const UserLayout = (props) => {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f8fafc' }}>
            <ElevationScroll {...props}>
                <AppBar position="sticky" sx={{ color: '#064e3b' }}>
                    <Container maxWidth="lg">
                        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 }, height: 80 }}>
                            {/* Logo */}
                            <Typography
                                variant="h5"
                                component={Link}
                                to="/"
                                sx={{
                                    fontWeight: 900,
                                    color: '#008a45',
                                    textDecoration: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5
                                }}
                            >
                                <Box sx={{
                                    bgcolor: '#008a45',
                                    p: 1,
                                    borderRadius: '12px',
                                    color: 'white',
                                    display: 'flex',
                                    boxShadow: '0 8px 16px rgba(0, 138, 69, 0.2)'
                                }}>
                                    <HospitalIcon />
                                </Box>
                                <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    Relivex
                                </Box>
                            </Typography>

                            {/* Center Navigation - Desktop */}
                            <Stack
                                direction="row"
                                spacing={4}
                                sx={{ display: { xs: 'none', md: 'flex' } }}
                            >
                                <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: '#1e293b', fontWeight: 700, '&:hover': { color: '#008a45' } }}>Home</Typography>
                                <Typography component={Link} to="/" sx={{ textDecoration: 'none', color: '#1e293b', fontWeight: 700, '&:hover': { color: '#008a45' } }}>Shop</Typography>
                                <Typography sx={{ cursor: 'pointer', color: '#1e293b', fontWeight: 700, '&:hover': { color: '#008a45' } }}>About</Typography>
                                <Typography sx={{ cursor: 'pointer', color: '#1e293b', fontWeight: 700, '&:hover': { color: '#008a45' } }}>Support</Typography>
                            </Stack>

                            {/* Right Actions */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
                                <IconButton sx={{ color: '#64748b' }}>
                                    <SearchIcon />
                                </IconButton>

                                <IconButton sx={{ color: '#64748b' }}>
                                    <NotificationIcon />
                                </IconButton>

                                <Tooltip title="Your Cart">
                                    <IconButton
                                        component={Link}
                                        to="/cart"
                                        sx={{
                                            bgcolor: cartCount > 0 ? 'rgba(0, 138, 69, 0.1)' : 'transparent',
                                            color: cartCount > 0 ? '#008a45' : '#64748b',
                                            '&:hover': { bgcolor: 'rgba(0, 138, 69, 0.2)' }
                                        }}
                                    >
                                        <Badge
                                            badgeContent={cartCount}
                                            color="error"
                                            component={motion.div}
                                            animate={cartCount > 0 ? { scale: [1, 1.2, 1] } : {}}
                                        >
                                            <CartIcon />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>

                                <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 2, display: { xs: 'none', sm: 'block' } }} />

                                {user ? (
                                    <>
                                        <Box
                                            onClick={handleMenu}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                cursor: 'pointer',
                                                p: 0.5,
                                                pr: 1.5,
                                                borderRadius: '12px',
                                                '&:hover': { bgcolor: 'rgba(0,0,0,0.03)' }
                                            }}
                                        >
                                            <Avatar sx={{
                                                bgcolor: '#008a45',
                                                width: 38,
                                                height: 38,
                                                boxShadow: '0 4px 12px rgba(0, 138, 69, 0.2)'
                                            }}>
                                                {user.name.charAt(0)}
                                            </Avatar>
                                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                                <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>{user.name}</Typography>
                                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>Patient</Typography>
                                            </Box>
                                        </Box>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            PaperProps={{
                                                elevation: 0,
                                                sx: {
                                                    mt: 1.5,
                                                    borderRadius: '16px',
                                                    filter: 'drop-shadow(0px 10px 25px rgba(0,0,0,0.1))',
                                                    border: '1px solid rgba(0,0,0,0.05)',
                                                    minWidth: 220,
                                                    p: 1
                                                }
                                            }}
                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        >
                                            <MenuItem component={Link} to="/profile" onClick={handleClose} sx={{ borderRadius: '10px' }}>
                                                <ProfileIcon sx={{ mr: 2, fontSize: 20, color: '#64748b' }} /> Profile Settings
                                            </MenuItem>
                                            <MenuItem component={Link} to="/orders" onClick={handleClose} sx={{ borderRadius: '10px' }}>
                                                <OrdersIcon sx={{ mr: 2, fontSize: 20, color: '#64748b' }} /> My Trackings
                                            </MenuItem>
                                            <Divider sx={{ my: 1 }} />
                                            <MenuItem onClick={() => { handleClose(); logout(); }} sx={{ color: '#ef4444', fontWeight: 700, borderRadius: '10px' }}>
                                                <LogoutIcon sx={{ mr: 2, fontSize: 20 }} /> Sign Out
                                            </MenuItem>
                                        </Menu>
                                    </>
                                ) : (
                                    <Button
                                        component={Link}
                                        to="/login"
                                        variant="contained"
                                        sx={{
                                            bgcolor: '#008a45',
                                            borderRadius: '12px',
                                            px: 4,
                                            fontWeight: 800,
                                            boxShadow: '0 8px 16px rgba(0, 138, 69, 0.2)',
                                            '&:hover': { bgcolor: '#006d36' }
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                )}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevationScroll>

            <Box component="main">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={window.location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </Box>
        </Box>
    );
};

export default UserLayout;
