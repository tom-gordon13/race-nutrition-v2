import React, { useState, useEffect } from 'react';
import { Container, styled, Box } from '@mui/material';

interface DroppedItem {
    id: number;
    color: string;
    x: number;
    y: number;
}

const StyledContainer = styled(Container)(({ theme }) => ({
    height: '66.67vh',
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

const RaceContainer: React.FC = () => {
    const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
    const [nextId, setNextId] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const color = e.dataTransfer.getData('color');
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setDroppedItems(prev => [...prev, {
            id: nextId,
            color,
            x,
            y,
        }]);
        setNextId(prev => prev + 1);
    };

    // Handle touch events for mobile
    useEffect(() => {
        const handleTouchMove = (e: TouchEvent) => {
            if ((window as any).currentDragImage) {
                setIsDragging(true);
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (isDragging && (window as any).currentDragImage) {
                const color = (window as any).currentDragImage.style.backgroundColor;
                const rect = document.querySelector('.MuiContainer-root')?.getBoundingClientRect();

                if (rect) {
                    const x = e.changedTouches[0].clientX - rect.left;
                    const y = e.changedTouches[0].clientY - rect.top;

                    // Check if the drop is within the RaceContainer
                    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                        setDroppedItems(prev => [...prev, {
                            id: nextId,
                            color,
                            x,
                            y,
                        }]);
                        setNextId(prev => prev + 1);
                    }
                }
            }

            setIsDragging(false);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
        document.addEventListener('touchcancel', handleTouchEnd);

        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, [isDragging, nextId]);

    return (
        <StyledContainer
            maxWidth="lg"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {droppedItems.map(item => (
                <DroppedItemBox
                    key={item.id}
                    color={item.color}
                    style={{
                        left: `${item.x - 25}px`,
                        top: `${item.y - 25}px`,
                    }}
                />
            ))}
        </StyledContainer>
    );
};

export default RaceContainer; 