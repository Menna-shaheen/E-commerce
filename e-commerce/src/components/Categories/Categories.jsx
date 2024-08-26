import React, { useEffect } from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { useState } from 'react'
export default function Categories() {
    const [categories, setcategories] = useState([])
    const [Loading, setLoading] = useState(true)
    function getCategories() {
        setLoading(true)
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
            {categories.length > 0 ?
                <div className="grid relative sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 gap-6 ">
                    {categories.map((category) =>

                        <div key={category.name} className="w-full bg-white border cursor-pointer border-gray-200 rounded-lg shadow hover:shadow-2xl hover:scale-[1.02] duration-500 dark:bg-gray-800 dark:border-gray-700">

                            <img src={category.image} className='rounded-t-lg w-full h-[350px] object-cover' alt="product image" />
                            <h2 className='text-xl font-semibold p-3 bg-green-700 text-white   text-center'>{category.name}</h2>
                        </div>


                    )}
                </div>
                : <div className="loader fixed top-48 left-[50%]"></div>
            }


        </>
    )
}
