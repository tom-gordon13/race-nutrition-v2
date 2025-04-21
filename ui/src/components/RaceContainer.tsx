import React, { useState, useEffect, useRef } from 'react';
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
    overflow: 'auto',
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
    const containerRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<{ x: number, y: number, time: number } | null>(null);
    const isScrollingRef = useRef(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const color = e.dataTransfer.getData('color');
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Check if we have a selected item color
        const selectedColor = (window as any).selectedItemColor;

        // Only add if the dragged color matches the selected color
        if (selectedColor && selectedColor === color) {
            setDroppedItems(prev => [...prev, {
                id: nextId,
                color,
                x,
                y,
            }]);
            setNextId(prev => prev + 1);
        }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY,
            time: Date.now()
        };
        isScrollingRef.current = false;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!touchStartRef.current) return;

        const touch = e.touches[0];
        const deltaY = Math.abs(touch.clientY - touchStartRef.current.y);

        // If the user has moved more than 10px vertically, consider it scrolling
        if (deltaY > 10) {
            isScrollingRef.current = true;
        }
    };

    // Handle direct touch on container (for mobile placement without drag)
    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        // Only process if an item is selected AND we're not scrolling
        if (!isScrollingRef.current &&
            touchStartRef.current &&
            (window as any).isItemSelected &&
            (window as any).selectedItemColor) {

            // Calculate the duration of the touch
            const touchDuration = Date.now() - touchStartRef.current.time;

            // Only consider it a tap if touch duration was short (less than 300ms)
            // and if the touch didn't move significantly
            if (touchDuration < 300) {
                const color = (window as any).selectedItemColor;
                const rect = containerRef.current?.getBoundingClientRect();

                if (rect) {
                    const touch = e.changedTouches[0];
                    const x = touch.clientX - rect.left;
                    const y = touch.clientY - rect.top;

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

        // Reset the touch tracking refs
        touchStartRef.current = null;
        isScrollingRef.current = false;
    };

    // Handle touch events for mobile
    useEffect(() => {
        const handleGlobalTouchEnd = (e: TouchEvent) => {
            // Get color from the global variable (set by FoodItemContainer)
            if ((window as any).currentDragImage || (window as any).currentDragColor) {
                const color = (window as any).currentDragColor ||
                    ((window as any).currentDragImage ?
                        (window as any).currentDragImage.style.backgroundColor : null);

                // Only process if the item is selected
                if ((window as any).isItemSelected &&
                    (window as any).selectedItemColor === color &&
                    color && containerRef.current) {

                    const rect = containerRef.current.getBoundingClientRect();
                    const touch = e.changedTouches[0];

                    // Check if the touch ended within the RaceContainer bounds
                    if (
                        touch.clientX >= rect.left &&
                        touch.clientX <= rect.right &&
                        touch.clientY >= rect.top &&
                        touch.clientY <= rect.bottom
                    ) {
                        const x = touch.clientX - rect.left;
                        const y = touch.clientY - rect.top;

                        // Only add if we're not scrolling
                        if (!isScrollingRef.current) {
                            console.log('Dropping selected item', color, 'at', x, y);

                            // Add the dropped item
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
            }

            // Reset the scrolling flag after touch ends
            isScrollingRef.current = false;
        };

        document.addEventListener('touchend', handleGlobalTouchEnd);

        return () => {
            document.removeEventListener('touchend', handleGlobalTouchEnd);
        };
    }, [nextId]);

    return (
        <StyledContainer
            ref={containerRef}
            maxWidth="lg"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            id="race-container"
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