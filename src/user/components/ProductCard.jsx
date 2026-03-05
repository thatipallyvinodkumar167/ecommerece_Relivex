import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Button,
    IconButton,
    Chip,
    Rating
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Bolt as BoltIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { cartItems, addToCart, updateQuantity } = useCart();
    const cartItem = cartItems.find(item => item.id === product.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <Card sx={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.03)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}>
                {product.tag && (
                    <Chip
                        label={product.tag}
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 15,
                            left: 15,
                            zIndex: 2,
                            bgcolor: product.tag === 'Bestseller' ? '#064e3b' : '#facc15',
                            color: product.tag === 'Bestseller' ? 'white' : '#064e3b',
                            fontWeight: 800,
                            borderRadius: '8px'
                        }}
                    />
                )}

                <Box sx={{ pt: '85%', position: 'relative', bgcolor: '#f8fafc' }}>
                    <CardMedia
                        component="img"
                        image={product.image}
                        alt={product.name}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            p: 3,
                            transition: 'transform 0.5s',
                            '&:hover': { transform: 'scale(1.1)' }
                        }}
                    />
                </Box>

                <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 1.5 }}>
                        <Typography variant="caption" sx={{ color: '#008a45', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                            {product.category}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 800, mt: 0.5, lineHeight: 1.2, height: '2.4em', overflow: 'hidden' }}>
                            {product.name}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Rating value={product.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>
                            ({product.reviews})
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1e293b' }}>
                                ₹{product.price}
                            </Typography>
                            <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94a3b8' }}>
                                ₹{product.originalPrice}
                            </Typography>
                        </Box>

                        <Box sx={{ height: 45 }}>
                            <AnimatePresence mode="wait">
                                {quantity === 0 ? (
                                    <Button
                                        key="add-btn"
                                        component={motion.button}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => addToCart(product)}
                                        sx={{
                                            borderRadius: '12px',
                                            height: '100%',
                                            border: '2px solid #008a45',
                                            color: '#008a45',
                                            fontWeight: 800,
                                            '&:hover': { bgcolor: '#008a45', color: 'white' }
                                        }}
                                    >
                                        ADD
                                    </Button>
                                ) : (
                                    <Box
                                        key="stepper"
                                        component={motion.div}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            bgcolor: '#008a45',
                                            borderRadius: '12px',
                                            height: '100%',
                                            px: 1,
                                            color: 'white',
                                            boxShadow: '0 8px 20px rgba(0, 138, 69, 0.2)'
                                        }}
                                    >
                                        <IconButton size="small" onClick={() => updateQuantity(product.id, -1)} sx={{ color: 'white' }}>
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ fontWeight: 900 }}>{quantity}</Typography>
                                        <IconButton size="small" onClick={() => updateQuantity(product.id, 1)} sx={{ color: 'white' }}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </Box>
                                )}
                            </AnimatePresence>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ProductCard;
