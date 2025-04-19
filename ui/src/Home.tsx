import React from 'react';
import { Container, Box } from '@mui/material';
import Header from './components/Header';
import FoodItemContainer from './components/FoodItemContainer';
import RaceContainer from './components/RaceContainer';

const Home: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box sx={{ mt: '10vh' }}> {/* Add margin-top to account for fixed header */}
                <Container maxWidth="lg" sx={{ py: 3 }}>
                    <FoodItemContainer />
                    <RaceContainer />
                </Container>
            </Box>
        </Box>
    );
};

export default Home; 