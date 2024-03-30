import React, { useState, useEffect } from 'react';
import './HiddenImageComponent.css'; // Import CSS for styling

const HiddenImageComponent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Simulate slight delay before showing "Know More" button
        const timeoutId = setTimeout(() => setIsVisible(true), 300);
        return () => clearTimeout(timeoutId);
    }, []); // Empty dependency array to run only once on component mount

    const handleKnowMoreClick = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setIsVisible(!isVisible);
            setIsAnimating(false);
        }, 500); // Control animation duration
    };

    return (
        <div className="mobile-image-container">
            <div className="image-wrapper">
                <img
                    src="/assets/hidden-pic1.png"
                    alt="First"
                    className={`mobile-image ${isVisible ? '' : 'initial-opacity'}`} // Toggle initial opacity for first image
                />
            </div>
            { isVisible && (<div className="know-more-button" onClick={handleKnowMoreClick}>
                <span className="button-text">Know More</span>
                <i
                    className={`arrow-icon fas fa-chevron-down ${isAnimating ? 'animate-arrow' : ''}`} // Animate arrow on click
                ></i>
            </div>)}
            {!isVisible && ( // Wrap additional images with conditional rendering
                <> {/* Use React fragment to avoid unnecessary wrapper */}
                    <div className={`mobile-image-container-images ${isAnimating ? 'slide-down' : ''}`}>
                        <div className="image-wrapper">
                            <img src="/assets/hidden-pic2.png" alt="Second" className="mobile-image" />
                        </div>
                        <div className="image-wrapper">
                            <img src="/assets/hidden-pic3.png" alt="Third" className="mobile-image" />
                        </div>
                        <div className="image-wrapper">
                            <img src="/assets/hidden-pic4.png" alt="Fourth" className="mobile-image" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default HiddenImageComponent;
