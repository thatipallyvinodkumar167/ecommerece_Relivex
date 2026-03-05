import React from 'react';
import {
    Grid,
    Typography,
    Box,
    Button,
    Card
} from '@mui/material';
import {
    ShoppingCart as OrdersIcon,
    HourglassEmpty as PendingIcon,
    CheckCircle as DeliveredIcon,
    AccountBalanceWallet as EarningsIcon,
    TrendingUp as TrendIcon
} from '@mui/icons-material';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import StatCard from '../components/VendorStatsCards';

const salesData = [
    { name: 'Mon', revenue: 4000, orders: 12 },
    { name: 'Tue', revenue: 3000, orders: 8 },
    { name: 'Wed', revenue: 5000, orders: 15 },
    { name: 'Thu', revenue: 2780, orders: 9 },
    { name: 'Fri', revenue: 1890, orders: 6 },
    { name: 'Sat', revenue: 2390, orders: 7 },
    { name: 'Sun', revenue: 3490, orders: 11 },
];

const VendorDashboard = () => {
    const stats = [
        { title: 'Total Orders', value: '124', change: '+14%', icon: <OrdersIcon /> },
        { title: 'Pending Orders', value: '18', change: '-5%', icon: <PendingIcon /> },
        { title: 'Delivered', value: '106', change: '+12%', icon: <DeliveredIcon /> },
        { title: 'Total Earnings', value: '₹45,890', change: '+18%', icon: <EarningsIcon /> },
    ];

    return (
        <Box>
            <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                        Dashboard Overview
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Monitoring your medical supply performance in real-time.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<TrendIcon />}
                    sx={{
                        borderRadius: '12px',
                        bgcolor: '#008a45',
                        fontWeight: 700,
                        px: 3,
                        py: 1.5,
                        textTransform: 'none',
                        boxShadow: '0 8px 16px rgba(0, 138, 69, 0.2)',
                        '&:hover': { bgcolor: '#064e3b' }
                    }}
                >
                    Extract Report
                </Button>
            </Box>

            <Grid container spacing={4}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <StatCard {...stat} />
                    </Grid>
                ))}

                {/* Revenue Chart */}
                <Grid item xs={12} lg={8}>
                    <Box sx={{
                        p: 4,
                        borderRadius: '32px',
                        bgcolor: '#fff',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)',
                        height: 450
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Revenue Analytics (INR)</Typography>
                        <Box sx={{ height: 320 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#008a45" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#008a45" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#008a45"
                                        strokeWidth={4}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </Box>
                    </Box>
                </Grid>

                {/* Order Volume Chart */}
                <Grid item xs={12} lg={4}>
                    <Box sx={{
                        p: 4,
                        borderRadius: '32px',
                        bgcolor: '#fff',
                        border: '1px solid #f1f5f9',
                        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)',
                        height: 450
                    }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Order Volume</Typography>
                        <Box sx={{ height: 320 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="orders" fill="#34d399" radius={[6, 6, 0, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default VendorDashboard;
