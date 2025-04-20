import React from 'react';
import { AppBar, Toolbar, Typography, styled } from '@mui/material';

const StyledAppBar = styled(AppBar)({
    height: '8vh',
    backgroundColor: '#ffffff',
    color: '#000000',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const Header: React.FC = () => {
    return (
        <StyledAppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Race Nutrition
                </Typography>
            </Toolbar>
        </StyledAppBar>
    );
};

export default Header; 