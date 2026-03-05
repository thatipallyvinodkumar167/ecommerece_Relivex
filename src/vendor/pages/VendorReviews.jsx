import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Rating,
    Grid,
    Avatar,
    Card,
    CardContent,
    Stack,
    Divider
} from '@mui/material';
import { motion } from 'framer-motion';

const reviewsData = [
    { id: 1, customer: 'Amit Sharma', rating: 5, comment: 'Excellent quality medicines. Fast delivery.', date: '2024-03-01' },
    { id: 2, customer: 'Sneha Reddy', rating: 4, comment: 'Product is good, but packaging could be better.', date: '2024-02-28' },
    { id: 3, customer: 'Rajesh Kumar', rating: 5, comment: 'Very reliable vendor for medical supplies.', date: '2024-02-25' },
    { id: 4, customer: 'Priya Patel', rating: 3, comment: 'Shipping was a bit slow this time.', date: '2024-02-20' },
];

const VendorReviews = () => {
    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                    Customer Feedback
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Understand your customers through their ratings and reviews.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} lg={4}>
                    <Card sx={{ borderRadius: '32px', p: 4, textAlign: 'center', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <Typography variant="h2" sx={{ fontWeight: 900, color: '#1e293b' }}>4.2</Typography>
                        <Rating value={4.2} precision={0.1} readOnly size="large" sx={{ my: 1, color: '#facc15' }} />
                        <Typography color="textSecondary" sx={{ fontWeight: 600 }}>Average Vendor Rating</Typography>
                        <Typography variant="body2" sx={{ mt: 2, fontWeight: 800, color: '#008a45' }}>Based on 48 reviews</Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={8}>
                    <Stack spacing={3}>
                        {reviewsData.map((review, index) => (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Paper sx={{ p: 3, borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar sx={{ bgcolor: '#008a45' }}>{review.customer[0]}</Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{review.customer}</Typography>
                                                <Typography variant="caption" color="textSecondary">{review.date}</Typography>
                                            </Box>
                                        </Box>
                                        <Rating value={review.rating} readOnly size="small" />
                                    </Box>
                                    <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.6 }}>
                                        "{review.comment}"
                                    </Typography>
                                </Paper>
                            </motion.div>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default VendorReviews;
