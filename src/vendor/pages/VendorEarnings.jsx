import React from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    Paper,
    Divider,
    Button,
    Stack
} from '@mui/material';
import {
    AccountBalanceWallet as WalletIcon,
    TrendingUp as ProfitIcon,
    History as HistoryIcon,
    Download as DownloadIcon
} from '@mui/icons-material';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const earningsData = [
    { month: 'Jan', earnings: 12000 },
    { month: 'Feb', earnings: 15000 },
    { month: 'Mar', earnings: 13000 },
    { month: 'Apr', earnings: 18000 },
    { month: 'May', earnings: 22000 },
    { month: 'Jun', earnings: 25000 },
];

const VendorEarnings = () => {
    return (
        <Box>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                        Earnings Report
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Track your revenue growth and transaction history.
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    sx={{ borderRadius: '12px', fontWeight: 700, borderColor: '#e2e8f0' }}
                >
                    Download Statements
                </Button>
            </Box>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 4, borderRadius: '24px', bgcolor: '#1e293b', color: '#fff' }}>
                        <Typography variant="subtitle2" sx={{ opacity: 0.8, mb: 1 }}>Total Revenue</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 900 }}>₹2,45,890</Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 2, color: '#4ade80' }}>
                            <ProfitIcon fontSize="small" />
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>+12.5% from last month</Typography>
                        </Stack>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 4, borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>This Month Earnings</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 900, color: '#008a45' }}>₹25,000</Typography>
                        <Button sx={{ mt: 2, fontWeight: 700, p: 0, textTransform: 'none', color: '#008a45' }}>View Breakdown</Button>
                    </Card>
                </Grid>
            </Grid>

            <Card sx={{ p: 4, borderRadius: '24px', mb: 4, border: '1px solid #f1f5f9' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Revenue Growth Chart</Typography>
                <Box sx={{ height: 350 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={earningsData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} tickFormatter={(v) => `₹${v / 1000}k`} />
                            <Tooltip />
                            <Area type="monotone" dataKey="earnings" stroke="#008a45" strokeWidth={3} fill="#008a45" fillOpacity={0.05} />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </Card>
        </Box>
    );
};

export default VendorEarnings;
