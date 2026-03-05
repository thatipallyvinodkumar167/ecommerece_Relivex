import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Grid,
    TextField,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Chip,
    Switch,
    FormControlLabel,
    InputAdornment,
    LinearProgress
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    ContentCopy as CopyIcon,
    LocalOffer as CouponIcon,
    Event as EventIcon,
    Groups as GroupsIcon,
    TrendingUp as TrendIcon
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

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const res = await api.get('/coupons');
                setCoupons(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching coupons:", err);
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
    };

    const columns = [
        {
            field: 'code',
            headerName: 'Voucher Code',
            width: 180,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                        px: 1.5,
                        py: 0.5,
                        bgcolor: 'rgba(0, 138, 69, 0.05)',
                        border: '1px dashed #008a45',
                        borderRadius: '6px'
                    }}>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#008a45', letterSpacing: 1 }}>
                            {params.value}
                        </Typography>
                    </Box>
                    <Tooltip title="Copy Code">
                        <IconButton size="small" onClick={() => handleCopy(params.value)}>
                            <CopyIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            )
        },
        {
            field: 'discount',
            headerName: 'Value Reduct.',
            width: 130,
            renderCell: (params) => (
                <Chip
                    label={`${params.value}% OFF`}
                    size="small"
                    sx={{ fontWeight: 800, bgcolor: '#10b981', color: '#fff' }}
                />
            )
        },
        {
            field: 'expiry',
            headerName: 'Valid Until',
            width: 150,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EventIcon sx={{ fontSize: 16, color: '#64748b' }} />
                    <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500 }}>{params.value}</Typography>
                </Box>
            )
        },
        {
            field: 'usage',
            headerName: 'Campaign Reach',
            width: 200,
            renderCell: (params) => {
                const progress = (params.row.used / params.row.limit) * 100;
                return (
                    <Box sx={{ width: '100%', pr: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{params.row.used} reclaimed</Typography>
                            <Typography variant="caption" color="textSecondary">{params.row.limit} cap</Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 6,
                                borderRadius: 3,
                                bgcolor: '#f1f5f9',
                                '& .MuiLinearProgress-bar': { bgcolor: progress > 90 ? '#ef4444' : '#008a45' }
                            }}
                        />
                    </Box>
                );
            }
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
                        bgcolor: params.value === 'Active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: params.value === 'Active' ? '#10b981' : '#ef4444'
                    }}
                    size="small"
                />
            )
        },
        {
            field: 'actions',
            headerName: 'Control',
            width: 120,
            sortable: false,
            renderCell: () => (
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" color="primary" sx={{ bgcolor: 'rgba(0, 138, 69, 0.05)' }}>
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" sx={{ bgcolor: 'rgba(239, 68, 68, 0.05)' }}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
            )
        }
    ];

    if (loading) return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Syncing promotional vouchers...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                        Promotion Hub
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Configure discounts and loyalty vouchers for pain treatment products.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    className="gradient-button"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                    sx={{ height: 48, px: 3 }}
                >
                    Create Campaign
                </Button>
            </Box>

            <motion.div variants={itemVariants}>
                <Box className="glass-card" sx={{ height: 600, width: '100%', overflow: 'hidden' }}>
                    <DataGrid
                        rows={coupons}
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
                        onClose={() => setOpen(false)}
                        maxWidth="sm"
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
                        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem' }}>Create Promotional Asset</DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={3} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="System Voucher Code"
                                        placeholder="e.g. RELIEF30"
                                        InputProps={{ startAdornment: <InputAdornment position="start"><CouponIcon sx={{ color: '#008a45' }} /></InputAdornment> }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Discount Percentage"
                                        InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        label="Expiration Date"
                                        InputLabelProps={{ shrink: true }}
                                        InputProps={{ startAdornment: <InputAdornment position="start"><EventIcon sx={{ color: '#64748b' }} /></InputAdornment> }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Global Usage Cap"
                                        InputProps={{ startAdornment: <InputAdornment position="start"><GroupsIcon sx={{ color: '#64748b' }} /></InputAdornment> }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <FormControlLabel
                                        control={<Switch defaultChecked sx={{ color: '#008a45' }} />}
                                        label={<Typography sx={{ fontWeight: 700 }}>Enable for Live Production</Typography>}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 3, gap: 2 }}>
                            <Button onClick={() => setOpen(false)} sx={{ fontWeight: 700 }}>Discard</Button>
                            <Button
                                variant="contained"
                                className="gradient-button"
                                onClick={() => setOpen(false)}
                                sx={{ px: 4 }}
                            >
                                Deploy Voucher
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default Coupons;

