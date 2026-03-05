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
    TextField,
    MenuItem,
    Grid,
    InputAdornment,
    Switch,
    FormControlLabel,
    Chip
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon
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

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, catRes, vendRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/categories'),
                    api.get('/vendors')
                ]);
                setProducts(prodRes.data);
                setCategories(catRes.data);
                setVendors(vendRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditMode(false);
        setSelectedProduct(null);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setEditMode(true);
        setOpen(true);
    };

    const columns = [
        { field: 'sku', headerName: 'SKU', width: 100 },
        {
            field: 'name', headerName: 'Product Name', width: 250, renderCell: (params) => (
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>{params.value}</Typography>
            )
        },
        { field: 'category', headerName: 'Category', width: 150 },
        { field: 'vendor', headerName: 'Vendor', width: 150 },
        {
            field: 'price', headerName: 'Price', width: 120, renderCell: (params) => (
                <Typography sx={{ fontWeight: 700 }}>₹{params.value}</Typography>
            )
        },
        {
            field: 'stock', headerName: 'Stock', width: 100, renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        fontWeight: 700,
                        bgcolor: params.value < 20 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: params.value < 20 ? '#ef4444' : '#10b981'
                    }}
                />
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    sx={{
                        fontWeight: 700,
                        borderRadius: '8px',
                        bgcolor: params.value === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                        color: params.value === 'Active' ? '#10b981' : '#64748b'
                    }}
                    size="small"
                />
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        component={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(params.row)}
                        color="primary"
                        size="small"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        component={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        color="error"
                        size="small"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        }
    ];

    if (loading) return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Typography variant="h5" color="textSecondary">Loading Catalog...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                        Product Management
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Manage your hospital e-commerce inventory and medical catalog.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    className="gradient-button"
                    startIcon={<AddIcon />}
                    onClick={handleOpen}
                    sx={{ height: 48, px: 3 }}
                >
                    Add New Product
                </Button>
            </Box>

            <motion.div variants={itemVariants}>
                <Box className="glass-card" sx={{ p: 3, mb: 4 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TextField
                                fullWidth
                                placeholder="Search by name, SKU or brand..."
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: '#94a3b8' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField select fullWidth label="Category" defaultValue="All">
                                <MenuItem value="All">All Categories</MenuItem>
                                {categories.map(cat => <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField select fullWidth label="Vendor" defaultValue="All">
                                <MenuItem value="All">All Vendors</MenuItem>
                                {vendors.map(v => <MenuItem key={v.id} value={v.name}>{v.name}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 2 }}>
                            <Button fullWidth variant="outlined" sx={{ height: 56, fontWeight: 700 }}>Filter</Button>
                        </Grid>
                    </Grid>
                </Box>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Box className="glass-card" sx={{ height: 650, width: '100%', overflow: 'hidden' }}>
                    <DataGrid
                        rows={products}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 50]}
                        checkboxSelection
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

            {/* Add/Edit Dialog */}
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
                            sx: { m: 2, p: 2 }
                        }}
                    >
                        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem', pb: 1 }}>
                            {editMode ? 'Edit Medical Product' : 'Register New Product'}
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={4} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Product Name" defaultValue={selectedProduct?.name || ''} placeholder="e.g. Knee Compression Sleeve" />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="SKU / Batch ID" defaultValue={selectedProduct?.sku || ''} placeholder="PRD-10293" />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField select fullWidth label="Category" defaultValue={selectedProduct?.category || categories[0]?.name}>
                                        {categories.map(cat => <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>)}
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField select fullWidth label="Supplier / Vendor" defaultValue={selectedProduct?.vendor || vendors[0]?.name}>
                                        {vendors.map(v => <MenuItem key={v.id} value={v.name}>{v.name}</MenuItem>)}
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Price (INR)"
                                        defaultValue={selectedProduct?.price || ''}
                                        InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField fullWidth type="number" label="Stock Level" defaultValue={selectedProduct?.stock || ''} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField fullWidth label="Discount %" defaultValue="0" />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField select fullWidth label="Treatment / Pain Focus">
                                        <MenuItem value="Leg Pain">Leg Pain</MenuItem>
                                        <MenuItem value="Neck Pain">Neck Pain</MenuItem>
                                        <MenuItem value="Backbone Pain">Backbone Pain</MenuItem>
                                        <MenuItem value="Joint Pain">Joint Pain</MenuItem>
                                        <MenuItem value="Muscle Pain">Muscle Pain</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <FormControlLabel
                                        control={<Switch color="primary" defaultChecked={selectedProduct?.status === 'Active'} />}
                                        label={<Typography sx={{ fontWeight: 600 }}>Mark as Active Product</Typography>}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 3, gap: 2 }}>
                            <Button onClick={handleClose} sx={{ fontWeight: 700, px: 3 }}>Discard</Button>
                            <Button
                                variant="contained"
                                className="gradient-button"
                                onClick={handleClose}
                                sx={{ px: 4 }}
                            >
                                {editMode ? 'Update Catalog' : 'Add to Catalog'}
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default Products;
