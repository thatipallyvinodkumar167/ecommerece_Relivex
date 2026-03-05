import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Grid,
    TextField,
    Button,
    Divider,
    IconButton,
    Snackbar,
    Alert,
    Chip
} from '@mui/material';
import {
    Edit as EditIcon,
    CameraAlt as CameraIcon,
    Lock as LockIcon,
    Business as BusinessIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const VendorProfile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [snackbar, setSnackbar] = useState(false);

    return (
        <Box>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                    Vendor Profile
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Manage your business information and security settings.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} lg={4}>
                    <Paper sx={{ p: 4, borderRadius: '32px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
                        <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                            <Avatar
                                sx={{ width: 120, height: 120, bgcolor: '#008a45', fontSize: '3rem', fontWeight: 800 }}
                            >
                                {user?.name?.[0] || 'V'}
                            </Avatar>
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    bgcolor: '#fff',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    '&:hover': { bgcolor: '#f8fafc' }
                                }}
                            >
                                <CameraIcon fontSize="small" />
                            </IconButton>
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: 800 }}>{user?.name || 'Medical Vendor'}</Typography>
                        <Typography color="textSecondary" sx={{ mb: 3 }}>{user?.email || 'vendor@example.com'}</Typography>
                        <Chip
                            label="Certified Vendor"
                            color="success"
                            sx={{ fontWeight: 700, borderRadius: '8px' }}
                        />
                    </Paper>
                </Grid>

                <Grid item xs={12} lg={8}>
                    <Paper sx={{ p: 4, borderRadius: '32px', border: '1px solid #f1f5f9' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>Business Information</Typography>
                            <Button
                                startIcon={<EditIcon />}
                                onClick={() => setIsEditing(!isEditing)}
                                sx={{ fontWeight: 700, color: '#008a45' }}
                            >
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </Button>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Business Name"
                                    defaultValue="MedLife Supplies Ltd."
                                    disabled={!isEditing}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Registration Number"
                                    defaultValue="GST-123456789"
                                    disabled={!isEditing}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Contact Email"
                                    defaultValue={user?.email || 'vendor@medlife.com'}
                                    disabled={!isEditing}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    defaultValue="+91 98765 43210"
                                    disabled={!isEditing}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                                />
                            </Grid>
                        </Grid>

                        {isEditing && (
                            <Button
                                variant="contained"
                                onClick={() => { setIsEditing(false); setSnackbar(true); }}
                                sx={{ mt: 4, bgcolor: '#008a45', fontWeight: 700, borderRadius: '12px', px: 4 }}
                            >
                                Save Changes
                            </Button>
                        )}

                        <Divider sx={{ my: 4 }} />

                        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Security</Typography>
                        <Button
                            variant="outlined"
                            startIcon={<LockIcon />}
                            sx={{ borderRadius: '12px', fontWeight: 700, borderColor: '#e2e8f0', color: '#1e293b' }}
                        >
                            Change Password
                        </Button>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar open={snackbar} autoHideDuration={3000} onClose={() => setSnackbar(false)}>
                <Alert severity="success" sx={{ borderRadius: '12px' }}>Profile updated successfully!</Alert>
            </Snackbar>
        </Box>
    );
};

export default VendorProfile;
