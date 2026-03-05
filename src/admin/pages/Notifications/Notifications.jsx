import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    IconButton,
    Tooltip,
    Chip,
    Button,
    Divider,
    Tabs,
    Tab
} from '@mui/material';
import {
    Notifications as NotifyIcon,
    ShoppingCart as OrderIcon,
    Person as UserIcon,
    Warning as StockIcon,
    Delete as DeleteIcon,
    DoneAll as ReadIcon,
    MoreVert as MoreIcon,
    FiberManualRecord as UnreadIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axiosConfig';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
};

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await api.get('/notifications');
                setNotifications(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching notifications:", err);
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'order': return <OrderIcon sx={{ color: '#008a45' }} />;
            case 'stock': return <StockIcon sx={{ color: '#ef4444' }} />;
            case 'user': return <UserIcon sx={{ color: '#008a45' }} />;
            default: return <NotifyIcon sx={{ color: '#64748b' }} />;
        }
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const filteredNotifications = notifications.filter(note => {
        if (tabValue === 0) return true;
        if (tabValue === 1) return note.type === 'order';
        if (tabValue === 2) return note.type === 'stock';
        if (tabValue === 3) return note.type === 'user';
        return true;
    });

    if (loading) return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Synchronizing system alerts...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                        Communication Center
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Real-time alerts and system updates from hospital operations.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        startIcon={<ReadIcon />}
                        sx={{ fontWeight: 700, color: '#008a45' }}
                    >
                        Mark all as read
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{ fontWeight: 700, borderRadius: '10px' }}
                    >
                        Clear Archive
                    </Button>
                </Box>
            </Box>

            <Box sx={{ mb: 4 }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    sx={{
                        '& .MuiTabs-indicator': { height: 3, borderRadius: '3px' },
                        '& .MuiTab-root': { fontWeight: 700, fontSize: '0.9rem', minWidth: 100 }
                    }}
                >
                    <Tab label="All Activity" />
                    <Tab label="Orders" />
                    <Tab label="Stock Alerts" />
                    <Tab label="User Data" />
                </Tabs>
                <Divider sx={{ mt: -0.1 }} />
            </Box>

            <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <AnimatePresence mode="popLayout">
                    {filteredNotifications.map((note) => (
                        <ListItem
                            key={note.id}
                            component={motion.div}
                            variants={itemVariants}
                            layout
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, x: 20 }}
                            className="glass-card"
                            sx={{
                                border: '1px solid rgba(0,0,0,0.05)',
                                p: 2.5,
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: '0 12px 24px rgba(0,0,0,0.08)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 60 }}>
                                <Avatar sx={{
                                    bgcolor: 'rgba(0, 138, 69, 0.05)',
                                    width: 48,
                                    height: 48,
                                    border: '1px solid rgba(0, 138, 69, 0.1)'
                                }}>
                                    {getIcon(note.type)}
                                </Avatar>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                            {note.title}
                                        </Typography>
                                        {!note.read && (
                                            <Chip
                                                label="NEW"
                                                size="small"
                                                sx={{
                                                    height: 18,
                                                    fontSize: '0.65rem',
                                                    fontWeight: 900,
                                                    bgcolor: '#008a45',
                                                    color: '#fff'
                                                }}
                                            />
                                        )}
                                    </Box>
                                }
                                secondary={
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                        <Typography variant="body2" sx={{ color: '#64748b', maxWidth: '80%' }}>
                                            {note.message}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                                            {note.time}
                                        </Typography>
                                    </Box>
                                }
                            />
                            <Box sx={{ ml: 2 }}>
                                <Tooltip title="Options">
                                    <IconButton size="small">
                                        <MoreIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </ListItem>
                    ))}
                </AnimatePresence>
            </List>

            {filteredNotifications.length === 0 && (
                <Box sx={{ p: 5, textAlign: 'center', bgcolor: 'rgba(0,0,0,0.02)', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
                    <NotifyIcon sx={{ fontSize: 48, color: '#cbd5e1', mb: 2 }} />
                    <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 600 }}>
                        No pending communications in this category.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default Notifications;

