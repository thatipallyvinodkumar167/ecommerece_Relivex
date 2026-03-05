import React, { useState } from 'react';
import {
    Box, Typography, Button, Container, Grid, Card,
    CardMedia, CardContent, Chip, Rating, Stack, IconButton, Divider,
    Skeleton, useTheme, useMediaQuery
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Timer as TimerIcon,
    LocalShipping as ShippingIcon,
    ShieldOutlined as ShieldIcon,
    SupportAgent as SupportIcon,
    Bolt as BoltIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../services/apiService';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { data: products, isLoading } = useProducts();
    const { cartItems, addToCart, updateQuantity } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Backbone Pain', 'Neck Pain', 'Joint Pain', 'Leg Pain'];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products?.filter(p => p.category === selectedCategory);

    const features = [
        { icon: <BoltIcon />, title: "Express Delivery", desc: "15-20 mins delivery to your doorstep" },
        { icon: <ShieldIcon />, title: "Medical Grade", desc: "Certified & clinical-grade products" },
        { icon: <SupportIcon />, title: "Expert Support", desc: "24/7 dedicated medical assistance" }
    ];

    return (
        <Box sx={{ pb: 8 }}>
            {/* Premium Hero Section */}
            <Box sx={{
                position: 'relative',
                background: 'linear-gradient(135deg, #064e3b 0%, #008a45 100%)',
                pt: { xs: 8, md: 12 },
                pb: { xs: 12, md: 16 },
                overflow: 'hidden',
                color: 'white'
            }}>
                {/* Decorative Elements */}
                <Box sx={{
                    position: 'absolute',
                    top: -100,
                    right: -100,
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    background: 'rgba(250, 204, 21, 0.1)',
                    filter: 'blur(80px)'
                }} />

                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Chip
                                    label="50% OFF ON ALL MEDICAL DEVICES"
                                    sx={{
                                        bgcolor: 'rgba(250, 204, 21, 0.2)',
                                        color: '#facc15',
                                        fontWeight: 800,
                                        mb: 3,
                                        border: '1px solid rgba(250, 204, 21, 0.3)'
                                    }}
                                />
                                <Typography variant="h1" sx={{
                                    fontSize: { xs: '2.5rem', md: '4rem' },
                                    fontWeight: 900,
                                    lineHeight: 1.1,
                                    mb: 2
                                }}>
                                    Relive Pain <br />
                                    <span style={{ color: '#facc15' }}>Instantly & Safe</span>
                                </Typography>
                                <Typography variant="h6" sx={{ opacity: 0.8, mb: 5, fontWeight: 400, maxWidth: 500 }}>
                                    Experience clinical-grade recovery at home with our world-class medical therapy devices. Used by 10,000+ athletes.
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            bgcolor: '#facc15',
                                            color: '#064e3b',
                                            px: 4,
                                            py: 2,
                                            borderRadius: '16px',
                                            fontWeight: 800,
                                            '&:hover': { bgcolor: '#eab308' }
                                        }}
                                    >
                                        Shop Now
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            borderColor: 'white',
                                            color: 'white',
                                            px: 4,
                                            borderRadius: '16px',
                                            '&:hover': { borderColor: '#facc15', color: '#facc15' }
                                        }}
                                    >
                                        View Demo
                                    </Button>
                                </Stack>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ position: 'relative' }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                            >
                                <Box sx={{
                                    position: 'relative',
                                    zIndex: 2,
                                    display: 'flex',
                                    justifyContent: 'center'
                                }}>
                                    <img
                                        src="https://img.freepik.com/free-photo/medical-gadget-pain-relief_181624-44552.jpg"
                                        alt="Main Product"
                                        style={{
                                            width: '80%',
                                            borderRadius: '40px',
                                            boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
                                            border: '8px solid rgba(255,255,255,0.1)'
                                        }}
                                    />
                                </Box>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Why Choose Us */}
            <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 10 }}>
                <Grid container spacing={3}>
                    {features.map((f, i) => (
                        <Grid item xs={12} md={4} key={i}>
                            <Card sx={{
                                p: 3,
                                borderRadius: '24px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                                background: 'rgba(255,255,255,0.95)',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <Box sx={{
                                    bgcolor: 'rgba(0, 138, 69, 0.1)',
                                    p: 1.5,
                                    borderRadius: '16px',
                                    color: '#008a45'
                                }}>
                                    {f.icon}
                                </Box>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{f.title}</Typography>
                                    <Typography variant="caption" color="textSecondary">{f.desc}</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Product Grid */}
            <Container maxWidth="lg" sx={{ mt: 10 }}>
                <Box sx={{ mb: 6 }}>
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
                        <Box>
                            <Typography variant="h3" sx={{ fontWeight: 900, mb: 1 }}>Premium Devices</Typography>
                            <Typography variant="body1" color="textSecondary">Top-rated medical solutions for your recovery</Typography>
                        </Box>
                        <Button sx={{ fontWeight: 700, color: '#008a45' }}>View All Brands</Button>
                    </Box>

                    {/* Category Filter Pills */}
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            overflowX: 'auto',
                            pb: 2,
                            '&::-webkit-scrollbar': { display: 'none' },
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none',
                        }}
                    >
                        {categories.map((cat) => (
                            <Chip
                                key={cat}
                                label={cat}
                                onClick={() => setSelectedCategory(cat)}
                                sx={{
                                    px: 2,
                                    py: 2.5,
                                    borderRadius: '16px',
                                    fontWeight: 800,
                                    fontSize: '0.95rem',
                                    bgcolor: selectedCategory === cat ? '#008a45' : 'white',
                                    color: selectedCategory === cat ? 'white' : '#64748b',
                                    border: '1px solid',
                                    borderColor: selectedCategory === cat ? '#008a45' : '#e2e8f0',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: selectedCategory === cat ? '#006d36' : '#f1f5f9',
                                        borderColor: selectedCategory === cat ? '#006d36' : '#cbd5e1'
                                    }
                                }}
                            />
                        ))}
                    </Stack>
                </Box>

                <Grid container spacing={4}>
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <Grid item xs={12} sm={6} lg={3} key={i}>
                                <Box sx={{ p: 2, borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                                    <Skeleton variant="rectangular" height={220} sx={{ borderRadius: '16px', mb: 2 }} />
                                    <Skeleton width="80%" height={32} />
                                    <Skeleton width="40%" height={24} sx={{ mb: 2 }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Skeleton width={80} height={40} />
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </Box>
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        filteredProducts?.map((product) => (
                            <Grid item xs={12} sm={6} lg={3} key={product.id}>
                                <ProductCard product={product} />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>

            {/* Testimonials / Reviews Section */}
            <Box sx={{ bgcolor: '#f1f5f9', py: 10, mt: 10 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" sx={{ fontWeight: 900, mb: 6 }}>What Patients Say</Typography>
                    <Grid container spacing={4}>
                        {[1, 2, 3].map((r) => (
                            <Grid item xs={12} md={4} key={r}>
                                <Card sx={{ p: 4, borderRadius: '24px' }}>
                                    <Rating value={5} readOnly size="small" sx={{ mb: 2 }} />
                                    <Typography variant="body1" sx={{ color: '#475569', mb: 3, fontStyle: 'italic' }}>
                                        "The Relivex belt changed my life. I can finally play with my grandkids without back pain. Highly recommended!"
                                    </Typography>
                                    <Divider sx={{ mb: 2 }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>M. Johnson</Typography>
                                    <Typography variant="caption" color="textSecondary">Verified Patient</Typography>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;
