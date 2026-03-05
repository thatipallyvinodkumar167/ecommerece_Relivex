import React, { useState } from 'react';
import {
    Container, Grid, Box, Typography, TextField, Button,
    Card, Divider, Stack, InputAdornment, IconButton,
    CircularProgress, Paper, Avatar, Badge, useTheme
} from '@mui/material';
import {
    ChevronLeft as BackIcon,
    PersonOutline as UserIcon,
    PhoneIphone as PhoneIcon,
    HomeOutlined as AddressIcon,
    CreditCard as CardIcon,
    CheckCircle as SuccessIcon,
    LocalShipping as ShippingIcon,
    Security as SecurityIcon,
    ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const navigate = useNavigate();
    const theme = useTheme();

    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        zip: ''
    });

    const [loading, setLoading] = useState(false);
    const [orderDone, setOrderDone] = useState(false);

    // Calculations
    const deliveryFee = cartTotal > 1000 ? 0 : 40;
    const taxes = cartTotal * 0.18;
    const finalTotal = cartTotal + deliveryFee + taxes;

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate processing
        setTimeout(() => {
            const orderData = {
                items: cartItems,
                total: finalTotal,
                customer: form,
                date: new Date().toISOString(),
                status: 'Confirmed'
            };
            placeOrder(orderData);
            setLoading(false);
            setOrderDone(true);
            setTimeout(() => {
                clearCart();
                navigate('/orders');
            }, 3000);
        }, 2000);
    };

    if (orderDone) {
        return (
            <Container maxWidth="sm" sx={{ py: 15, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Box sx={{
                        width: 120,
                        height: 120,
                        bgcolor: '#f0fdf4',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 4,
                        border: '4px solid #dcfce7'
                    }}>
                        <SuccessIcon sx={{ fontSize: 60, color: '#22c55e' }} />
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>Order Confirmed!</Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
                        Your medical recovery journey starts now. We'll notify you when it's out for delivery.
                    </Typography>
                    <CircularProgress size={24} sx={{ color: '#008a45', mb: 2 }} />
                    <Typography variant="body2" color="textSecondary">Redirecting to tracking page...</Typography>
                </motion.div>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => navigate('/cart')} sx={{ border: '1px solid #e2e8f0' }}>
                    <BackIcon />
                </IconButton>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900 }}>Secure Checkout</Typography>
                    <Typography variant="body2" color="textSecondary">Complete your details to finish ordering</Typography>
                </Box>
            </Box>

            <Grid container spacing={6}>
                {/* Checkout Form */}
                <Grid item xs={12} md={7}>
                    <form onSubmit={handlePlaceOrder}>
                        <Stack spacing={4}>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#008a45', fontSize: '0.9rem', fontWeight: 700 }}>1</Avatar>
                                    Delivery Information
                                </Typography>
                                <Grid container spacing={2.5}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Full Name"
                                            required
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <UserIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            required
                                            value={form.phone}
                                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PhoneIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Detailed Address"
                                            required
                                            multiline
                                            rows={3}
                                            value={form.address}
                                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start" sx={{ mt: 1, alignSelf: 'flex-start' }}>
                                                        <AddressIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            required
                                            value={form.city}
                                            onChange={(e) => setForm({ ...form, city: e.target.value })}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            label="ZIP Code"
                                            required
                                            value={form.zip}
                                            onChange={(e) => setForm({ ...form, zip: e.target.value })}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px' } }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider />

                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#008a45', fontSize: '0.9rem', fontWeight: 700 }}>2</Avatar>
                                    Payment Method
                                </Typography>
                                <Paper sx={{
                                    p: 3,
                                    borderRadius: '24px',
                                    border: '2px solid #008a45',
                                    bgcolor: '#f0fdf4',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    boxShadow: '0 8px 20px rgba(0, 138, 69, 0.05)'
                                }}>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: '12px', display: 'flex', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                                            <CardIcon sx={{ color: '#008a45' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Cash on Delivery</Typography>
                                            <Typography variant="caption" color="textSecondary">Pay securely when items arrive</Typography>
                                        </Box>
                                    </Box>
                                    <SuccessIcon sx={{ color: '#008a45' }} />
                                </Paper>
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                                endIcon={!loading && <ArrowIcon />}
                                sx={{
                                    py: 2.5,
                                    borderRadius: '20px',
                                    bgcolor: '#008a45',
                                    fontWeight: 900,
                                    fontSize: '1.2rem',
                                    textTransform: 'none',
                                    boxShadow: '0 12px 24px rgba(0, 138, 69, 0.3)',
                                    '&:hover': { bgcolor: '#006d36' },
                                    mt: 2
                                }}
                            >
                                {loading ? <CircularProgress size={28} sx={{ color: 'white' }} /> : 'Place Order Now'}
                            </Button>
                        </Stack>
                    </form>
                </Grid>

                {/* Order Summary Side */}
                <Grid item xs={12} md={5}>
                    <Box sx={{ position: 'sticky', top: 100 }}>
                        <Card sx={{
                            p: 4,
                            borderRadius: '32px',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(0,0,0,0.04)',
                            bgcolor: '#f8fafc'
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>Order Summary</Typography>

                            <Stack spacing={3} sx={{ mb: 4 }}>
                                {cartItems.map((item) => (
                                    <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Badge
                                            badgeContent={item.quantity}
                                            color="primary"
                                            sx={{ '& .MuiBadge-badge': { bgcolor: '#008a45', fontWeight: 800 } }}
                                        >
                                            <Box sx={{ width: 64, height: 64, bgcolor: 'white', borderRadius: '16px', p: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            </Box>
                                        </Badge>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>{item.name}</Typography>
                                            <Typography variant="caption" color="textSecondary">{item.category}</Typography>
                                        </Box>
                                        <Typography sx={{ fontWeight: 900 }}>₹{item.price * item.quantity}</Typography>
                                    </Box>
                                ))}
                            </Stack>

                            <Divider sx={{ mb: 3, borderStyle: 'dashed' }} />

                            <Stack spacing={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="textSecondary" sx={{ fontWeight: 600 }}>Items Total</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>₹{cartTotal}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="textSecondary" sx={{ fontWeight: 600 }}>Delivery Fee</Typography>
                                    <Typography sx={{ fontWeight: 700, color: deliveryFee === 0 ? '#22c55e' : 'inherit' }}>
                                        {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography color="textSecondary" sx={{ fontWeight: 600 }}>Govt. Taxes (GST 18%)</Typography>
                                    <Typography sx={{ fontWeight: 700 }}>₹{taxes.toFixed(2)}</Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 900 }}>Grand Total</Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 900, color: '#008a45' }}>₹{finalTotal.toFixed(2)}</Typography>
                                </Box>
                            </Stack>

                            <Box sx={{ mt: 5, p: 2, borderRadius: '20px', bgcolor: 'white', border: '1px solid #e2e8f0' }}>
                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <SecurityIcon sx={{ color: '#008a45', fontSize: 20 }} />
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>100% Secure Checkout</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <ShippingIcon sx={{ color: '#008a45', fontSize: 20 }} />
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>Express Medical Delivery</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Checkout;
