import React, { useEffect } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import { useState } from 'react'
import Slider from 'react-slick'

export default function CategorySlider() {
    const [categories, setcategories] = useState([])
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplayspeed: 1000
    };
    function getCategories() {
        axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then((res) => {
                setcategories(res.data.data)

            })
    }
    useEffect(() => {
        getCategories()
    }, [])
    return (
        <>
        <h2 className='mt-16   font-semibold text-gray-800 '>Shop Popular Category :</h2>
            <Slider {...settings} className='w-[89%] lg:w-[90%] xl:w-[98%] md:w-[93%] mx-auto '>
                {categories.map((category) =>
                    <div key={category.name} className='mt-7'>
                        <img src={category.image} className='w-full h-[260px] rounded-lg p-1 object-cover' alt="product image" />
                         <h4 className='text-center text-gray-700 font-semibold'>{category.name}</h4> 
                    </div>
                )}
            </Slider>
        </>
    )
}
