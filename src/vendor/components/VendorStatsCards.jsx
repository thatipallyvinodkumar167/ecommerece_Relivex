import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

const AnimatedNumber = ({ value }) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const numericValue = typeof value === 'string' ? parseInt(value.replace(/[^0-9]/g, '')) : value;
    const prefix = typeof value === 'string' && value.includes('₹') ? '₹' : '';

    React.useEffect(() => {
        let start = 0;
        const end = numericValue;
        if (start === end) return;
        let totalDuration = 1000;
        let timer = setInterval(() => {
            start += Math.ceil(end / 40);
            if (start >= end) {
                setDisplayValue(end);
                clearInterval(timer);
            } else {
                setDisplayValue(start);
            }
        }, 25);
        return () => clearInterval(timer);
    }, [numericValue]);

    return <span>{prefix}{displayValue.toLocaleString('en-IN')}</span>;
};

const StatCard = ({ title, value, change, icon, color }) => {
    const isPositive = change?.startsWith('+');

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Box
                sx={{
                    p: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: '#fff',
                    borderRadius: '24px',
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                        <Typography color="textSecondary" variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
                            <AnimatedNumber value={value} />
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
                        {React.cloneElement(icon, { sx: { fontSize: 30, color: '#fff' } })}
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

export default StatCard;
