import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    Divider,
    Avatar,
    Tab,
    Tabs,
    Card,
    CardContent,
    InputAdornment,
    IconButton,
    Tooltip
} from '@mui/material';
import {
    Person as ProfileIcon,
    Storefront as StoreIcon,
    NotificationsActive as NotifyIcon,
    Security as SecurityIcon,
    PhotoCamera as CameraIcon,
    Save as SaveIcon,
    Lock as LockIcon,
    Language as LanguageIcon,
    CurrencyExchange as CurrencyIcon,
    Percent as CommissionIcon,
    Receipt as TaxIcon,
    LocalShipping as ShippingIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

const Settings = () => {
    const [tab, setTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box component={motion.div} variants={containerVariants} initial="hidden" animate="visible" sx={{ p: { xs: 2, md: 4 } }}>
            <Box sx={{ mb: 5 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, color: '#1e293b' }}>
                    Control Center
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Configure your administrative profile, store logic, and security protocols.
                </Typography>
            </Box>

            <Box className="glass-card" sx={{ overflow: 'hidden', minHeight: 600 }}>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        px: 3,
                        pt: 2,
                        borderBottom: '1px solid #f1f5f9',
                        '& .MuiTabs-indicator': { height: 3, borderRadius: '3px 3px 0 0' },
                        '& .MuiTab-root': {
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            minHeight: 64,
                            gap: 1.5
                        }
                    }}
                >
                    <Tab icon={<ProfileIcon />} iconPosition="start" label="Administrative Profile" />
                    <Tab icon={<StoreIcon />} iconPosition="start" label="Store Logistics" />
                    <Tab icon={<NotifyIcon />} iconPosition="start" label="Alert Protocols" />
                    <Tab icon={<SecurityIcon />} iconPosition="start" label="Access & Security" />
                </Tabs>

                <Box sx={{ p: { xs: 3, md: 5 } }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {tab === 0 && (
                                <Grid container spacing={4}>
                                    <Grid size={{ xs: 12 }} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 3 }}>
                                        <Box sx={{ position: 'relative' }}>
                                            <Avatar
                                                sx={{
                                                    width: 38,
                                                    height: 38,
                                                    bgcolor: '#008a45',
                                                    fontWeight: 700,
                                                    fontSize: '0.9rem',
                                                    boxShadow: '0 4px 12px rgba(0, 138, 69, 0.2)'
                                                }}
                                            >
                                                AD
                                            </Avatar>
                                            <IconButton
                                                size="small"
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
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>Admin User</Typography>
                                            <Typography variant="body2" color="textSecondary">Super Administrator</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField fullWidth label="Full Legal Name" defaultValue="Admin User" variant="outlined" />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField fullWidth label="Corporate Email" defaultValue="admin@hospecom.com" disabled />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField fullWidth label="System Role" defaultValue="Super Administrator" disabled />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField fullWidth label="Direct Phone" defaultValue="+91 98765 43210" />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <Button
                                            variant="contained"
                                            className="gradient-button"
                                            startIcon={<SaveIcon />}
                                            sx={{ px: 4, height: 48 }}
                                        >
                                            Synchronize Profile
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}

                            {tab === 1 && (
                                <Grid container spacing={4}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Default Commission"
                                            defaultValue="10"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><CommissionIcon sx={{ color: '#64748b' }} /></InputAdornment>,
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Value Added Tax (GST)"
                                            defaultValue="18"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><TaxIcon sx={{ color: '#64748b' }} /></InputAdornment>,
                                                endAdornment: <InputAdornment position="end">%</InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Standard Dispensing Fee"
                                            defaultValue="50"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><ShippingIcon sx={{ color: '#64748b' }} /></InputAdornment>,
                                                endAdornment: <InputAdornment position="end">₹</InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField
                                            fullWidth
                                            label="Trading Currency"
                                            defaultValue="Indian Rupee (₹)"
                                            disabled
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start"><CurrencyIcon sx={{ color: '#64748b' }} /></InputAdornment>
                                            }}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <FormControlLabel
                                            control={<Switch defaultChecked sx={{ color: '#008a45' }} />}
                                            label={<Typography sx={{ fontWeight: 700 }}>Enable Automated Vendor Onboarding</Typography>}
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <Button
                                            variant="contained"
                                            className="gradient-button"
                                            sx={{ px: 4, height: 48 }}
                                        >
                                            Save Logic Changes
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}

                            {tab === 2 && (
                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12 }}>
                                        <Box sx={{ p: 2, bgcolor: 'rgba(0, 138, 69, 0.05)', borderRadius: '12px', mb: 2 }}>
                                            <FormControlLabel control={<Switch defaultChecked />} label={<Typography sx={{ fontWeight: 700 }}>Order Confirmation Emails</Typography>} />
                                            <Typography variant="caption" display="block" color="textSecondary" sx={{ ml: 6 }}>Notify administrators via email upon successful order placement.</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <Box sx={{ p: 2, bgcolor: 'rgba(0, 138, 69, 0.05)', borderRadius: '12px', mb: 2 }}>
                                            <FormControlLabel control={<Switch defaultChecked />} label={<Typography sx={{ fontWeight: 700 }}>Low Inventory Push Notifications</Typography>} />
                                            <Typography variant="caption" display="block" color="textSecondary" sx={{ ml: 6 }}>Real-time browser notifications for stock falling below safety thresholds.</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <Box sx={{ p: 2, bgcolor: 'rgba(250, 204, 21, 0.05)', borderRadius: '12px' }}>
                                            <FormControlLabel control={<Switch defaultChecked />} label={<Typography sx={{ fontWeight: 700 }}>High-Value Order SMS Alerts</Typography>} />
                                            <Typography variant="caption" display="block" color="textSecondary" sx={{ ml: 6 }}>Direct alerts for orders exceeding ₹50,000.</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
                                        <Button variant="contained" className="gradient-button" sx={{ px: 4, height: 48 }}>Apply Protocols</Button>
                                    </Grid>
                                </Grid>
                            )}

                            {tab === 3 && (
                                <Grid container spacing={4}>
                                    <Grid size={{ xs: 12 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                            <LockIcon color="error" />
                                            <Typography variant="h6" sx={{ fontWeight: 800 }}>Mandatory Credential Reset</Typography>
                                        </Box>
                                        <Typography variant="body2" color="textSecondary">Passwords must be at least 12 characters and include special symbols.</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField fullWidth type="password" label="Existing Access Key" variant="outlined" />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}></Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField fullWidth type="password" label="New Secure Key" variant="outlined" />
                                    </Grid>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <TextField fullWidth type="password" label="Confirm Secure Key" variant="outlined" />
                                    </Grid>
                                    <Grid size={{ xs: 12 }}>
                                        <Button variant="contained" color="error" sx={{ fontWeight: 800, height: 48, px: 4, borderRadius: '12px' }}>
                                            Update Security Keys
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </Box>
        </Box>
    );
};

export default Settings;

