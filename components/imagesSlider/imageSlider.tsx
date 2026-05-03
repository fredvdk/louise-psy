'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { PageImage } from '../pageElements';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './imageSlider.module.css';

const ImageSlider = ({ images }: { images: string[] }) => {
    return (
        <Swiper
            // Install modules
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            loop={true}
            style={{ width: '100%', height: '400px' }}
        >
            {images.map((src, index) => (
                <SwiperSlide key={index}>
                    <PageImage
                        src={src}
                        alt={`Slide ${index + 1}`}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageSlider;