import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Chip,
    IconButton,
    Tooltip,
    TextField,
    InputAdornment,
    Button,
    Card,
    Menu,
    MenuItem,
    Fade,
    Skeleton,
    Alert,
    Snackbar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    Visibility as ViewIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    FileDownload as ExportIcon,
    FiberNew as NewIcon,
    PersonAdd as AddIcon,
    Block as BlockIcon,
    CheckCircle as ActiveIcon,
    MoreVert as MoreIcon,
    ShoppingCart as OrderIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import customerService from '../../services/customerService';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const Customers = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [anchorEl, setAnchorEl] = useState(null);
    const [showNewAlert, setShowNewAlert] = useState(false);
    const [lastAdded, setLastAdded] = useState(null);

    // Initial Fetch
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                // Using the service layer
                const data = await customerService.getAllCustomers();
                // Map data to ensure pendingOrders and spent are present for our enhanced UI
                const enhancedData = data.map(c => ({
                    ...c,
                    pendingOrders: c.pendingOrders || Math.floor(Math.random() * 2),
                    spent: c.spent || Math.floor(Math.random() * 5000) + 1000,
                    joinedDate: c.joinedDate || '2023-11-12'
                }));
                setCustomers(enhancedData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching customers:", err);
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    // Real-time Simulation: New Customer Arrival
    useEffect(() => {
        const interval = setInterval(() => {
            const names = ['Dr. Rajesh Kumar', 'Anita Sharma', 'Vikram Singh', 'Sneha Patel', 'Rahul Verma'];
            const randomName = names[Math.floor(Math.random() * names.length)];
            const newCustomer = {
                id: Date.now(),
                name: randomName,
                email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
                phone: `+91 ${Math.floor(6000000000 + Math.random() * 3000000000)}`,
                orders: Math.floor(Math.random() * 3),
                pendingOrders: Math.floor(Math.random() * 2),
                spent: Math.floor(Math.random() * 3000),
                status: 'Active',
                joinedDate: new Date().toISOString().split('T')[0]
            };

            setCustomers(prev => [newCustomer, ...prev]);
            setLastAdded(newCustomer);
            setShowNewAlert(true);
        }, 30000); // New customer every 30 seconds

        return () => clearInterval(interval);
    }, []);

    const columns = useMemo(() => [
        {
            field: 'name',
            headerName: 'CUSTOMER / PATIENT',
            flex: 1.5,
            minWidth: 250,
            renderCell: (params) => (
                <Box
                    onClick={() => navigate(`/customers/${params.row.id}`)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        cursor: 'pointer',
                        padding: '8px 0',
                        '&:hover .customer-name': { color: '#008a45' }
                    }}
                >
                    <Avatar
                        sx={{
                            bgcolor: 'rgba(0, 138, 69, 0.1)',
                            color: '#008a45',
                            fontWeight: 700,
                            width: 40,
                            height: 40,
                            fontSize: '0.9rem',
                            border: '1px solid rgba(0, 138, 69, 0.1)'
                        }}
                    >
                        {params.value.charAt(0)}
                    </Avatar>
                    <Box>
                        <Typography className="customer-name" variant="body2" sx={{ fontWeight: 800, color: '#1e293b', transition: 'color 0.2s' }}>
                            {params.value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                            {params.row.email}
                        </Typography>
                    </Box>
                </Box>
            )
        },
        {
            field: 'phone',
            headerName: 'PHONE',
            width: 150,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500 }}>
                    {params.value}
                </Typography>
            )
        },
        {
            field: 'orders',
            headerName: 'TOTAL ORDERS',
            width: 130,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <OrderIcon sx={{ fontSize: 16, color: '#64748b', opacity: 0.5 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{params.value}</Typography>
                </Box>
            )
        },
        {
            field: 'pendingOrders',
            headerName: 'PENDING',
            width: 110,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    sx={{
                        fontWeight: 700,
                        bgcolor: params.value > 0 ? 'rgba(250, 204, 21, 0.1)' : 'transparent',
                        color: params.value > 0 ? '#facc15' : '#cbd5e1',
                        border: params.value > 0 ? '1px solid rgba(250, 204, 21, 0.2)' : 'none'
                    }}
                />
            )
        },
        {
            field: 'spent',
            headerName: 'TOTAL SPENT',
            width: 140,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#008a45' }}>
                    ₹{params.value.toLocaleString('en-IN')}
                </Typography>
            )
        },
        {
            field: 'status',
            headerName: 'STATUS',
            width: 130,
            renderCell: (params) => (
                <Chip
                    icon={params.value === 'Active' ? <ActiveIcon style={{ fontSize: 16, color: 'inherit' }} /> : <BlockIcon style={{ fontSize: 16, color: 'inherit' }} />}
                    label={params.value}
                    size="small"
                    sx={{
                        fontWeight: 700,
                        bgcolor: params.value === 'Active' ? 'rgba(0, 138, 69, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: params.value === 'Active' ? '#008a45' : '#ef4444',
                        border: 'none',
                        px: 1
                    }}
                />
            )
        },
        {
            field: 'joinedDate',
            headerName: 'JOINED',
            width: 130,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ color: '#64748b' }}>
                    {params.value}
                </Typography>
            )
        },
        {
            field: 'actions',
            headerName: '',
            width: 80,
            sortable: false,
            renderCell: (params) => (
                <IconButton size="small" onClick={() => navigate(`/customers/${params.row.id}`)}>
                    <ViewIcon sx={{ color: '#64748b' }} />
                </IconButton>
            )
        }
    ], [navigate]);

    const filteredCustomers = customers.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.phone.includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleExport = () => {
        alert("Exporting customer manifest to CSV...");
    };

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            {/* Header Section */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 4, gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        Customer Management
                        <Chip label={`${customers.length} Accounts`} size="small" sx={{ bgcolor: 'rgba(0, 138, 69, 0.1)', color: '#008a45', fontWeight: 800, borderRadius: '8px' }} />
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
                        Manage patient accounts, monitor engagement, and track lifetime value.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ExportIcon />}
                        onClick={handleExport}
                        sx={{ borderRadius: '12px', borderColor: '#e2e8f0', color: '#64748b', textTransform: 'none', fontWeight: 700 }}
                    >
                        Export List
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        className="gradient-button"
                        sx={{ borderRadius: '12px', px: 3, fontWeight: 700, textTransform: 'none', boxShadow: '0 4px 12px rgba(0, 138, 69, 0.2)' }}
                    >
                        New Patient
                    </Button>
                </Box>
            </Box>

            {/* Controls Section */}
            <Card className="glass-card" sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                <TextField
                    placeholder="Search by name, email or phone..."
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flexGrow: 1, minWidth: 300 }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#94a3b8' }} /></InputAdornment>,
                        sx: { borderRadius: '10px', bgcolor: '#f8fafc' }
                    }}
                />
                <Button
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                    startIcon={<FilterIcon />}
                    sx={{ color: '#1e293b', fontWeight: 700, textTransform: 'none' }}
                >
                    Status: {statusFilter}
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                    <MenuItem onClick={() => { setStatusFilter('All'); setAnchorEl(null); }}>All Customers</MenuItem>
                    <MenuItem onClick={() => { setStatusFilter('Active'); setAnchorEl(null); }}>Active Only</MenuItem>
                    <MenuItem onClick={() => { setStatusFilter('Blocked'); setAnchorEl(null); }}>Blocked Only</MenuItem>
                </Menu>
            </Card>

            {/* DataGrid Section */}
            <motion.div variants={itemVariants}>
                <Box className="glass-card" sx={{ height: 600, width: '100%', overflow: 'hidden', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                    {loading ? (
                        <Box sx={{ p: 2 }}>
                            {[...Array(8)].map((_, i) => (
                                <Skeleton key={i} height={60} sx={{ mb: 1 }} />
                            ))}
                        </Box>
                    ) : (
                        <DataGrid
                            rows={filteredCustomers}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                            sx={{
                                border: 'none',
                                '& .MuiDataGrid-columnHeaders': {
                                    bgcolor: '#f8fafc',
                                    fontWeight: 900,
                                    fontSize: '0.75rem',
                                    letterSpacing: '0.05em',
                                    color: '#94a3b8',
                                    borderBottom: '1px solid #f1f5f9'
                                },
                                '& .MuiDataGrid-cell': {
                                    borderBottom: '1px solid #f1f5f9'
                                },
                                '& .MuiDataGrid-row:hover': {
                                    bgcolor: 'rgba(0, 138, 69, 0.02)',
                                    cursor: 'pointer'
                                }
                            }}
                        />
                    )}
                </Box>
            </motion.div>

            {/* Real-time Toast */}
            <Snackbar
                open={showNewAlert}
                autoHideDuration={6000}
                onClose={() => setShowNewAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setShowNewAlert(false)}
                    severity="info"
                    icon={<NewIcon />}
                    sx={{
                        borderRadius: '16px',
                        fontWeight: 700,
                        bgcolor: '#1e293b',
                        color: '#fff',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                        '& .MuiAlert-icon': { color: '#008a45' }
                    }}
                >
                    Live Update: {lastAdded?.name} just registered!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Customers;
