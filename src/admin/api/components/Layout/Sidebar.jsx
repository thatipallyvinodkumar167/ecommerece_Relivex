import { motion } from 'framer-motion';
import {
    Drawer,
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Tooltip,
    IconButton
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    ShoppingCart as OrdersIcon,
    Inventory as ProductsIcon,
    Category as CategoriesIcon,
    Store as VendorsIcon,
    People as CustomersIcon,
    Assessment as InventoryIcon,
    Payment as PaymentsIcon,
    RateReview as ReviewsIcon,
    LocalOffer as CouponsIcon,
    BarChart as ReportsIcon,
    Notifications as NotificationsIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    ChevronLeft as ChevronLeftIcon,
    Menu as MenuIcon,
    HealthAndSafety as HospitalIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

const drawerWidth = 260;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard', roles: ['Super Admin', 'Admin'] },
    { text: 'Orders', icon: <OrdersIcon />, path: '/admin/orders', roles: ['Super Admin', 'Admin'] },
    { text: 'Products', icon: <ProductsIcon />, path: '/admin/products', roles: ['Super Admin', 'Admin'] },
    { text: 'Categories', icon: <CategoriesIcon />, path: '/admin/categories', roles: ['Super Admin', 'Admin'] },
    { text: 'Vendors', icon: <VendorsIcon />, path: '/admin/vendors', roles: ['Super Admin'] },
    { text: 'Customers', icon: <CustomersIcon />, path: '/admin/customers', roles: ['Super Admin'] },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/admin/inventory', roles: ['Super Admin', 'Admin'] },
    { text: 'Payments', icon: <PaymentsIcon />, path: '/admin/payments', roles: ['Super Admin'] },
    { text: 'Reviews', icon: <ReviewsIcon />, path: '/admin/reviews', roles: ['Super Admin', 'Admin'] },
    { text: 'Coupons', icon: <CouponsIcon />, path: '/admin/coupons', roles: ['Super Admin'] },
    { text: 'Reports', icon: <ReportsIcon />, path: '/admin/reports', roles: ['Super Admin'] },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/admin/notifications', roles: ['Super Admin', 'Admin'] },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings', roles: ['Super Admin', 'Admin'] },
];

const Sidebar = ({ open, toggleDrawer }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const filteredMenuItems = menuItems.filter(item => !item.roles || item.roles.includes(user?.role));

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: open ? drawerWidth : 80,
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '& .MuiDrawer-paper': {
                    width: open ? drawerWidth : 80,
                    transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflowX: 'hidden',
                    backgroundColor: '#064e3b', // Deep Forest Green
                    color: '#fff',
                    border: 'none',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
                },
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: open ? 'space-between' : 'center',
                px: 2,
                py: 3,
                minHeight: 80
            }}>
                {open ? (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                    >
                        <HospitalIcon sx={{ color: '#facc15', fontSize: 32 }} />
                        <Typography variant="h6" sx={{ color: '#facc15', fontWeight: 800, letterSpacing: '-0.02em' }}>
                            Relivex
                        </Typography>
                    </motion.div>
                ) : (
                    <HospitalIcon sx={{ color: '#facc15', fontSize: 32 }} />
                )}
            </Box>

            <Divider sx={{ bgcolor: 'rgba(255,255,255,0.05)', mx: 2 }} />

            <List sx={{ px: 1.5, py: 2 }}>
                {filteredMenuItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname === '/admin');
                    return (
                        <Tooltip key={item.text} title={!open ? item.text : ''} placement="right">
                            <ListItemButton
                                component={motion.div}
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    mb: 0.5,
                                    borderRadius: '12px',
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
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
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                    color: isActive ? '#facc15' : 'inherit',
                                    transition: 'color 0.2s'
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                {open && (
                                    <ListItemText
                                        primary={item.text}
                                        primaryTypographyProps={{
                                            fontSize: '0.9rem',
                                            fontWeight: isActive ? 700 : 500
                                        }}
                                    />
                                )}
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
                        </Tooltip>
                    );
                })}
            </List>

            <Box sx={{ mt: 'auto', p: 2 }}>
                <Box sx={{
                    bgcolor: 'rgba(255,255,255,0.03)',
                    borderRadius: '16px',
                    p: open ? 2 : 1,
                    display: 'flex',
                    flexDirection: open ? 'row' : 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                }}>
                    <IconButton
                        onClick={logout}
                        sx={{
                            color: '#ef4444',
                            bgcolor: 'rgba(239, 68, 68, 0.1)',
                            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' }
                        }}
                    >
                        <LogoutIcon />
                    </IconButton>
                    {open && (
                        <Box sx={{ overflow: 'hidden' }}>
                            <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, noWrap: true }}>
                                {user?.name || 'Admin'}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', noWrap: true }}>
                                {user?.role}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
