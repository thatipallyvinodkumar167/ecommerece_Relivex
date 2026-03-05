import React, { useState, useEffect } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Avatar,
    Divider,
    IconButton,
    useMediaQuery,
    useTheme,
    Badge,
    Tooltip,
    Snackbar,
    Alert,
    AppBar,
    Toolbar,
    CssBaseline,
    ListItemButton
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Inventory as ProductsIcon,
    ShoppingCart as OrdersIcon,
    Star as ReviewsIcon,
    AccountBalanceWallet as EarningsIcon,
    Person as ProfileIcon,
    Logout as LogoutIcon,
    Notifications as NotificationIcon,
    Menu as MenuIcon,
    LocalHospital as HospitalIcon,
    ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 260;

const VendorLayout = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notifications, setNotifications] = useState(0);
    const [recentNotification, setRecentNotification] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useAuth();

    // Simulation of Real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                const newOrder = {
                    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
                    customer: 'New Customer',
                    time: new Date().toLocaleTimeString()
                };
                setNotifications(prev => prev + 1);
                setRecentNotification(newOrder);
                setShowToast(true);
            }
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/vendor/dashboard' },
        { text: 'Products', icon: <ProductsIcon />, path: '/vendor/products' },
        { text: 'Orders', icon: <OrdersIcon />, path: '/vendor/orders' },
        { text: 'Reviews', icon: <ReviewsIcon />, path: '/vendor/reviews' },
        { text: 'Earnings', icon: <EarningsIcon />, path: '/vendor/earnings' },
        { text: 'Profile', icon: <ProfileIcon />, path: '/vendor/profile' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/vendor/login');
    };

    const drawerContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#064e3b', color: '#fff' }}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, minHeight: 80 }}>
                <HospitalIcon sx={{ color: '#facc15', fontSize: 32 }} />
                <Typography variant="h6" sx={{ color: '#facc15', fontWeight: 800, letterSpacing: '-0.02em' }}>
                    Relivex Vendor
                </Typography>
            </Box>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)', mx: 2 }} />

            <List sx={{ px: 1.5, py: 3, flexGrow: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItemButton
                            key={item.text}
                            component={motion.div}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                navigate(item.path);
                                setMobileOpen(false);
                            }}
                            sx={{
                                mb: 0.5,
                                borderRadius: '12px',
                                minHeight: 48,
                                justifyContent: 'initial',
                                px: 2.5,
                                position: 'relative',
                                backgroundColor: isActive ? 'rgba(250, 204, 21, 0.15)' : 'transparent',
                                color: isActive ? '#facc15' : 'rgba(255,255,255,0.7)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    color: '#fff',
                                },
                            }}
                        >
                            <ListItemIcon sx={{
                                minWidth: 0,
                                mr: 2,
                                justifyContent: 'center',
                                color: isActive ? '#facc15' : 'inherit',
                                transition: 'color 0.2s'
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontSize: '0.9rem',
                                    fontWeight: isActive ? 700 : 500
                                }}
                            />
                            {isActive && (
                                <Box
                                    component={motion.div}
                                    layoutId="active-pill"
                                    sx={{
                                        position: 'absolute',
                                        left: 0,
                                        width: 4,
                                        height: '60%',
                                        bgcolor: '#facc15',
                                        borderRadius: '0 4px 4px 0'
                                    }}
                                />
                            )}
                        </ListItemButton>
                    );
                })}
            </List>

            <Box sx={{ p: 2, mt: 'auto' }}>
                <Box sx={{
                    bgcolor: 'rgba(255,255,255,0.03)',
                    borderRadius: '16px',
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <IconButton
                        onClick={handleLogout}
                        sx={{
                            color: '#ef4444',
                            bgcolor: 'rgba(239, 68, 68, 0.1)',
                            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' }
                        }}
                    >
                        <LogoutIcon />
                    </IconButton>
                    <Box sx={{ overflow: 'hidden' }}>
                        <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, noWrap: true }}>
                            {user?.name || 'Vendor'}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', noWrap: true }}>
                            Vendor Panel
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
            <CssBaseline />

            {/* Sidebar */}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        border: 'none',
                        boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Main Content Area */}
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden' }}>
                {/* Navbar */}
                <AppBar
                    position="sticky"
                    elevation={0}
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(12px)',
                        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                        color: '#1e293b',
                        top: 0,
                        zIndex: 1100,
                    }}
                >
                    <Toolbar sx={{ justifyContent: 'space-between', minHeight: 70 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {isMobile && (
                                <IconButton
                                    color="inherit"
                                    onClick={() => setMobileOpen(true)}
                                    edge="start"
                                    sx={{ mr: 2, color: '#64748b' }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                {menuItems.find(item => location.pathname.includes(item.path))?.text || 'Vendor Panel'}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Tooltip title="Notifications">
                                <IconButton
                                    onClick={() => setNotifications(0)}
                                    sx={{ color: '#64748b' }}
                                >
                                    <Badge
                                        badgeContent={notifications}
                                        color="error"
                                        component={motion.div}
                                        animate={notifications > 0 ? {
                                            rotate: [0, -10, 10, -10, 10, 0],
                                            scale: [1, 1.1, 1]
                                        } : {}}
                                        transition={{ repeat: Infinity, repeatDelay: 1 }}
                                    >
                                        <NotificationIcon sx={{ color: notifications > 0 ? '#008a45' : 'inherit' }} />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1.5, borderColor: 'rgba(0,0,0,0.06)' }} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    cursor: 'pointer',
                                    p: 0.5,
                                    pr: 1.5,
                                    borderRadius: '12px',
                                    transition: 'all 0.2s',
                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 38,
                                        height: 38,
                                        bgcolor: '#008a45',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        boxShadow: '0 4px 12px rgba(0, 138, 69, 0.2)'
                                    }}
                                >
                                    {user?.name?.charAt(0) || 'V'}
                                </Avatar>
                                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1 }}>
                                        {user?.name || 'Medical Vendor'}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                        Vendor
                                    </Typography>
                                </Box>
                                <ArrowDropDownIcon sx={{ color: '#64748b', display: { xs: 'none', sm: 'block' } }} />
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>

                {/* Page Content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: { xs: 2, md: 4 },
                        transition: 'margin 0.3s'
                    }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </Box>

                {/* Real-time notification toast */}
                <Snackbar
                    open={showToast}
                    autoHideDuration={6000}
                    onClose={() => setShowToast(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert
                        severity="info"
                        onClose={() => setShowToast(false)}
                        icon={<OrdersIcon />}
                        sx={{
                            borderRadius: '16px',
                            fontWeight: 700,
                            bgcolor: '#1e293b',
                            color: '#fff',
                            '& .MuiAlert-icon': { color: '#008a45' }
                        }}
                    >
                        New Order Received: {recentNotification?.id}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default VendorLayout;

