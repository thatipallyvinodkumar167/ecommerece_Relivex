import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    Avatar,
    Chip,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    MenuItem,
    InputAdornment
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    PersonAdd as PersonAddIcon,
    Visibility as ViewIcon,
    Block as SuspendIcon,
    CheckCircle as ActiveIcon,
    BarChart as AnalyticsIcon,
    Business as BusinessIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as AddressIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axiosConfig';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const Vendors = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const res = await api.get('/vendors');
                setVendors(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching vendors:", err);
                setLoading(false);
            }
        };
        fetchVendors();
    }, []);

    const handleOpen = (vendor = null) => {
        setSelectedVendor(vendor);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedVendor(null);
    };

    const columns = [
        {
            field: 'name',
            headerName: 'Vendor',
            width: 220,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar
                        sx={{
                            bgcolor: '#f1f5f9',
                            color: '#008a45',
                            fontWeight: 700,
                            width: 36,
                            height: 36,
                            fontSize: '0.9rem',
                            border: '1px solid rgba(0, 138, 69, 0.1)'
                        }}
                    >
                        {params.value.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                            {params.value}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            ID: VND-{params.row.id}
                        </Typography>
                    </Box>
                </Box>
            )
        },
        {
            field: 'business',
            headerName: 'Business Entity',
            width: 200,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
                    {params.value}
                </Typography>
            )
        },
        { field: 'email', headerName: 'Contact Email', width: 200 },
        {
            field: 'commission',
            headerName: 'Fee Rate',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={`${params.value}%`}
                    size="small"
                    sx={{ fontWeight: 700, bgcolor: 'rgba(0, 138, 69, 0.05)', color: '#008a45' }}
                />
            )
        },
        {
            field: 'status',
            headerName: 'Operational Status',
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    sx={{
                        fontWeight: 700,
                        borderRadius: '8px',
                        bgcolor: params.value === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: params.value === 'Active' ? '#10b981' : '#ef4444'
                    }}
                    size="small"
                />
            )
        },
        {
            field: 'actions',
            headerName: 'Management',
            width: 180,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="View Products">
                        <IconButton size="small" color="primary" sx={{ bgcolor: 'rgba(0, 138, 69, 0.05)' }}>
                            <ViewIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Performance">
                        <IconButton size="small" color="secondary" sx={{ bgcolor: 'rgba(156, 39, 176, 0.05)' }}>
                            <AnalyticsIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={params.row.status === 'Active' ? "Suspend" : "Activate"}>
                        <IconButton
                            size="small"
                            color={params.row.status === 'Active' ? "error" : "success"}
                            sx={{ bgcolor: params.row.status === 'Active' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)' }}
                        >
                            {params.row.status === 'Active' ? <SuspendIcon fontSize="small" /> : <ActiveIcon fontSize="small" />}
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        }
    ];

    if (loading) return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Syncing vendor network...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                        Supplier Network
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Partners providing medical infrastructure and pain relief products.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    className="gradient-button"
                    startIcon={<PersonAddIcon />}
                    onClick={() => handleOpen()}
                    sx={{ height: 48, px: 3 }}
                >
                    Onboard New Vendor
                </Button>
            </Box>

            <motion.div variants={itemVariants}>
                <Box className="glass-card" sx={{ height: 600, width: '100%', overflow: 'hidden' }}>
                    <DataGrid
                        rows={vendors}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10, 25, 50]}
                        disableSelectionOnClick
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-columnHeaders': {
                                bgcolor: '#f8fafc',
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
                        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem' }}>
                            Vendor Registration Registry
                        </DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={4} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Vendor Display Name" defaultValue={selectedVendor?.name || ''} placeholder="e.g. Apollo Pharma Solutions" />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Registration ID" defaultValue={selectedVendor?.id || ''} placeholder="VND-7721" />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Contact Email" defaultValue={selectedVendor?.email || ''} placeholder="logistics@vendor.com" />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Direct Phone" defaultValue={selectedVendor?.phone || ''} placeholder="+91 999 888 7777" />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField fullWidth label="Operational Address" defaultValue={selectedVendor?.address || ''} placeholder="Industrial Hub, Phase 3, Delhi" />
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField select fullWidth label="Compliance Grade" defaultValue="A+">
                                        <MenuItem value="A+">A+ Premium</MenuItem>
                                        <MenuItem value="A">Grade A</MenuItem>
                                        <MenuItem value="B">Grade B</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <TextField fullWidth label="Contract Validity" placeholder="Dec 2026" />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 3, gap: 2 }}>
                            <Button onClick={handleClose} sx={{ fontWeight: 700, px: 3 }}>Discard Process</Button>
                            <Button
                                variant="contained"
                                className="gradient-button"
                                onClick={handleClose}
                                sx={{ px: 4 }}
                            >
                                Authorize & Onboard
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default Vendors;

