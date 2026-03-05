import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import {
    Visibility as ViewIcon,
    LocalShipping as ShippingIcon,
    CheckCircle as SuccessIcon,
    Pending as PendingIcon,
    Error as ErrorIcon,
    Print as PrintIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../api/axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

import { useLocation } from 'react-router-dom';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const location = useLocation();

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/orders');
                const allOrders = res.data;
                setOrders(allOrders);

                // Handle filtering from dashboard
                const filterStatus = location.state?.filterStatus;
                if (filterStatus) {
                    setFilteredOrders(allOrders.filter(o => o.status === filterStatus));
                } else {
                    setFilteredOrders(allOrders);
                }

                setLoading(false);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setLoading(false);
            }
        };
        fetchOrders();
    }, [location.state]);

    const handleOpen = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    const columns = [
        {
            field: 'id', headerName: 'Order ID', width: 120, renderCell: (params) => (
                <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>#{params.value}</Typography>
            )
        },
        { field: 'customer', headerName: 'Customer', width: 150 },
        { field: 'product', headerName: 'Product', width: 220 },
        { field: 'vendor', headerName: 'Vendor', width: 150 },
        {
            field: 'amount', headerName: 'Total', width: 120, renderCell: (params) => (
                <Typography sx={{ fontWeight: 700 }}>₹{params.value}</Typography>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 140,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    sx={{
                        fontWeight: 700,
                        borderRadius: '8px',
                        bgcolor: params.value === 'Delivered' ? 'rgba(16, 185, 129, 0.1)' :
                            params.value === 'Pending' ? 'rgba(245, 158, 11, 0.1)' :
                                'rgba(239, 68, 68, 0.1)',
                        color: params.value === 'Delivered' ? '#10b981' :
                            params.value === 'Pending' ? '#f59e0b' :
                                '#ef4444'
                    }}
                    size="small"
                />
            )
        },
        { field: 'date', headerName: 'Order Date', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <Tooltip title="View Details">
                        <IconButton
                            component={motion.button}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            size="small"
                            color="primary"
                            onClick={() => handleOpen(params.row)}
                        >
                            <ViewIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Print Invoice">
                        <IconButton
                            component={motion.button}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            size="small"
                        >
                            <PrintIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ];

    if (loading) return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Typography variant="h5" color="textSecondary">Loading Orders...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                    Order Management
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Track and manage medical supply orders and patient deliveries.
                </Typography>
            </Box>

            <motion.div variants={itemVariants}>
                <Box className="glass-card" sx={{ height: 650, width: '100%', overflow: 'hidden' }}>
                    <DataGrid
                        rows={filteredOrders}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 50]}
                        disableSelectionOnClick
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-columnHeaders': {
                                bgcolor: '#f1f5f9',
                                color: '#64748b',
                                fontWeight: 800,
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '1px solid #f1f5f9',
                            },
                            '& .MuiDataGrid-row:hover': {
                                bgcolor: 'rgba(241, 245, 249, 0.5)',
                            },
                        }}
                    />
                </Box>
            </motion.div>

            {/* Order Detail Dialog */}
            <AnimatePresence>
                {open && (
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        maxWidth="md"
                        fullWidth
                        PaperComponent={motion.div}
                        PaperProps={{
                            initial: { opacity: 0, scale: 0.9, y: 20 },
                            animate: { opacity: 1, scale: 1, y: 0 },
                            exit: { opacity: 0, scale: 0.9, y: 20 },
                            className: "glass-card",
                            sx: { m: 2, p: 0 }
                        }}
                    >
                        <DialogTitle sx={{ bgcolor: '#f8fafc', fontWeight: 800, px: 4, py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            Order Details
                            <Typography variant="subtitle1" sx={{ color: '#64748b' }}>#{selectedOrder?.id}</Typography>
                        </DialogTitle>
                        <DialogContent dividers sx={{ p: 4 }}>
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Customer Information</Typography>
                                    <Box className="glass-card" sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.02)' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 700 }}>{selectedOrder?.customer}</Typography>
                                        <Typography variant="body2" color="textSecondary">patient.contact@hosp.com</Typography>
                                        <Typography variant="body2" color="textSecondary">+91 98765 43210</Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="body2" color="textSecondary">Sector 12, Medical Square, Mumbai</Typography>
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Order Status</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                        <Chip label={selectedOrder?.status} sx={{ fontWeight: 700 }} color="primary" />
                                        <Chip label="Payment Verified" sx={{ fontWeight: 700 }} variant="outlined" color="success" />
                                        <Chip label="Express Delivery" sx={{ fontWeight: 700 }} variant="outlined" color="info" />
                                    </Box>
                                    <Button fullWidth variant="contained" startIcon={<ShippingIcon />} className="gradient-button" sx={{ height: 48 }}>
                                        Track Shipment
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Bill of Materials</Typography>
                                    <Box sx={{ borderRadius: '12px', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                                        <List sx={{ p: 0 }}>
                                            <ListItem sx={{ px: 3, py: 2 }}>
                                                <ListItemText
                                                    primary={<Typography sx={{ fontWeight: 700 }}>{selectedOrder?.product}</Typography>}
                                                    secondary={`Supplier: ${selectedOrder?.vendor}`}
                                                />
                                                <Typography variant="body1" sx={{ fontWeight: 700 }}>1 x ₹{selectedOrder?.amount}</Typography>
                                            </ListItem>
                                        </List>
                                        <Box sx={{ bgcolor: 'rgba(0,0,0,0.02)', p: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                            <Box sx={{ textAlign: 'right', width: 250 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                    <Typography color="textSecondary">Subtotal:</Typography>
                                                    <Typography sx={{ fontWeight: 600 }}>₹{selectedOrder?.amount}</Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                    <Typography color="textSecondary">GST (12%):</Typography>
                                                    <Typography sx={{ fontWeight: 600 }}>₹{(selectedOrder?.amount * 0.12).toFixed(2)}</Typography>
                                                </Box>
                                                <Divider sx={{ my: 1.5 }} />
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography sx={{ fontWeight: 800 }}>Grand Total:</Typography>
                                                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#008a45' }}>
                                                        ₹{(selectedOrder?.amount * 1.12).toFixed(2)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 3, gap: 2 }}>
                            <Button onClick={handleClose} sx={{ fontWeight: 700, px: 3 }}>Discard</Button>
                            <Button variant="contained" className="gradient-button" onClick={handleClose} sx={{ px: 4 }}>
                                Approve & Dispatch
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default Orders;
