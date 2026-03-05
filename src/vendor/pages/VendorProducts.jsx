import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Button,
    Chip,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Alert,
    Snackbar,
    Stack,
    Divider
} from '@mui/material';
import {
    Edit as EditIcon,
    Add as AddIcon,
    Inventory as StockIcon,
    CloudUpload as UploadIcon,
    CheckCircle as ActiveIcon,
    Block as OutOfStockIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const VendorProducts = () => {
    // Single product focus as requested
    const [product, setProduct] = useState({
        id: 1,
        name: 'Joint Pain Relief Capsules',
        price: 899,
        stock: 45,
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [tempStock, setTempStock] = useState(product.stock);
    const [snackbar, setSnackbar] = useState({ open: false, message: '' });

    const handleUpdateStock = () => {
        setProduct({ ...product, stock: tempStock, status: tempStock > 0 ? 'Active' : 'Out of Stock' });
        setOpenDialog(false);
        setSnackbar({ open: true, message: 'Inventory updated successfully!' });
    };

    const toggleAvailability = () => {
        const newStatus = product.status === 'Active' ? 'Out of Stock' : 'Active';
        setProduct({ ...product, status: newStatus });
        setSnackbar({ open: true, message: `Product marked as ${newStatus}` });
    };

    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                        Product Management
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage your medical catalog and inventory levels.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ borderRadius: '12px', bgcolor: '#008a45', fontWeight: 700 }}
                >
                    Add Component
                </Button>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6} lg={4}>
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <Card
                            sx={{
                                borderRadius: '32px',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                                border: '1px solid #f1f5f9'
                            }}
                        >
                            <Box sx={{ position: 'relative' }}>
                                <CardMedia
                                    component="img"
                                    height="280"
                                    image={product.image}
                                    alt={product.name}
                                />
                                <Chip
                                    label={product.status}
                                    color={product.status === 'Active' ? 'success' : 'error'}
                                    sx={{
                                        position: 'absolute',
                                        top: 20,
                                        right: 20,
                                        fontWeight: 800,
                                        borderRadius: '12px',
                                        bgcolor: product.status === 'Active' ? '#008a45' : '#ef4444',
                                        color: '#fff'
                                    }}
                                />
                            </Box>

                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="h4" sx={{ color: '#008a45', fontWeight: 900, mb: 3 }}>
                                    ₹{product.price}
                                </Typography>

                                <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
                                    <Box>
                                        <Typography variant="caption" color="textSecondary" display="block">Stock</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 800 }}>{product.stock} units</Typography>
                                    </Box>
                                    <Divider orientation="vertical" flexItem />
                                    <Box>
                                        <Typography variant="caption" color="textSecondary" display="block">Category</Typography>
                                        <Typography variant="h6" sx={{ fontWeight: 800 }}>Medical</Typography>
                                    </Box>
                                </Stack>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            startIcon={<StockIcon />}
                                            onClick={() => setOpenDialog(true)}
                                            sx={{ borderRadius: '12px', borderColor: '#e2e8f0', color: '#1e293b', fontWeight: 700 }}
                                        >
                                            Update Stock
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            onClick={toggleAvailability}
                                            startIcon={product.status === 'Active' ? <OutOfStockIcon /> : <ActiveIcon />}
                                            sx={{ borderRadius: '12px', borderColor: '#e2e8f0', color: '#1e293b', fontWeight: 700 }}
                                        >
                                            {product.status === 'Active' ? 'Deactivate' : 'Activate'}
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            startIcon={<EditIcon />}
                                            sx={{ borderRadius: '12px', bgcolor: '#1e293b', fontWeight: 700 }}
                                        >
                                            Edit Details
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>

            {/* Stock Update Dialog */}
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                PaperProps={{ sx: { borderRadius: '24px', p: 2 } }}
            >
                <DialogTitle sx={{ fontWeight: 800 }}>Update Inventory Levels</DialogTitle>
                <DialogContent>
                    <Typography color="textSecondary" sx={{ mb: 3 }}>
                        Adjust available stock for <strong>{product.name}</strong>.
                    </Typography>
                    <TextField
                        fullWidth
                        type="number"
                        label="Stock Quantity"
                        value={tempStock}
                        onChange={(e) => setTempStock(parseInt(e.target.value))}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setOpenDialog(false)} sx={{ fontWeight: 700, borderRadius: '12px' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleUpdateStock}
                        sx={{ bgcolor: '#008a45', fontWeight: 800, borderRadius: '12px', px: 4 }}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity="success" sx={{ borderRadius: '12px', fontWeight: 600 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default VendorProducts;
