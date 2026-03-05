import React from 'react';
import {
    Box, Container, Grid, Typography, Button, IconButton,
    Card, CardMedia, CardContent, Divider, Stack, Chip,
    useTheme, useMediaQuery, Paper
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    DeleteOutline as DeleteIcon,
    ArrowBack as BackIcon,
    LocalShipping as ShippingIcon,
    Verified as VerifiedIcon,
    ReceiptLong as ReceiptIcon,
    Bolt as BoltIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    // Mock calculations
    const deliveryFee = cartTotal > 100 ? 0 : 40;
    const taxes = cartTotal * 0.18;
    const finalTotal = cartTotal + deliveryFee + taxes;

    if (cartItems.length === 0) {
        return (
            <Container maxWidth="md" sx={{ py: 15, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Box sx={{
                        width: 200,
                        height: 200,
                        bgcolor: '#f1f5f9',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 4
                    }}>
                        <ReceiptIcon sx={{ fontSize: 80, color: '#94a3b8' }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>Your cart is empty</Typography>
                    <Typography variant="body1" color="textSecondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}>
                        Looks like you haven't added any clinical-grade devices to your cart yet.
                    </Typography>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#008a45',
                            borderRadius: '16px',
                            px: 6,
                            fontWeight: 800,
                            '&:hover': { bgcolor: '#006d36' }
                        }}
                    >
                        Explore Products
                    </Button>
                </motion.div>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/')} sx={{ border: '1px solid #e2e8f0' }}>
                    <BackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>My Shopping Cart ({cartCount})</Typography>
            </Box>

            <Grid container spacing={4}>
                {/* Cart Items List */}
                <Grid item xs={12} md={8}>
                    <Stack spacing={2.5}>
                        <AnimatePresence>
                            {cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <Card sx={{
                                        display: 'flex',
                                        p: 2,
                                        borderRadius: '24px',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                                        border: '1px solid rgba(0,0,0,0.02)',
                                        position: 'relative'
                                    }}>
                                        <Box sx={{
                                            width: { xs: 80, sm: 120 },
                                            height: { xs: 80, sm: 120 },
                                            bgcolor: '#f8fafc',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            flexShrink: 0
                                        }}>
                                            <CardMedia
                                                component="img"
                                                image={item.image}
                                                alt={item.name}
                                                sx={{ width: '100%', height: '100%', objectFit: 'contain', p: 1 }}
                                            />
                                        </Box>

                                        <CardContent sx={{ flexGrow: 1, py: 0, px: { xs: 1.5, sm: 3 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                                    {item.name}
                                                </Typography>
                                                <IconButton
                                                    onClick={() => removeFromCart(item.id)}
                                                    sx={{ color: '#ef4444', p: 0 }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>

                                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
                                                Category: {item.category}
                                            </Typography>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                                                <Typography variant="h6" sx={{ color: '#008a45', fontWeight: 900 }}>
                                                    ₹{item.price * item.quantity}
                                                </Typography>

                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    bgcolor: '#f1f5f9',
                                                    p: 0.5,
                                                    borderRadius: '12px'
                                                }}>
                                                    <IconButton size="small" onClick={() => updateQuantity(item.id, -1)}>
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                    <Typography sx={{ fontWeight: 900 }}>{item.quantity}</Typography>
                                                    <IconButton size="small" onClick={() => updateQuantity(item.id, 1)}>
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Cross Sell Banner */}
                        <Paper sx={{
                            p: 2.5,
                            borderRadius: '24px',
                            bgcolor: '#f0fdf4',
                            border: '1px dashed #22c55e',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}>
                            <Box sx={{ bgcolor: '#dcfce7', p: 1.5, borderRadius: '12px', color: '#16a34a' }}>
                                <BoltIcon />
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Free Express Delivery</Typography>
                                <Typography variant="caption" color="textSecondary">Add ₹{Math.max(0, 500 - cartTotal)} more to get free express shipping!</Typography>
                            </Box>
                        </Paper>
                    </Stack>
                </Grid>

                {/* Bill Summary Section */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ position: 'sticky', top: 100 }}>
                        <Card sx={{
                            p: 4,
                            borderRadius: '32px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(0,0,0,0.04)',
                            background: 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(20px)'
                        }}>
                            <Typography variant="h5" sx={{ fontWeight: 900, mb: 4 }}>Bill Summary</Typography>

                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="textSecondary" sx={{ fontWeight: 600 }}>Item Total</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>₹{cartTotal}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography color="textSecondary" sx={{ fontWeight: 600 }}>Delivery Fee</Typography>
                                        <ShippingIcon sx={{ fontSize: 16, color: '#94a3b8' }} />
                                    </Box>
                                    <Typography sx={{ fontWeight: 700, color: deliveryFee === 0 ? '#22c55e' : 'inherit' }}>
                                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="textSecondary" sx={{ fontWeight: 600 }}>Taxes (GST 18%)</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>₹{taxes.toFixed(2)}</Typography>
                                </Box>

                                <Divider sx={{ my: 1, borderStyle: 'dashed' }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>Total Payable</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#008a45' }}>₹{finalTotal.toFixed(2)}</Typography>
                                </Box>
                            </Stack>

                            <Button
                                component={Link}
                                to="/checkout"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 4,
                                    py: 2,
                                    bgcolor: '#008a45',
                                    borderRadius: '16px',
                                    fontWeight: 900,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    boxShadow: '0 12px 24px rgba(0, 138, 69, 0.3)',
                                    '&:hover': { bgcolor: '#006d36' }
                                }}
                            >
                                Proceed to Checkout
                            </Button>

                            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <VerifiedIcon sx={{ color: '#008a45', fontSize: 18 }} />
                                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600 }}>
                                    100% Medical Grade Guarantee
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Cart;
