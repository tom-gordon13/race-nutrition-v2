import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
import Header from './components/Header';
import FoodItemContainer from './components/FoodItemContainer';
import RaceContainer from './components/RaceContainer';
import SelectedItemNutrition from './components/SelectedItemNutrition';

const Home: React.FC = () => {
    const [isItemSelected, setIsItemSelected] = useState(false)
    const [selectedItemNutritionExpanded, setSelectedItemNutritionExpanded] = useState(false)

    const handleAccordionChange = () => {
        setSelectedItemNutritionExpanded((prev) => isItemSelected ? !prev : false);

    };

    useEffect(() => {
        setSelectedItemNutritionExpanded((prev) => isItemSelected ? !prev : false);
    }, [isItemSelected])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box sx={{ mt: '10vh' }}>
                <Container maxWidth="lg" sx={{ py: 3 }}>
                    <FoodItemContainer setIsItemSelected={setIsItemSelected} />
                    <SelectedItemNutrition
                        expanded={selectedItemNutritionExpanded}
                        isItemSelected={isItemSelected}
                        onChange={handleAccordionChange}
                    />
                    <RaceContainer />
                </Container>
            </Box>
        </Box>
    );
};

export default Home; 