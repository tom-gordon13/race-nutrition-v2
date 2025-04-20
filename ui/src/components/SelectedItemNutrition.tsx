import React, { useState, useEffect } from 'react';
import { Container, styled, Box, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
const StyledContainer = styled(Container)(({ theme }) => ({
    height: '10vh',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    position: 'relative',
    overflow: 'hidden',
}));

const DroppedItemBox = styled(Box)(({ color }: { color: string }) => ({
    width: '50px',
    height: '50px',
    backgroundColor: color,
    position: 'absolute',
    cursor: 'default',
}));

interface SelectedItemNutritionProps {
    expanded: boolean
    onChange: () => void
}

const SelectedItemNutrition: React.FC<SelectedItemNutritionProps> = ({ expanded, onChange }) => {


    return (
        <Accordion expanded={expanded} onChange={onChange}>
            <AccordionSummary
            // expandIcon={<ExpandMoreIcon />}
            >
                <Typography>Test</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <StyledContainer>blah blah blah</StyledContainer>
            </AccordionDetails>
        </Accordion>
    );
};

export default SelectedItemNutrition; 