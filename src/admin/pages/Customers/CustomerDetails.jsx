import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Grid,
    Avatar,
    Chip,
    IconButton,
    Tooltip,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material';
import {
    ArrowBack as BackIcon,
    Block as BlockIcon,
    Delete as DeleteIcon,
    Email as MailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    CalendarToday as DateIcon,
    Verified as VerifiedIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import customerService from '../../services/customerService';
import CustomerSummaryCards from '../../api/components/Customers/CustomerSummaryCards';
import CustomerOrdersTable from '../../api/components/Customers/CustomerOrdersTable';
import CustomerAnalytics from '../../api/components/Customers/CustomerAnalytics';

const CustomerDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // State
    const [customer, setCustomer] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(null); // 'block' or 'delete'
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    // Mock Analytics Data
    const analyticsData = {
        spendingHistory: [
            { month: 'Jan', spent: 1200 },
            { month: 'Feb', spent: 1900 },
            { month: 'Mar', spent: 1500 },
            { month: 'Apr', spent: 2100 },
            { month: 'May', spent: 2400 },
            { month: 'Jun', spent: 1800 },
        ],
        orderDistribution: [
            { name: 'Delivered', value: 12 },
            { name: 'Pending', value: 3 },
            { name: 'Cancelled', value: 1 },
        ]
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const customerData = await customerService.getCustomerById(id);
                const ordersData = await customerService.getCustomerOrders(id);
                setCustomer(customerData);
                setOrders(ordersData);
                setLoading(false);
            } catch (err) {
                console.error("Error loading customer data:", err);
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const handleBlock = async () => {
        setActionLoading(true);
        try {
            const isBlocked = customer.status === 'Blocked';
            if (isBlocked) {
                await customerService.unblockCustomer(id);
                setCustomer({ ...customer, status: 'Active' });
                setSnackbar({ open: true, message: 'Customer account unblocked successfully', severity: 'success' });
            } else {
                await customerService.blockCustomer(id);
                setCustomer({ ...customer, status: 'Blocked' });
                setSnackbar({ open: true, message: 'Customer account blocked', severity: 'warning' });
            }
            setOpenDialog(null);
        } catch (err) {
            setSnackbar({ open: true, message: 'Action failed', severity: 'error' });
        }
        setActionLoading(false);
    };

    const handleDelete = async () => {
        setActionLoading(true);
        try {
            await customerService.deleteCustomer(id);
            setSnackbar({ open: true, message: 'Profile deleted forever', severity: 'success' });
            setTimeout(() => navigate('/customers'), 1500);
        } catch (err) {
            setSnackbar({ open: true, message: 'Deletion failed', severity: 'error' });
        }
        setOpenDialog(null);
        setActionLoading(false);
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress sx={{ color: '#008a45' }} />
        </Box>
    );

    if (!customer) return <Typography>Patient profile not found.</Typography>;

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            sx={{ p: { xs: 2, md: 4 } }}
        >
            {/* Top Toolbar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Button
                    startIcon={<BackIcon />}
                    onClick={() => navigate('/customers')}
                    sx={{ color: '#64748b', fontWeight: 700, textTransform: 'none' }}
                >
                    Back to Directory
                </Button>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<BlockIcon />}
                        onClick={() => setOpenDialog('block')}
                        sx={{
                            borderRadius: '10px',
                            color: customer.status === 'Blocked' ? '#10b981' : '#ef4444',
                            borderColor: 'rgba(226, 232, 240, 0.8)'
                        }}
                    >
                        {customer.status === 'Blocked' ? 'Unblock Patient' : 'Block Access'}
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => setOpenDialog('delete')}
                        sx={{ borderRadius: '10px', boxShadow: 'none' }}
                    >
                        Delete Profile
                    </Button>
                </Box>
            </Box>

            {/* Profile Header */}
            <Card className="glass-card" sx={{ p: 4, mb: 4, border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item>
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                fontSize: '2.5rem',
                                fontWeight: 800,
                                bgcolor: 'rgba(0, 138, 69, 0.1)',
                                color: '#008a45',
                                border: '3px solid #fff',
                                boxShadow: '0 8px 24px rgba(0, 138, 69, 0.2)'
                            }}
                        >
                            {customer.name.charAt(0)}
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b' }}>
                                {customer.name}
                            </Typography>
                            <VerifiedIcon sx={{ color: '#1976d2', fontSize: 24 }} />
                            <Chip
                                label={customer.status}
                                size="small"
                                sx={{
                                    fontWeight: 700,
                                    bgcolor: customer.status === 'Active' ? 'rgba(0, 138, 69, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: customer.status === 'Active' ? '#008a45' : '#ef4444'
                                }}
                            />
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <MailIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                                <Typography variant="body2" color="textSecondary">{customer.email}</Typography>
                            </Grid>
                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <PhoneIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                                <Typography variant="body2" color="textSecondary">{customer.phone}</Typography>
                            </Grid>
                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <LocationIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                                <Typography variant="body2" color="textSecondary">Mumbai, Maharashtra, IN</Typography>
                            </Grid>
                            <Grid item sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <DateIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
                                <Typography variant="body2" color="textSecondary">Member since Nov 2023</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>

            {/* Metrics Section */}
            <CustomerSummaryCards stats={{
                totalOrders: customer.orders || orders.length,
                pendingOrders: orders.filter(o => o.status === 'Pending').length,
                deliveredOrders: orders.filter(o => o.status === 'Delivered').length,
                totalSpent: customer.spent || 4590
            }} />

            {/* Analytics & Orders */}
            <CustomerAnalytics data={analyticsData} />
            <CustomerOrdersTable orders={orders} />

            {/* Confirmation Dialogs */}
            <Dialog open={openDialog !== null} onClose={() => setOpenDialog(null)} PaperProps={{ sx: { borderRadius: '16px', p: 1 } }}>
                <DialogTitle sx={{ fontWeight: 800 }}>
                    {openDialog === 'block' ? 'Toggle Security Block?' : 'Confirm Profile Deletion?'}
                </DialogTitle>
                <DialogContent>
                    <Typography color="textSecondary">
                        {openDialog === 'block'
                            ? `Are you sure you want to ${customer.status === 'Blocked' ? 'unblock' : 'block'} access for ${customer.name}? This takes effect immediately.`
                            : `This action is irreversible. All history for ${customer.name} will be archived.`
                        }
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenDialog(null)} sx={{ color: '#64748b', fontWeight: 700 }}>Cancel</Button>
                    <Button
                        onClick={openDialog === 'block' ? handleBlock : handleDelete}
                        variant="contained"
                        color={openDialog === 'delete' ? 'error' : 'primary'}
                        disabled={actionLoading}
                        sx={{ borderRadius: '10px', px: 3 }}
                    >
                        {actionLoading ? <CircularProgress size={24} /> : 'Confirm Action'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Feedback Notifications */}
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert severity={snackbar.severity} sx={{ borderRadius: '12px', fontWeight: 700 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CustomerDetails;
