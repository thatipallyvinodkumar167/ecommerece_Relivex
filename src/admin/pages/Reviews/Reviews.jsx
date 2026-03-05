import React from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Rating,
    Chip,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    CheckCircle as ApproveIcon,
    Delete as DeleteIcon,
    ThumbUp as HelpfulIcon
} from '@mui/icons-material';
import api from '../../api/axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
};

const Reviews = () => {
    const [reviews, setReviews] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        api.get('/reviews')
            .then(res => {
                setReviews(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching reviews:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Typography variant="h5" color="textSecondary">Loading Patient Feedback...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                    Customer Reviews
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Monitor patient satisfaction and feedback on pain treatment products.
                </Typography>
            </Box>

            <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <AnimatePresence>
                    {reviews.map((review) => (
                        <ListItem
                            key={review.id}
                            component={motion.div}
                            variants={itemVariants}
                            layout
                            className="glass-card"
                            sx={{
                                alignItems: 'flex-start',
                                p: 3,
                                transition: 'all 0.3s ease',
                                '&:hover': { transform: 'scale(1.01)', boxShadow: '0 12px 24px rgba(0,0,0,0.05)' }
                            }}
                            secondaryAction={
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    {review.status === 'Pending' && (
                                        <Tooltip title="Approve Review">
                                            <IconButton
                                                component={motion.button}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                color="success"
                                                sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)' }}
                                            >
                                                <ApproveIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    <Tooltip title="Delete Review">
                                        <IconButton
                                            component={motion.button}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            color="error"
                                            sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)' }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            }
                        >
                            <ListItemAvatar sx={{ mr: 2 }}>
                                <Avatar
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        fontSize: '1.2rem',
                                        fontWeight: 800,
                                        background: 'linear-gradient(135deg, #008a45 0%, #064e3b 100%)',
                                        boxShadow: '0 4px 12px rgba(0, 138, 69, 0.3)'
                                    }}
                                >
                                    {review.user ? review.user.charAt(0) : 'U'}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                            {review.user}
                                        </Typography>
                                        <Rating value={review.rating} size="small" readOnly />
                                        <Chip
                                            label={review.status}
                                            size="small"
                                            sx={{
                                                fontWeight: 700,
                                                borderRadius: '6px',
                                                bgcolor: review.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                                color: review.status === 'Approved' ? '#10b981' : '#f59e0b'
                                            }}
                                        />
                                    </Box>
                                }
                                secondary={
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#008a45', mb: 1 }}>
                                            Purchased: {review.product}
                                        </Typography>
                                        <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.6, mb: 2 }}>
                                            "{review.comment}"
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                                            Published on {review.date}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </AnimatePresence>
            </List>
        </Box>
    );
};

export default Reviews;
