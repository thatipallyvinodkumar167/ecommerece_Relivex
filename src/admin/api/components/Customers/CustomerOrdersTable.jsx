import React from 'react';
import { Box, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Visibility as ViewIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const CustomerOrdersTable = ({ orders }) => {
    const columns = [
        {
            field: 'id',
            headerName: 'ORDER ID',
            width: 120,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    #{params.value}
                </Typography>
            )
        },
        { field: 'date', headerName: 'DATE', width: 130 },
        {
            field: 'product',
            headerName: 'PRODUCT',
            flex: 1,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {params.value}
                </Typography>
            )
        },
        {
            field: 'total',
            headerName: 'TOTAL',
            width: 120,
            renderCell: (params) => (
                <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    ₹{params.value.toLocaleString('en-IN')}
                </Typography>
            )
        },
        {
            field: 'status',
            headerName: 'STATUS',
            width: 140,
            renderCell: (params) => {
                const colors = {
                    'Delivered': { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' },
                    'Pending': { bg: 'rgba(250, 204, 21, 0.1)', text: '#facc15' },
                    'Cancelled': { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' }
                };
                const style = colors[params.value] || colors['Pending'];

                return (
                    <Box component={params.value === 'Pending' ? motion.div : 'div'}
                        animate={params.value === 'Pending' ? { opacity: [1, 0.6, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        <Chip
                            label={params.value}
                            size="small"
                            sx={{
                                fontWeight: 700,
                                bgcolor: style.bg,
                                color: style.text,
                                border: 'none'
                            }}
                        />
                    </Box>
                );
            }
        },
        {
            field: 'actions',
            headerName: '',
            width: 80,
            sortable: false,
            renderCell: (params) => (
                <Tooltip title="View Order Details">
                    <IconButton size="small">
                        <ViewIcon sx={{ color: '#64748b' }} />
                    </IconButton>
                </Tooltip>
            )
        }
    ];

    return (
        <Box className="glass-card" sx={{ height: 400, width: '100%', mt: 4, overflow: 'hidden', border: '1px solid rgba(226, 232, 240, 0.8)' }}>
            <Box sx={{ p: 2.5, borderBottom: '1px solid #f1f5f9' }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Order History</Typography>
            </Box>
            <DataGrid
                rows={orders}
                columns={columns}
                pageSize={5}
                disableSelectionOnClick
                sx={{
                    border: 'none',
                    '& .MuiDataGrid-columnHeaders': {
                        bgcolor: '#f8fafc',
                        fontWeight: 900,
                        fontSize: '0.75rem',
                        color: '#94a3b8'
                    },
                    '& .MuiDataGrid-row:hover': {
                        bgcolor: 'rgba(0,0,0,0.01)'
                    }
                }}
            />
        </Box>
    );
};

export default CustomerOrdersTable;
