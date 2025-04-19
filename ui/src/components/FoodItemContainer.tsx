import React, { useState } from 'react';
import { Container, styled, Box } from '@mui/material';
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

const FoodItemContainer: React.FC = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];
    const [activeDragItem, setActiveDragItem] = useState<string | null>(null);

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

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, color: string) => {
        setActiveDragItem(color);

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

        // Store the drag image element for later removal
        (window as any).currentDragImage = dragImage;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (activeDragItem && (window as any).currentDragImage) {
            const touch = e.touches[0];
            (window as any).currentDragImage.style.left = `${touch.clientX - 25}px`;
            (window as any).currentDragImage.style.top = `${touch.clientY - 25}px`;
        }
    };

    const handleTouchEnd = () => {
        setActiveDragItem(null);
        if ((window as any).currentDragImage) {
            document.body.removeChild((window as any).currentDragImage);
            (window as any).currentDragImage = null;
        }
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
            setActiveDragItem(null);
            if ((window as any).currentDragImage) {
                document.body.removeChild((window as any).currentDragImage);
                (window as any).currentDragImage = null;
            }
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
            <FoodItemsWrapper>
                {colors.map((color, index) => (
                    <FoodItem
                        key={index}
                        color={color}
                        onDragStart={(e) => handleDragStart(e, color)}
                        onTouchStart={(e) => handleTouchStart(e, color)}
                    />
                ))}
            </FoodItemsWrapper>
        </StyledContainer>
    );
};

export default FoodItemContainer; 