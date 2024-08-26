import React from 'react'
import style from './MainSlider.module.css'
import Slider from "react-slick";
import Slider1 from '../../assets/slider-image-1.jpeg';
import Slider2 from '../../assets/slider-image-2.jpeg';
import Slider3 from '../../assets/slider-image-3.jpeg';
import Slider4 from '../../assets/grocery-banner.png';
import Slider5 from '../../assets/grocery-banner-2.jpeg';
export default function MainSlider() {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplayspeed: 1000
    };
    return (
        <>
            <div className=" flex flex-nowrap items-center justify-center  mt-6 mb-4">

                <div className='w-3/4 '>
                    <Slider {...settings}>
                        <img src={Slider3} alt="" className='w-full h-[215px] lg:h-[430px] object-fill' />
                        <img src={Slider4} alt="" className='w-full h-[215px] lg:h-[430px]  object-fill' />
                        <img src={Slider5} alt="" className='w-full h-[215px] lg:h-[430px]  object-fill' />
                    </Slider>

                </div>
                <div className="w-1/4">
                    <img src={Slider2} alt="" className='w-full object-fill h-[110px] lg:h-[215px] ' />
                    <img src={Slider3} alt="" className='w-full object-fill h-[110px] lg:h-[215px] ' />
                </div>
            </div>

        </>
    )
}
