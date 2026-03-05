import React from 'react';
import {
    Box,
    Grid,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    LinearProgress,
    Button,
    IconButton,
    Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    ShoppingCart,
    Store,
    Inventory,
    HourglassEmpty,
    People,
    ArrowUpward,
    ArrowDownward,
    Refresh as RefreshIcon
} from '@mui/icons-material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as ChartTooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';
import api from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
};

const StatCard = ({ title, value, change, icon, path, filterStatus }) => {
    const isPositive = change.startsWith('+');
    const navigate = useNavigate();

    const getIcon = () => {
        const iconStyle = { fontSize: 32, color: 'white' };
        switch (icon) {
            case 'orders': return <ShoppingCart sx={iconStyle} />;
            case 'revenue': return <TrendingUp sx={iconStyle} />;
            case 'vendors': return <Store sx={iconStyle} />;
            case 'stock': return <Inventory sx={iconStyle} />;
            case 'pending': return <HourglassEmpty sx={iconStyle} />;
            case 'customers': return <People sx={iconStyle} />;
            default: return <ShoppingCart sx={iconStyle} />;
        }
    };

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ cursor: 'pointer' }}
            onClick={() => path && navigate(path, { state: { filterStatus } })}
        >
            <Box className="glass-card" sx={{ p: 3, position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                        <Typography color="textSecondary" variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            {value}
                        </Typography>
                    </Box>
                    <Box sx={{
                        height: 56,
                        width: 56,
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #008a45 0%, #064e3b 100%)',
                        boxShadow: '0 8px 16px rgba(0, 138, 69, 0.2)'
                    }}>
                        {getIcon()}
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: isPositive ? '#10b981' : '#ef4444',
                        bgcolor: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        px: 1,
                        py: 0.5,
                        borderRadius: '6px',
                        mr: 1
                    }}>
                        {isPositive ? <ArrowUpward sx={{ fontSize: 16 }} /> : <ArrowDownward sx={{ fontSize: 16 }} />}
                        <Typography variant="caption" sx={{ fontWeight: 700, ml: 0.5 }}>
                            {change}
                        </Typography>
                    </Box>
                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 500 }}>
                        vs last month
                    </Typography>
                </Box>
            </Box>
        </motion.div>
    );
};

const Dashboard = () => {
    const [stats, setStats] = React.useState([]);
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [revenueData] = React.useState([
        { month: 'Jan', revenue: 42000 },
        { month: 'Feb', revenue: 38000 },
        { month: 'Mar', revenue: 52000 },
        { month: 'Apr', revenue: 48000 },
        { month: 'May', revenue: 64000 },
        { month: 'Jun', revenue: 59000 },
    ]);

    const fetchData = React.useCallback(async () => {
        setLoading(true);
        try {
            const [statsRes, ordersRes] = await Promise.all([
                api.get('/stats'),
                api.get('/orders')
            ]);
            setStats(statsRes.data);
            setOrders(ordersRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleRefresh = () => {
        fetchData();
    };

    const handleDownload = () => {
        const headers = ['Statistic', 'Value', 'Change'];
        const csvContent = [
            headers.join(','),
            ...stats.map(s => `${s.title},${s.value},${s.change}`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `dashboard_stats_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Typography variant="h5" color="textSecondary">Loading Premium Insights...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                        Dashboard Overview
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Welcome back! Here's what's happening with your store today.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Tooltip title="Refresh Data">
                        <IconButton
                            onClick={handleRefresh}
                            sx={{
                                bgcolor: 'rgba(0, 138, 69, 0.05)',
                                color: '#008a45',
                                '&:hover': { bgcolor: 'rgba(0, 138, 69, 0.1)' }
                            }}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>
                    <Button
                        variant="contained"
                        className="gradient-button"
                        startIcon={<TrendingUp />}
                        onClick={handleDownload}
                    >
                        Download Report
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={4}>
                {stats.map((stat, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                        <StatCard {...stat} />
                    </Grid>
                ))}

                {/* Revenue Chart */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <motion.div variants={itemVariants}>
                        <Box className="glass-card" sx={{ p: 4, height: 450 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 4 }}>
                                Revenue Analytics (INR)
                            </Typography>
                            <ResponsiveContainer width="100%" height="90%">
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                    <ChartTooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                        formatter={(value) => [`₹${value}`, 'Revenue']}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#008a45"
                                        strokeWidth={4}
                                        dot={{ r: 6, fill: '#008a45', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 8, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </motion.div>
                </Grid>

                {/* Orders Chart */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <motion.div variants={itemVariants}>
                        <Box className="glass-card" sx={{ p: 4, height: 450 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 4 }}>
                                Sales Overview
                            </Typography>
                            <ResponsiveContainer width="100%" height="90%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                                    <ChartTooltip
                                        cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="revenue" fill="#34d399" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </motion.div>
                </Grid>

                {/* Recent Orders Table */}
                <Grid size={{ xs: 12 }}>
                    <motion.div variants={itemVariants}>
                        <Box className="glass-card" sx={{ p: 4 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                    Recent Orders
                                </Typography>
                                <Button size="small" sx={{ fontWeight: 700, color: '#008a45' }} onClick={() => navigate('/admin/orders')}>View All</Button>
                            </Box>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700, color: '#64748b', borderBottom: '2px solid #f1f5f9' }}>Order ID</TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: '#64748b', borderBottom: '2px solid #f1f5f9' }}>Customer</TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: '#64748b', borderBottom: '2px solid #f1f5f9' }}>Product</TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: '#64748b', borderBottom: '2px solid #f1f5f9' }}>Amount</TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: '#64748b', borderBottom: '2px solid #f1f5f9' }}>Status</TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: '#64748b', borderBottom: '2px solid #f1f5f9' }}>Date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.slice(0, 5).map((order) => (
                                            <TableRow key={order.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                                                <TableCell>{order.customer}</TableCell>
                                                <TableCell>{order.product}</TableCell>
                                                <TableCell sx={{ fontWeight: 700 }}>₹{order.amount}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={order.status}
                                                        size="small"
                                                        sx={{
                                                            fontWeight: 700,
                                                            borderRadius: '8px',
                                                            bgcolor: order.status === 'Delivered' ? 'rgba(16, 185, 129, 0.1)' :
                                                                order.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' :
                                                                    'rgba(239, 68, 68, 0.1)',
                                                            color: order.status === 'Delivered' ? '#10b981' :
                                                                order.status === 'Pending' ? '#f59e0b' :
                                                                    '#ef4444'
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell sx={{ color: '#64748b' }}>{order.date}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
