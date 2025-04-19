import React from 'react';
import { Box, styled } from '@mui/material';

interface FoodItemProps {
    color: string;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
}

const StyledBox = styled(Box)(({ color }: { color: string }) => ({
    width: '55px',
    height: '55px',
    backgroundColor: color,
    cursor: 'grab',
    touchAction: 'none',
    '&:active': {
        cursor: 'grabbing',
    },
}));

const FoodItem: React.FC<FoodItemProps> = ({ color, onDragStart, onTouchStart }) => {
    return (
        <StyledBox
            color={color}
            draggable
            onDragStart={onDragStart}
            onTouchStart={onTouchStart}
        />
    );
};

export default FoodItem; 