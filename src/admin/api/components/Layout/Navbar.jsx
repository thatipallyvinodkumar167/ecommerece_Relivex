import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Box,
    Avatar,
    Menu,
    MenuItem,
    Divider,
    Tooltip,
    TextField,
    InputAdornment
} from '@mui/material';
import {
    NotificationsOutlined as NotificationsIcon,
    Search as SearchIcon,
    SettingsOutlined as SettingsIcon,
    Circle as CircleIcon,
    Menu as MenuIcon,
    ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../../../context/AuthContext';
import { useNotifications } from '../../../context/NotificationContext';

const Navbar = ({ open, toggleDrawer }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user, logout } = useAuth();
    const { unreadCount } = useNotifications();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        logout();
    };

    return (
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
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        edge="start"
                        sx={{ ml: 0, color: '#64748b' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* Search Bar */}
                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', width: 400 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Search for patients, orders, or meds..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#64748b' }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: '12px',
                                    bgcolor: '#f1f5f9',
                                    border: 'none',
                                    '& fieldset': { border: 'none' },
                                    '&:hover': { bgcolor: '#e2e8f0' }
                                }
                            }}
                        />
                    </Box>
                </Box>

                {/* Right Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 } }}>
                    {/* Status Indicator */}
                    <Box sx={{
                        display: { xs: 'none', lg: 'flex' },
                        alignItems: 'center',
                        px: 2,
                        py: 0.5,
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: '20px',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                    }}>
                        <motion.div
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <CircleIcon sx={{ fontSize: 8, color: '#10b981', mr: 1 }} />
                        </motion.div>
                        <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700 }}>
                            Live System
                        </Typography>
                    </Box>

                    <Tooltip title="Help & Settings">
                        <IconButton size="large" sx={{ color: '#64748b' }}>
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Notifications">
                        <IconButton size="large" sx={{ color: '#64748b' }}>
                            <Badge
                                badgeContent={unreadCount}
                                color="error"
                                sx={{ '& .MuiBadge-badge': { fontWeight: 700, border: '2px solid #fff' } }}
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    <Divider orientation="vertical" flexItem sx={{ mx: 1, my: 1.5, borderColor: 'rgba(0,0,0,0.06)' }} />

                    {/* User Profile Trigger */}
                    <Box
                        onClick={handleMenu}
                        component={motion.div}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
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
                            {user?.name?.charAt(0) || 'A'}
                        </Avatar>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Typography variant="body2" sx={{ fontWeight: 800, lineHeight: 1 }}>
                                {user?.name || 'Admin User'}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                {user?.role}
                            </Typography>
                        </Box>
                        <ArrowDropDownIcon sx={{ color: '#64748b', display: { xs: 'none', sm: 'block' } }} />
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                mt: 1.5,
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 10px 25px rgba(0,0,0,0.1))',
                                border: '1px solid rgba(226, 232, 240, 0.8)',
                                borderRadius: '16px',
                                minWidth: 220,
                                px: 1,
                                py: 1
                            }
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <Box sx={{ px: 2, py: 1.5 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Account Control</Typography>
                        </Box>
                        <MenuItem onClick={handleClose} sx={{ borderRadius: '10px', py: 1 }}>
                            View Personal Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose} sx={{ borderRadius: '10px', py: 1 }}>
                            Activity History
                        </MenuItem>
                        <Divider sx={{ my: 1 }} />
                        <MenuItem
                            onClick={handleLogout}
                            sx={{
                                borderRadius: '10px',
                                py: 1,
                                color: '#ef4444',
                                fontWeight: 600,
                                '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.05)' }
                            }}
                        >
                            Log Out
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
