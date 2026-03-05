import React from 'react';
import {
    Box, Typography, Container, Card, Stack,
    Divider, Grid, Chip, Stepper, Step, StepLabel, StepConnector,
    stepConnectorClasses, styled, Paper, IconButton, Avatar
} from '@mui/material';
import {
    Check as CheckIcon,
    LocalShipping as ShippingIcon,
    AccessTime as PendingIcon,
    AssignmentTurnedIn as ConfirmedIcon,
    DoneAll as DeliveredIcon,
    ReceiptLong as ReceiptIcon,
    ArrowBack as BackIcon,
    LocationOn as LocationIcon,
    Timer as TimerIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrder } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
        left: 'calc(-50% + 20px)',
        right: 'calc(50% + 20px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#008a45',
            borderWidth: 3,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#008a45',
            borderWidth: 3,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#e2e8f0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: '#e2e8f0',
    display: 'flex',
    height: 40,
    alignItems: 'center',
    zIndex: 1,
    ...(ownerState.active && {
        color: '#008a45',
    }),
    '& .QontoStepIcon-completedIcon': {
        color: 'white',
        backgroundColor: '#008a45',
        borderRadius: '50%',
        padding: '4px',
        fontSize: 24,
    },
    '& .QontoStepIcon-circle': {
        width: 14,
        height: 14,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    '& .QontoStepIcon-activeCircle': {
        width: 24,
        height: 24,
        borderRadius: '50%',
        border: '3px solid #008a45',
        backgroundColor: 'white',
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;
    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <CheckIcon className="QontoStepIcon-completedIcon" />
            ) : active ? (
                <div className="QontoStepIcon-activeCircle" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const steps = [
    { label: 'Confirmed', icon: <ConfirmedIcon /> },
    { label: 'Processing', icon: <PendingIcon /> },
    { label: 'Shipped', icon: <ShippingIcon /> },
    { label: 'Delivered', icon: <DeliveredIcon /> }
];

const Orders = () => {
    const { orders } = useOrder();
    const navigate = useNavigate();

    // Helper to get status index
    const getStatusIndex = (status) => {
        const index = steps.findIndex(s => s.label === status);
        return index === -1 ? 0 : index;
    };

    if (orders.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Box sx={{
                        width: 180, height: 180, bgcolor: '#f8fafc', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 4
                    }}>
                        <ReceiptIcon sx={{ fontSize: 80, color: '#94a3b8' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>No orders yet</Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                        Your medical device tracking will appear here once you've successfully placed an order.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/')}
                        sx={{ bgcolor: '#008a45', borderRadius: '16px', px: 6, py: 1.5, fontWeight: 800 }}
                    >
                        Start Shopping
                    </Button>
                </motion.div>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/')} sx={{ border: '1px solid #e2e8f0' }}>
                    <BackIcon />
                </IconButton>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900 }}>My Orders</Typography>
                    <Typography variant="body2" color="textSecondary">Track and manage your recovery equipment</Typography>
                </Box>
            </Box>

            <Stack spacing={4}>
                <AnimatePresence>
                    {orders.slice().reverse().map((order) => {
                        const activeIndex = getStatusIndex(order.status);

                        return (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <Card sx={{
                                    borderRadius: '32px',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.04)',
                                    border: '1px solid rgba(0,0,0,0.02)',
                                    overflow: 'hidden'
                                }}>
                                    {/* Order Top Bar */}
                                    <Box sx={{ p: 3, bgcolor: '#f8fafc', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                        <Stack direction="row" spacing={3} alignItems="center">
                                            <Box>
                                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Order ID</Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>#{order.id}</Typography>
                                            </Box>
                                            <Divider orientation="vertical" flexItem />
                                            <Box>
                                                <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>Date Placed</Typography>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                                                    {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        <Chip
                                            label={order.status}
                                            sx={{
                                                bgcolor: order.status === 'Delivered' ? '#dcfce7' : '#edf2ff',
                                                color: order.status === 'Delivered' ? '#166534' : '#2e3192',
                                                fontWeight: 900,
                                                borderRadius: '12px',
                                                height: 36,
                                                px: 1
                                            }}
                                        />
                                    </Box>

                                    <Grid container spacing={0}>
                                        {/* Left Side: Items & Summary */}
                                        <Grid item xs={12} md={5} sx={{ p: 4, borderRight: { md: '1px solid #f1f5f9' } }}>
                                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>Order Items</Typography>
                                            <Stack spacing={3}>
                                                {order.items.map(item => (
                                                    <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                        <Box sx={{ width: 60, height: 60, bgcolor: '#f1f5f9', borderRadius: '16px', p: 1 }}>
                                                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                        </Box>
                                                        <Box sx={{ flexGrow: 1 }}>
                                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{item.name}</Typography>
                                                            <Typography variant="caption" color="textSecondary">Qty: {item.quantity}</Typography>
                                                        </Box>
                                                        <Typography sx={{ fontWeight: 800 }}>₹{item.price * item.quantity}</Typography>
                                                    </Box>
                                                ))}
                                            </Stack>

                                            <Box sx={{ mt: 5, p: 3, bgcolor: '#f8fafc', borderRadius: '24px' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                    <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>Total Paid</Typography>
                                                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#008a45' }}>₹{order.total}</Typography>
                                                </Box>
                                                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                    <LocationIcon sx={{ color: '#64748b', fontSize: 18 }} />
                                                    <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                                                        Delivering to: {order.customer?.address || 'Saved Address'}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>

                                        {/* Right Side: Tracking Status */}
                                        <Grid item xs={12} md={7} sx={{ p: 4 }}>
                                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 6, textAlign: 'center' }}>Real-time Delivery Tracking</Typography>

                                            <Box sx={{ width: '100%', px: 2 }}>
                                                <Stepper activeStep={activeIndex} alternativeLabel connector={<QontoConnector />}>
                                                    {steps.map((step, index) => (
                                                        <Step key={step.label}>
                                                            <StepLabel StepIconComponent={QontoStepIcon}>
                                                                <Typography
                                                                    variant="subtitle2"
                                                                    sx={{
                                                                        fontWeight: activeIndex === index ? 900 : 700,
                                                                        color: activeIndex >= index ? '#1e293b' : '#94a3b8',
                                                                        mt: 1
                                                                    }}
                                                                >
                                                                    {step.label}
                                                                </Typography>
                                                            </StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </Box>

                                            <Paper sx={{
                                                mt: 8, p: 3, borderRadius: '24px', bgcolor: '#f0fdf4', border: '1px solid #dcfce7',
                                                display: 'flex', alignItems: 'center', gap: 2, boxShadow: 'none'
                                            }}>
                                                <Avatar sx={{ bgcolor: '#dcfce7', color: '#16a34a' }}>
                                                    <TimerIcon />
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#166534' }}>
                                                        {order.status === 'Delivered' ? 'Delivery Completed' : 'Lightning Fast Delivery'}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: '#15803d', fontWeight: 600 }}>
                                                        {order.status === 'Delivered'
                                                            ? 'Your medical device has been securely delivered.'
                                                            : 'Our professional courier is currently navigating to your location.'}
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </Stack>
        </Container>
    );
};

export default Orders;
