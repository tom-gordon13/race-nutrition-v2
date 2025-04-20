import React, { useState } from 'react';
import { Container, styled, Box, Grid } from '@mui/material';
import FoodItem from './FoodItem';

const StyledContainer = styled(Container)({
    height: '30vh',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e0e0e0',
    overflowY: 'auto',
});

const FoodItemsWrapper = styled(Box)({
    display: 'flex',
    gap: '16px',
    padding: '16px',
});

interface FoodItemContainerProps {
    setIsItemSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const FoodItemContainer: React.FC<FoodItemContainerProps> = ({ setIsItemSelected }) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#45B7D1', '#45B7D1', '#45B7D1'];
    const [activeDragItem, setActiveDragItem] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, color: string) => {
        e.dataTransfer.setData('color', color);
        // Create a drag image
        const dragImage = document.createElement('div');
        dragImage.style.width = '50px';
        dragImage.style.height = '50px';
        dragImage.style.backgroundColor = color;
        dragImage.style.opacity = '0.8';
        document.body.appendChild(dragImage);
        e.dataTransfer.setDragImage(dragImage, 25, 25);
        setTimeout(() => document.body.removeChild(dragImage), 0);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, color: string, isSelected: boolean) => {
        setActiveDragItem(color);

        // Store the selection state globally
        (window as any).isItemSelected = isSelected;
        (window as any).selectedItemColor = isSelected ? color : null;

        // Create a visual indicator for the dragged item
        const touch = e.touches[0];
        const dragImage = document.createElement('div');
        dragImage.style.width = '50px';
        dragImage.style.height = '50px';
        dragImage.style.backgroundColor = color;
        dragImage.style.opacity = '0.8';
        dragImage.style.position = 'absolute';
        dragImage.style.left = `${touch.clientX - 25}px`;
        dragImage.style.top = `${touch.clientY - 25}px`;
        dragImage.style.zIndex = '1000';
        dragImage.style.pointerEvents = 'none';
        document.body.appendChild(dragImage);

        // Store the drag image element and color for later reference
        (window as any).currentDragImage = dragImage;
        (window as any).currentDragColor = color;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (activeDragItem && (window as any).currentDragImage) {
            const touch = e.touches[0];
            (window as any).currentDragImage.style.left = `${touch.clientX - 25}px`;
            (window as any).currentDragImage.style.top = `${touch.clientY - 25}px`;
        }
    };

    const handleTouchEnd = () => {
        // Use short delay to allow RaceContainer to check position and color
        setTimeout(() => {
            setActiveDragItem(null);
            if ((window as any).currentDragImage) {
                document.body.removeChild((window as any).currentDragImage);
                (window as any).currentDragImage = null;
            }
        }, 50);
    };

    // Handle food item selection change
    const handleSelectionChange = (color: string, isSelected: boolean) => {
        setSelectedColor(isSelected ? color : null);
        // Make selection info available globally
        (window as any).selectedItemColor = isSelected ? color : null;
        (window as any).isItemSelected = isSelected;
    };

    // Add global touch event listeners
    React.useEffect(() => {
        const handleGlobalTouchMove = (e: TouchEvent) => {
            if (activeDragItem && (window as any).currentDragImage) {
                const touch = e.touches[0];
                (window as any).currentDragImage.style.left = `${touch.clientX - 25}px`;
                (window as any).currentDragImage.style.top = `${touch.clientY - 25}px`;
            }
        };

        const handleGlobalTouchEnd = () => {
            // Use short delay to allow RaceContainer to check position and color
            setTimeout(() => {
                setActiveDragItem(null);
                if ((window as any).currentDragImage) {
                    document.body.removeChild((window as any).currentDragImage);
                    (window as any).currentDragImage = null;
                    // Keep currentDragColor for RaceContainer to use
                }
            }, 50);
        };

        document.addEventListener('touchmove', handleGlobalTouchMove);
        document.addEventListener('touchend', handleGlobalTouchEnd);
        document.addEventListener('touchcancel', handleGlobalTouchEnd);

        return () => {
            document.removeEventListener('touchmove', handleGlobalTouchMove);
            document.removeEventListener('touchend', handleGlobalTouchEnd);
            document.removeEventListener('touchcancel', handleGlobalTouchEnd);
        };
    }, [activeDragItem]);

    return (
        <StyledContainer
            maxWidth="lg"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <Grid container spacing={2}>
                {colors.map((color, index) => (
                    <Grid key={index} size={{ xs: 4 }}>
                        <FoodItem
                            color={color}
                            setIsItemSelected={setIsItemSelected}
                            onDragStart={(e) => handleDragStart(e, color)}
                            onTouchStart={(e, itemColor, isSelected) => handleTouchStart(e, itemColor, isSelected)}
                            onSelectionChange={handleSelectionChange}
                        />
                    </Grid>
                ))}
            </Grid>
        </StyledContainer>
    );
};

export default FoodItemContainer; 