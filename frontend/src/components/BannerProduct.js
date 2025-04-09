import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { motion } from 'framer-motion';

import ban1web from '../assest/banner/ban1web.jpeg';
import ban2 from '../assest/banner/ban2.jpeg';
import ban3 from '../assest/banner/ban3.jpeg';
import ban4 from '../assest/banner/ban4.jpeg';
import mobban1 from '../assest/banner/mobban1.jpeg';
import mobban2 from '../assest/banner/mobban2.jpeg';
import mobban3 from '../assest/banner/mobban3.jpeg';

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const desktopImages = [ban1web, ban2, ban3, ban4];
    const mobileImages = [mobban1, mobban2, mobban3];

    const nextImage = () => {
        setCurrentImage((prev) => (prev < desktopImages.length - 1 ? prev + 1 : 0));
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev > 0 ? prev - 1 : desktopImages.length - 1));
    };

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(nextImage, 5000);
            return () => clearInterval(interval);
        }
    }, [currentImage, isHovered]);

    return (
        <div 
            className="w-full overflow-hidden relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Desktop and Tablet Version */}
            <div className='hidden md:block w-full h-[32rem] lg:h-[40rem] xl:h-[45rem]'>
                {desktopImages.map((imageUrl, index) => (
                    <motion.div
                        key={imageUrl}
                        className='w-full h-full absolute'
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: currentImage === index ? 1 : 0,
                            scale: currentImage === index ? 1 : 1.02
                        }}
                        transition={{ duration: 0.8 }}
                    >
                        <img 
                            src={imageUrl} 
                            className='w-full h-full object-cover object-center' 
                            alt={`Banner ${index + 1}`} 
                        />
                    </motion.div>
                ))}
            </div>

            {/* Mobile Version */}
            <div className='block md:hidden w-full h-[24rem]'>
                {mobileImages.map((imageUrl, index) => (
                    <motion.div
                        key={imageUrl}
                        className='w-full h-full absolute'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: currentImage === index ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <img 
                            src={imageUrl} 
                            className='w-full h-full object-cover object-center' 
                            alt={`Mobile Banner ${index + 1}`} 
                        />
                    </motion.div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <div className='absolute inset-0 flex items-center justify-between z-10 px-4 md:px-8'>
                <motion.button
                    onClick={prevImage}
                    className='bg-white/80 hover:bg-white text-gray-800 shadow-lg rounded-full p-2 md:p-3 transition-all'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaAngleLeft className='text-lg md:text-xl' />
                </motion.button>
                <motion.button
                    onClick={nextImage}
                    className='bg-white/80 hover:bg-white text-gray-800 shadow-lg rounded-full p-2 md:p-3 transition-all'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaAngleRight className='text-lg md:text-xl' />
                </motion.button>
            </div>

            {/* Indicators */}
            <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10'>
                {desktopImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-3 h-3 rounded-full transition-all ${currentImage === index ? 'bg-white w-6' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default BannerProduct;