import React from 'react';
import { Grid, Card, Box, Typography } from '@mui/material';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { motion } from 'framer-motion';

const CustomerAnalytics = ({ data }) => {
    const COLORS = ['#008a45', '#facc15', '#ef4444'];

    return (
        <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Spending History */}
            <Grid item xs={12} md={8}>
                <Card className="glass-card" sx={{ p: 3, height: 350, border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Spending History (INR)</Typography>
                    <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={data.spendingHistory}>
                            <defs>
                                <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#008a45" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#008a45" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                            />
                            <Area type="monotone" dataKey="spent" stroke="#008a45" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>
            </Grid>

            {/* Order Status */}
            <Grid item xs={12} md={4}>
                <Card className="glass-card" sx={{ p: 3, height: 350, border: '1px solid rgba(226, 232, 240, 0.8)' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Order Distribution</Typography>
                    <ResponsiveContainer width="100%" height="80%">
                        <PieChart>
                            <Pie
                                data={data.orderDistribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.orderDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                        {data.orderDistribution.map((entry, i) => (
                            <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: COLORS[i] }} />
                                <Typography variant="caption" sx={{ fontWeight: 700 }}>{entry.name}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

export default CustomerAnalytics;
