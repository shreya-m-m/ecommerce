import React, { useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import HomeSetionCard from '../homeSectionCard/HomeSectionCard';
import { Button } from '@mui/material'; 
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const HomeSetionCarousel = ({data, sectionName}) => {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    
    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 4 },
    };

    const items = data.slice(0, 10).map((item, index) => (
        <HomeSetionCard key={index} product={item} />
    ));

    const handleSlideChange = ({ item }) => {
        setActiveIndex(item);
    };

    const prevBut = () => {
        if (carouselRef.current) {
            carouselRef.current.slidePrev();
        }
    };

    const nextBut = () => {
        if (carouselRef.current) {
            carouselRef.current.slideNext();
        }
    };

    return (
        <div className='border border-gray'>
           <h2 className='text-2xl font-extrabold text-gray-800 py-5 text-left'>{sectionName}</h2>
            <div className="relative p-5 mx-auto">
                <AliceCarousel
                    ref={carouselRef}
                    items={items}
                    responsive={responsive}
                    disableDotsControls
                    disableButtonsControls
                    onSlideChanged={handleSlideChange}
                    activeIndex={activeIndex}
                />
                  {activeIndex !== items.length-4 &&   <Button
                    variant="contained" onClick={nextBut} sx={{position: 'absolute',top: '40%',right: '0',transform: 'translateX(50%) rotate(90deg)',zIndex: 50,
                        backgroundColor: 'white',color: 'gray'}} aria-label="next" >
                    <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)' }} />
                </Button>}
               { activeIndex !==0 &&  <Button
                    variant="contained" onClick={prevBut} sx={{position: 'absolute',top: '40%',left: '0',transform: 'translateX(-50%) rotate(-90deg)',zIndex: 50,
                        backgroundColor: 'white',color: 'gray'}} aria-label="next" >
                    <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)' }} />
                </Button>}
            </div>
        </div>
    );
};

export default HomeSetionCarousel;
