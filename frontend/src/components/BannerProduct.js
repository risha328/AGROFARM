import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';
import { motion } from 'framer-motion';

import ban1web from '../assest/banner/ban1web.jpeg';
import ban2 from '../assest/banner/ban2.jpeg';
import ban3 from '../assest/banner/ban3.jpeg';
import ban4 from '../assest/banner/ban4.jpeg';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [ban1web, ban2, ban3, ban4];
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile];

    const nextImage = () => {
        setCurrentImage((prev) => (prev < desktopImages.length - 1 ? prev + 1 : 0));
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev > 0 ? prev - 1 : desktopImages.length - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 5000);
        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className='container mx-auto px-4 rounded overflow-hidden'>
            <div className='relative h-[32rem] md:h-[28rem] w-full bg-slate-200 shadow-lg rounded-lg'>
                <div className='absolute inset-0 flex items-center justify-between z-10 px-4 md:px-8'>
                    <motion.button
                        onClick={prevImage}
                        className='bg-white shadow-lg rounded-full p-3 hover:bg-green-500 hover:text-white transition'
                        whileHover={{ scale: 1.1 }}
                    >
                        <FaAngleLeft />
                    </motion.button>
                    <motion.button
                        onClick={nextImage}
                        className='bg-white shadow-lg rounded-full p-3 hover:bg-green-500 hover:text-white transition'
                        whileHover={{ scale: 1.1 }}
                    >
                        <FaAngleRight />
                    </motion.button>
                </div>

                {/* Desktop and Tablet Version */}
                <div className='hidden md:flex h-full w-full overflow-hidden relative'>
                    {desktopImages.map((imageUrl, index) => (
                        <motion.div
                            key={imageUrl}
                            className='w-full h-full min-w-full min-h-full absolute'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: currentImage === index ? 1 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src={imageUrl} className='w-full h-full object-cover rounded-lg' alt='Banner' />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Version */}
                <div className='flex md:hidden h-full w-full overflow-hidden relative'>
                    {mobileImages.map((imageUrl, index) => (
                        <motion.div
                            key={imageUrl}
                            className='w-full h-full min-w-full min-h-full absolute'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: currentImage === index ? 1 : 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src={imageUrl} className='w-full h-full object-cover rounded-lg' alt='Banner' />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;