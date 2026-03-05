import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
            <CssBaseline />
            <Sidebar open={open} toggleDrawer={toggleDrawer} />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden' }}>
                <Navbar open={open} toggleDrawer={toggleDrawer} />
                <Box component="main" sx={{ flexGrow: 1, p: 3, transition: 'margin 0.3s' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
