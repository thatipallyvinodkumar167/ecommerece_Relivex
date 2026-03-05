import React from 'react';
import { Grid, Card, Box, Typography } from '@mui/material';
import {
    ShoppingCart as OrderIcon,
    PendingActions as PendingIcon,
    CheckCircle as DeliveredIcon,
    AccountBalanceWallet as SpentIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
        y: 0,
        opacity: 1,
        transition: { delay: i * 0.1 }
    })
};

const CustomerSummaryCards = ({ stats }) => {
    const cards = [
        { label: 'Total Orders', value: stats.totalOrders || 0, icon: <OrderIcon />, color: '#008a45' },
        { label: 'Pending Orders', value: stats.pendingOrders || 0, icon: <PendingIcon />, color: '#facc15' },
        { label: 'Delivered', value: stats.deliveredOrders || 0, icon: <DeliveredIcon />, color: '#10b981' },
        { label: 'Total Spent', value: `₹${(stats.totalSpent || 0).toLocaleString('en-IN')}`, icon: <SpentIcon />, color: '#3b82f6' },
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {cards.map((card, i) => (
                <Grid item xs={12} sm={6} md={3} key={card.label}>
                    <Card
                        component={motion.div}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ y: -5, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                        className="glass-card"
                        sx={{
                            p: 3,
                            border: '1px solid rgba(226, 232, 240, 0.8)',
                            transition: 'all 0.3s'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                                bgcolor: `${card.color}15`,
                                color: card.color,
                                p: 1.5,
                                borderRadius: '14px',
                                display: 'flex'
                            }}>
                                {card.icon}
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block' }}>
                                    {card.label}
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                    {card.value}
                                </Typography>
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default CustomerSummaryCards;
