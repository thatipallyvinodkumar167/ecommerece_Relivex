import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    TextField,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    FormControlLabel,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Chip
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Category as CategoryIcon
} from '@mui/icons-material';
import api from '../../api/axiosConfig';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    React.useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await api.get('/categories');
                setCategories(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleOpen = (cat = null) => {
        setSelectedCategory(cat);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedCategory(null);
    };

    if (loading) return (
        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Typography variant="h5" color="textSecondary">Organizing Medical Classifications...</Typography>
        </Box>
    );

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
                <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                        Medical Categories
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Structure your inventory by treatment area and pain management type.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    className="gradient-button"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{ height: 48, px: 3 }}
                >
                    Add Category
                </Button>
            </Box>

            <Grid container spacing={4}>
                {categories.map((category) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
                        <motion.div variants={cardVariants} whileHover={{ y: -8 }}>
                            <Card className="glass-card" sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: 'none' }}>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={category.image || `https://source.unsplash.com/featured/?medical,${category.name.replace(' ', ',')}`}
                                    alt={category.name}
                                    sx={{ filter: 'brightness(0.9)' }}
                                />
                                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1e293b' }}>
                                            {category.name}
                                        </Typography>
                                        <Chip
                                            label={category.status}
                                            size="small"
                                            sx={{
                                                fontWeight: 700,
                                                borderRadius: '6px',
                                                bgcolor: category.status === 'Active' ? 'rgba(0, 138, 69, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                                                color: category.status === 'Active' ? '#008a45' : '#64748b'
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="body2" sx={{ color: '#64748b', mb: 2, lineHeight: 1.6 }}>
                                        {category.description || 'Medical-grade treatments focused on specialized pain relief and patient recovery.'}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
                                    <Typography variant="caption" sx={{ fontWeight: 700, color: '#94a3b8' }}>
                                        ID: {category.id}
                                    </Typography>
                                    <Box>
                                        <IconButton
                                            component={motion.button}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleOpen(category)}
                                            color="primary"
                                            size="small"
                                            sx={{ bgcolor: 'rgba(0, 138, 69, 0.05)', mr: 1 }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            component={motion.button}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            color="error"
                                            size="small"
                                            sx={{ bgcolor: 'rgba(239, 68, 68, 0.05)' }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardActions>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {open && (
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        maxWidth="sm"
                        fullWidth
                        PaperComponent={motion.div}
                        PaperProps={{
                            initial: { opacity: 0, scale: 0.9, y: 20 },
                            animate: { opacity: 1, scale: 1, y: 0 },
                            exit: { opacity: 0, scale: 0.9, y: 20 },
                            className: "glass-card",
                            sx: { m: 2, p: 1 }
                        }}
                    >
                        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.5rem' }}>
                            {selectedCategory ? 'Modify Category' : 'Create New Category'}
                        </DialogTitle>
                        <DialogContent dividers>
                            <Grid container spacing={3} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Classification Name"
                                        defaultValue={selectedCategory?.name || ''}
                                        placeholder="e.g. Chronic Nerve Pain Treatments"
                                        required
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Scope / Description"
                                        defaultValue={selectedCategory?.description || ''}
                                        placeholder="Describe the clinical application and product types..."
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Button variant="outlined" component="label" fullWidth sx={{ height: 56, borderStyle: 'dashed', borderWidth: 2, color: '#008a45', borderColor: '#008a45' }}>
                                        Upload Representative Image
                                        <input type="file" hidden />
                                    </Button>
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <FormControlLabel
                                        control={<Switch sx={{ color: '#008a45' }} defaultChecked={selectedCategory ? selectedCategory.status === 'Active' : true} />}
                                        label={<Typography sx={{ fontWeight: 600 }}>Mark as Active Classification</Typography>}
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 3, gap: 2 }}>
                            <Button onClick={handleClose} sx={{ fontWeight: 700, px: 3 }}>Discard</Button>
                            <Button variant="contained" className="gradient-button" onClick={handleClose} sx={{ px: 4 }}>
                                Save Changes
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default Categories;
