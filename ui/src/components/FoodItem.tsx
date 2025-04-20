import React, { useState } from 'react';
import { Box, styled, keyframes } from '@mui/material';

interface FoodItemProps {
    color: string;
    setIsItemSelected: React.Dispatch<React.SetStateAction<boolean>>;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
}


const wiggle = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`;

const StyledBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'color',
})<{
    isSelected: boolean;
    color: string;
}>(({ theme, isSelected, color }) => ({
    width: 'auto',
    height: '60px',
    backgroundColor: color,
    cursor: 'grab',
    touchAction: 'none',
    transition: 'transform 0.2s',
    '&:active': {
        cursor: 'grabbing',
    },
    animation: isSelected
        ? `${wiggle} 0.5s ease-in-out infinite`
        : 'none',
}));


const FoodItem: React.FC<FoodItemProps> = ({ color, onDragStart, onTouchStart, setIsItemSelected }) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsSelected(!isSelected);
        setIsItemSelected((prev) => !prev)
        onTouchStart(e);
    }


    return (
        <StyledBox
            color={color}
            isSelected={isSelected}
            draggable
            onDragStart={onDragStart}
            onTouchStart={handleTouchStart}
        />
    );
};

export default FoodItem; 