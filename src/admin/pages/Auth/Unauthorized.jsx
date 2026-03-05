import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { LockOutlined as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                height: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 3
            }}
        >
            <Paper elevation={3} sx={{ p: 5, borderRadius: 4, maxWidth: 500 }}>
                <LockIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Access Denied
                </Typography>
                <Typography variant="h6" color="textSecondary" sx={{ mb: 4 }}>
                    You do not have the necessary permissions to view this page.
                    Please contact a Super Admin if you believe this is an error.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/')}
                    sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                >
                    Back to Dashboard
                </Button>
            </Paper>
        </Box>
    );
};

export default Unauthorized;
