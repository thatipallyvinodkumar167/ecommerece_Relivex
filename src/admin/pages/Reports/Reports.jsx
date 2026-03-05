import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    Box,
    Card,
    CardContent,
    useTheme,
    IconButton,
    Tooltip as MuiTooltip
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
    AreaChart,
    Area
} from 'recharts';
import {
    TrendingUp as TrendingIcon,
    FileDownload as ExportIcon,
    Refresh as RefreshIcon,
    Timeline as AnalyticsIcon,
    Assessment as SalesIcon,
    PieChart as CategoryIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import api from '../../api/axiosConfig';

const COLORS = ['#008a45', '#facc15', '#064e3b', '#ed6c02', '#d32f2f'];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const Reports = () => {
    const theme = useTheme();
    const [revenueData, setRevenueData] = useState([]);
    const [salesByCategory, setSalesByCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = React.useCallback(async () => {
        setLoading(true);
        try {
            // Simulating API fetch
            setRevenueData([
                { month: 'Jan', revenue: 450000, orders: 120 },
                { month: 'Feb', revenue: 380000, orders: 110 },
                { month: 'Mar', revenue: 590000, orders: 150 },
                { month: 'Apr', revenue: 512000, orders: 140 },
                { month: 'May', revenue: 680000, orders: 180 },
                { month: 'Jun', revenue: 620000, orders: 165 },
            ]);
            setSalesByCategory([
                { name: 'Joint Pain', value: 4500 },
                { name: 'Neck Pain', value: 2800 },
                { name: 'Leg Pain', value: 3900 },
                { name: 'Backbone Pain', value: 3100 },
            ]);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching reports:", err);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleRefresh = () => {
        fetchData();
    };

    const handleDownload = () => {
        const headers = ['Month', 'Revenue', 'Orders'];
        const csvContent = [
            headers.join(','),
            ...revenueData.map(row => `${row.month},${row.revenue},${row.orders}`)
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `sales_report_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <Box className="glass-card" sx={{ p: 1.5, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                    <Typography variant="body2" sx={{ fontWeight: 800, mb: 0.5 }}>{label}</Typography>
                    {payload.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                {item.name}: ₹{item.value.toLocaleString('en-IN')}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            );
        }
        return null;
    };

    if (loading) return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="textSecondary">Compiling operational intelligence...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                        Strategic Insights
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Deep dive into hospital sales, category trajectories, and financial growth.
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <MuiTooltip title="Export CSV">
                        <IconButton onClick={handleDownload} sx={{ bgcolor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <ExportIcon />
                        </IconButton>
                    </MuiTooltip>
                    <MuiTooltip title="Refresh Data">
                        <IconButton onClick={handleRefresh} sx={{ bgcolor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                            <RefreshIcon />
                        </IconButton>
                    </MuiTooltip>
                </Box>
            </Box>

            <Grid container spacing={4}>
                {/* Revenue Evolution */}
                <Grid size={{ xs: 12, lg: 8 }}>
                    <motion.div variants={itemVariants}>
                        <Card className="glass-card" sx={{ p: 2, height: 450 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <AnalyticsIcon sx={{ color: '#008a45' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Revenue Performance Matrix</Typography>
                                </Box>
                                <Typography variant="caption" sx={{ color: '#008a45', fontWeight: 700, px: 1.5, py: 0.5, bgcolor: 'rgba(0, 138, 69, 0.05)', borderRadius: '12px' }}>
                                    Monthly Aggregates
                                </Typography>
                            </Box>
                            <ResponsiveContainer width="100%" height="85%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.2} />
                                            <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                    <RechartsTooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="revenue" stroke="#008a45" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Card>
                    </motion.div>
                </Grid>

                {/* Patient Preferences */}
                <Grid size={{ xs: 12, lg: 4 }}>
                    <motion.div variants={itemVariants}>
                        <Card className="glass-card" sx={{ p: 2, height: 450 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <CategoryIcon sx={{ color: '#008a45' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Therapeutic Distribution</Typography>
                            </Box>
                            <ResponsiveContainer width="100%" height="80%">
                                <PieChart>
                                    <Pie
                                        data={salesByCategory}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={100}
                                        paddingAngle={8}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {salesByCategory.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip content={<CustomTooltip />} />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 700 }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </Card>
                    </motion.div>
                </Grid>

                {/* Sales Volume Benchmarking */}
                <Grid size={{ xs: 12 }}>
                    <motion.div variants={itemVariants}>
                        <Card className="glass-card" sx={{ p: 2, height: 400 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                                <SalesIcon sx={{ color: '#008a45' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>Order Velocity Forecasting</Typography>
                            </Box>
                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
                                    <RechartsTooltip
                                        cursor={{ fill: 'rgba(0, 138, 69, 0.03)' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="orders" fill="#008a45" radius={[6, 6, 0, 0]} barSize={40} name="Total Orders" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Card>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Reports;

