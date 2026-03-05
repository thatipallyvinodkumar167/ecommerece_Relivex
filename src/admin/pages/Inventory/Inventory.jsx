import React from 'react';
import {
    Box,
    Typography,
    Chip,
    Button,
    IconButton,
    Tooltip
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import api from '../../api/axiosConfig';
import { motion } from 'framer-motion';
import {
    Edit as EditIcon,
    Add as AddIcon,
    Warning as WarningIcon
} from '@mui/icons-material';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const Inventory = () => {
    const [inventory, setInventory] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchInventory = async () => {
            try {
                const res = await api.get('/inventory');
                setInventory(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching inventory:", error);
                setLoading(false);
            }
        };
        fetchInventory();
    }, []);

    const columns = [
        {
            field: 'sku',
            headerName: 'Batch SKU',
            width: 150,
            renderCell: (params) => (
                <Typography sx={{ fontWeight: 700, color: '#1e293b' }}>{params.value}</Typography>
            )
        },
        {
            field: 'product',
            headerName: 'Medical Product',
            width: 250,
            renderCell: (params) => (
                <Typography sx={{ fontWeight: 600 }}>{params.value}</Typography>
            )
        },
        {
            field: 'currentStock',
            headerName: 'In Stock',
            width: 120,
            renderCell: (params) => (
                <Typography sx={{ fontWeight: 800, color: params.value < 50 ? '#ef4444' : '#10b981' }}>
                    {params.value}
                </Typography>
            )
        },
        { field: 'minStock', headerName: 'Min Level', width: 120 },
        { field: 'location', headerName: 'Warehouse / Rack', width: 180 },
        {
            field: 'status',
            headerName: 'Stock Health',
            width: 150,
            renderCell: (params) => {
                const isLow = params.row.currentStock <= params.row.minStock;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {isLow && (
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }}
                            />
                        )}
                        <Chip
                            label={isLow ? 'Low Stock' : 'Healthy'}
                            size="small"
                            sx={{
                                fontWeight: isLow ? 700 : 800,
                                borderRadius: '8px',
                                bgcolor: isLow ? 'rgba(239, 68, 68, 0.1)' : undefined, // Use undefined to allow background to take over
                                color: isLow ? '#ef4444' : '#fff',
                                ...(isLow ? {} : {
                                    background: 'linear-gradient(135deg, #008a45 0%, #064e3b 100%)',
                                    boxShadow: '0 4px 12px rgba(0, 138, 69, 0.3)'
                                })
                            }}
                        />
                    </Box>
                );
            }
        },
        {
            field: 'actions',
            headerName: 'Management',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Stock In/Out">
                        <IconButton
                            size="small"
                            color="primary"
                            component={motion.button}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            sx={{ bgcolor: 'rgba(0, 138, 69, 0.05)' }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    {params.row.currentStock <= params.row.minStock && (
                        <Tooltip title="Urgent Reorder">
                            <IconButton
                                size="small"
                                color="warning"
                                component={motion.button}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                sx={{ bgcolor: 'rgba(245, 158, 11, 0.05)' }}
                            >
                                <WarningIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            )
        }
    ];

    if (loading) return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Typography variant="h5" color="textSecondary">Loading Inventory Data...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                        Inventory Logistics
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Real-time tracking of medical supplies and hospital stock levels.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    className="gradient-button"
                    startIcon={<AddIcon />}
                    sx={{ height: 48, px: 3 }}
                >
                    Update Stock Registry
                </Button>
            </Box>

            <motion.div variants={itemVariants}>
                <Box className="glass-card" sx={{ height: 650, width: '100%', overflow: 'hidden' }}>
                    <DataGrid
                        rows={inventory}
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
                            '& .MuiDataGrid-footerContainer': {
                                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: '#475569'
                                },
                                '& .MuiTablePagination-select': {
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: '#008a45'
                                },
                                '& .MuiTablePagination-actions button': {
                                    color: '#008a45'
                                }
                            },
                            '& .MuiDataGrid-toolbarContainer .MuiButton-root': {
                                color: '#008a45',
                                '&:hover': {
                                    bgcolor: 'rgba(0, 138, 69, 0.05)'
                                }
                            },
                            '& .MuiDataGrid-columnHeaderTitleContainer': {
                                '& .MuiDataGrid-columnHeaderTitle': {
                                    fontWeight: 700
                                }
                            },
                            '& .MuiDataGrid-columnHeader--sortable:hover': {
                                bgcolor: 'rgba(0, 138, 69, 0.05)'
                            },
                            '& .MuiDataGrid-columnHeader--sorted': {
                                bgcolor: 'rgba(0, 138, 69, 0.1)'
                            },
                            '& .MuiDataGrid-sortIcon': {
                                color: '#008a45'
                            },
                            '& .MuiDataGrid-menuIcon': {
                                color: '#008a45'
                            },
                            '& .MuiDataGrid-filterIcon': {
                                color: '#008a45'
                            },
                            '& .MuiDataGrid-cell--textLeft': {
                                '& .MuiTypography-root': {
                                    fontSize: '0.875rem'
                                }
                            },
                            '& .MuiDataGrid-cell--textRight': {
                                '& .MuiTypography-root': {
                                    fontSize: '0.875rem'
                                }
                            },
                            '& .MuiDataGrid-cell--textCenter': {
                                '& .MuiTypography-root': {
                                    fontSize: '0.875rem'
                                }
                            },
                            '& .MuiDataGrid-cell--boolean': {
                                '& .MuiSvgIcon-root': {
                                    color: '#008a45'
                                }
                            },
                            '& .MuiDataGrid-cell--actions': {
                                '& .MuiIconButton-root': {
                                    color: '#008a45'
                                }
                            },
                            '& .MuiDataGrid-cell--editable': {
                                '& .MuiInputBase-root': {
                                    color: '#008a45'
                                }
                            },
                            '& .MuiDataGrid-cell--editing': {
                                '& .MuiInputBase-root': {
                                    borderColor: '#008a45'
                                }
                            },
                            '& .MuiDataGrid-cell--error': {
                                '& .MuiInputBase-root': {
                                    borderColor: '#ef4444'
                                }
                            },
                            '& .MuiDataGrid-cell--selected': {
                                bgcolor: 'rgba(0, 138, 69, 0.05)'
                            },
                            '& .MuiDataGrid-cell--focusVisible': {
                                outline: '2px solid #008a45'
                            },
                            '& .MuiDataGrid-cell--withRenderer': {
                                '& .MuiChip-root': {
                                    fontSize: '0.65rem',
                                    fontWeight: 900,
                                    bgcolor: '#008a45',
                                    color: '#fff'
                                }
                            }
                        }}
                    />
                </Box>
            </motion.div>
        </Box>
    );
};

export default Inventory;
