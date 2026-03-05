import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Chip,
    IconButton,
    Tooltip,
    TextField,
    InputAdornment
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
    Receipt as ReceiptIcon,
    Undo as RefundIcon,
    CheckCircle as SuccessIcon,
    Search as SearchIcon,
    Payment as PaymentIcon,
    AccountBalance as BankIcon,
    CreditCard as CardIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import api from '../../api/axiosConfig';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await api.get('/payments');
                setPayments(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching payments:", err);
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    const columns = [
        {
            field: 'id',
            headerName: 'TXN Identifier',
            width: 150,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b', fontFamily: 'monospace' }}>
                    #{params.value}
                </Typography>
            )
        },
        {
            field: 'customer',
            headerName: 'Payer Account',
            width: 200,
            renderCell: (params) => (
                <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                        {params.value}
                    </Typography>
                </Box>
            )
        },
        {
            field: 'method',
            headerName: 'Settlement Method',
            width: 180,
            renderCell: (params) => {
                const getIcon = (method) => {
                    if (method.includes('UPI')) return <BankIcon sx={{ fontSize: 16, mr: 1, color: '#64748b' }} />;
                    if (method.includes('Card')) return <CardIcon sx={{ fontSize: 16, mr: 1, color: '#64748b' }} />;
                    return <PaymentIcon sx={{ fontSize: 16, mr: 1, color: '#64748b' }} />;
                };
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getIcon(params.value)}
                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#444' }}>{params.value}</Typography>
                    </Box>
                );
            }
        },
        {
            field: 'amount',
            headerName: 'Transaction Sum',
            width: 140,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#1e293b' }}>
                    ₹{params.value.toLocaleString('en-IN')}
                </Typography>
            )
        },
        {
            field: 'status',
            headerName: 'Verification State',
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    sx={{
                        fontWeight: 700,
                        borderRadius: '8px',
                        bgcolor: params.value === 'Completed' ? 'rgba(16, 185, 129, 0.1)' :
                            params.value === 'Refunded' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        color: params.value === 'Completed' ? '#10b981' :
                            params.value === 'Refunded' ? '#f59e0b' : '#ef4444'
                    }}
                    size="small"
                />
            )
        },
        { field: 'date', headerName: 'Processing Date', width: 150 },
        {
            field: 'actions',
            headerName: 'Operations',
            width: 140,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Download Receipt">
                        <IconButton size="small" sx={{ bgcolor: 'rgba(0, 138, 69, 0.05)', color: '#008a45' }}>
                            <ReceiptIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    {params.row.status === 'Completed' && (
                        <Tooltip title="Initiate Reversal">
                            <IconButton size="small" sx={{ bgcolor: 'rgba(245, 158, 11, 0.05)', color: '#f59e0b' }}>
                                <RefundIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            )
        }
    ];

    const filteredPayments = payments.filter(p =>
        p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Auditing financial ledger...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, mb: 5, gap: 3 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                        Financial Ledger
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Reviewing digital transactions and settlement history across hospital portals.
                    </Typography>
                </Box>
                <TextField
                    placeholder="Search transactions..."
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: '#64748b' }} /></InputAdornment>,
                        sx: {
                            borderRadius: '12px',
                            bgcolor: '#fff',
                            width: { xs: '100%', md: 300 },
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                        }
                    }}
                />
            </Box>

            <motion.div variants={itemVariants}>
                <Box className="glass-card" sx={{ height: 600, width: '100%', overflow: 'hidden' }}>
                    <DataGrid
                        rows={filteredPayments}
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
        </Box>
    );
};

export default Payments;

