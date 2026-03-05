import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    IconButton,
    Tooltip,
    Select,
    MenuItem,
    FormControl,
    Drawer,
    Grid,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
    Snackbar,
    Alert
} from '@mui/material';
import {
    Visibility as ViewIcon,
    MoreVert as MenuIcon,
    LocalShipping as ShippingIcon,
    CheckCircle as SuccessIcon,
    Pending as PendingIcon
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import { motion, AnimatePresence } from 'framer-motion';

const VendorOrders = () => {
    const [orders, setOrders] = useState([
        { id: 'ORD-1234', customer: 'John Doe', product: 'Pain Capsules', qty: 2, total: 1798, date: '2024-03-04', status: 'Pending' },
        { id: 'ORD-1235', customer: 'Alice Smith', product: 'Joint Relief', qty: 1, total: 899, date: '2024-03-05', status: 'Confirmed' },
    ]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        setSnackbar({ open: true, message: `Order ${orderId} status updated to ${newStatus}` });
    };

    const columns = [
        { field: 'id', headerName: 'Order ID', width: 130, renderCell: (p) => <Typography sx={{ fontWeight: 700 }}>{p.value}</Typography> },
        { field: 'customer', headerName: 'Customer', width: 180 },
        { field: 'product', headerName: 'Product', width: 180 },
        { field: 'qty', headerName: 'Qty', width: 80, align: 'center' },
        {
            field: 'total',
            headerName: 'Total Price',
            width: 130,
            renderCell: (p) => <Typography sx={{ fontWeight: 800, color: '#008a45' }}>₹{p.value}</Typography>
        },
        { field: 'date', headerName: 'Date', width: 130 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                const status = params.value;
                return (
                    <Chip
                        label={status}
                        size="small"
                        sx={{
                            fontWeight: 800,
                            borderRadius: '8px',
                            bgcolor: status === 'Delivered' ? 'rgba(16, 185, 129, 0.1)' :
                                status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' :
                                    'rgba(0, 138, 69, 0.1)', // Changed to theme green
                            color: status === 'Delivered' ? '#10b981' :
                                status === 'Pending' ? '#f59e0b' :
                                    '#008a45' // Changed to theme green
                        }}
                    />
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 250,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FormControl size="small" variant="standard" sx={{ minWidth: 120 }}>
                        <Select
                            value={params.row.status}
                            onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
                            sx={{ fontSize: '0.8rem', fontWeight: 700 }}
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Confirmed">Confirmed</MenuItem>
                            <MenuItem value="Shipped">Shipped</MenuItem>
                            <MenuItem value="Delivered">Delivered</MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton size="small" onClick={() => { setSelectedOrder(params.row); setDrawerOpen(true); }}>
                        <ViewIcon fontSize="small" />
                    </IconButton>
                </Box>
            )
        }
    ];

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                    Order Processing
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Track and fulfill customer orders efficiently.
                </Typography>
            </Box>

            <Paper sx={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid #f1f5f9', height: 600 }}>
                <DataGrid
                    rows={orders}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25]}
                    disableSelectionOnClick
                    sx={{
                        border: 'none',
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: '#f8fafc',
                            color: '#64748b',
                            fontWeight: 800,
                            borderBottom: '2px solid #f1f5f9'
                        },
                        '& .MuiDataGrid-cell': {
                            borderBottom: '1px solid #f1f5f9'
                        }
                    }}
                />
            </Paper>

            {/* Order Details Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{ sx: { width: { xs: '100%', sm: 500 }, py: 4, px: 3 } }}
            >
                {selectedOrder && (
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>Order Details</Typography>

                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#f8fafc', p: 2, borderRadius: '16px' }}>
                                    <Avatar sx={{ bgcolor: '#008a45' }}>{selectedOrder.customer[0]}</Avatar>
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{selectedOrder.customer}</Typography>
                                        <Typography variant="caption" color="textSecondary">Customer ID: CUST-901</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>

                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Item Summary</Typography>
                        <Paper variant="outlined" sx={{ p: 2, borderRadius: '16px', mb: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography sx={{ fontWeight: 600 }}>{selectedOrder.product}</Typography>
                                <Typography sx={{ fontWeight: 800 }}>x{selectedOrder.qty}</Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography color="textSecondary">Total Paid</Typography>
                                <Typography sx={{ fontWeight: 800, color: '#008a45', fontSize: '1.2rem' }}>₹{selectedOrder.total}</Typography>
                            </Box>
                        </Paper>

                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>Delivery Address</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>
                            123 Medical Lane, Health City,<br />
                            Pharma District, 560001
                        </Typography>

                        <Box sx={{ mt: 'auto' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => setDrawerOpen(false)}
                                sx={{ borderRadius: '12px', bgcolor: '#1e293b', py: 1.5, fontWeight: 700 }}
                            >
                                Close Details
                            </Button>
                        </Box>
                    </Box>
                )}
            </Drawer>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity="info" sx={{ borderRadius: '12px', fontWeight: 600, bgcolor: '#1e293b', color: '#fff' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default VendorOrders;
