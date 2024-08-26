import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from 'react-slick'
import useProduct from '../../../../Hooks/useProduct'
import { CartContext } from '../context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
export default function ProductDetails() {
    const [product, setproduct] = useState()
    const [relatedProducts, setrelatedProducts] = useState([])
    const [Loading, setLoading] = useState(false)
    const [currentId, setcurrntId] = useState(0)
    let { data } = useProduct()
    let { addToCart , setnumOfItems , numOfItems} = useContext(CartContext)
    let { id, category } = useParams();
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplayspeed: 1000
    };
    async function addProductsToCart(id) {
        setcurrntId(id)
        setLoading(true)
        let response = await addToCart(id)
        if (response.data.status == "success") {
            setnumOfItems(numOfItems+1)
            toast.success(response.data.message, {
                position: 'top-right',
                duration: 3000,
                style: {
                    background: '#fff',
                    color: 'green',
                },
            })
            setLoading(false)
        }
        else {
            toast.error(response.data.message)
            setLoading(false)
        }
    }
    function getProduct(id) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((res) => {
                setproduct(res.data.data)
            })
            .catch((res) => {
                console.log(res);
            });
    }
    function getallProducts(name) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
            .then((res) => {
                let related = res.data.data.filter((product) => product.category.name == category)
                setrelatedProducts(related)
            })
            .catch((res) => {
                console.log(res);
            })
    }
    useEffect(() => {
        getProduct(id)
        getallProducts()
    }, [id, category])

    return (
        <>
            <div className='row flex items-center'>
                <div className='w-1/4'>
                    <Slider {...settings}>
                        {product?.images.map((src) => <img src={src} className='w-full' alt="" />

                        )}
                    </Slider>
                </div>
                <div className='w-3/4 px-16 my-5'>
                    <h3 className='text-2xl font-semibold'>{product?.title}</h3>
                    <h3 className='text-gray-700 my-3'>{product?.description}</h3>
                    <h3 className='text-green-700 my-3 font-semibold'>{product?.category.name}</h3>
                    <div className='flex justify-between pr-20'>
                        <span>{product?.price} EGP</span>
                        <span>{product?.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
                    </div>
                    <button onClick={() => addProductsToCart(product.id)} className='btn bg-green-700 mt-4 w-full p-2  text-white rounded-md hover:bg-green-600 duration-300'>
                                    {Loading && currentId == product.id ? <i className='fas fa-spinner fa-spin text-white'></i>
                                        : <span> + Add </span>

                                    }
                                </button>

                </div>
            </div>
            <div className='row grid place-content-center mt-5 '>
                {relatedProducts.length > 0 ?
                    relatedProducts.map((product) => (
                        <div key={product.id} className='sm:w-1/3 md:w-1/4  lg:w-1/5 w-1/2 px-3 py-3 rounded-lg hover:shadow-md hover:shadow-green-800 duration-500'>
                            <div className="product my-3 text-center relative" >

                                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                    <img src={product.imageCover} className='w-full' alt="" />
                                    <h3 className=' text-green-600 font-semibold font-sans'>{product.category.name}</h3>
                                    <h3 className='mb-2 font-sans font-semibold'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>

                                    <div className='flex justify-between px-5 '>
                                        <h3>{product.price} EGP</h3>
                                        <i class="fa-solid fa-heart text-gray-400 text-2xl text-center cursor-pointer "></i>
                                        <h3>{product.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></h3>
                                    </div>
                                </Link>
                                <button onClick={() => addProductsToCart(product.id)} className='btn bg-green-700 mt-4 w-full p-2  text-white rounded-md hover:bg-green-600 duration-300'>
                                    {Loading && currentId == product.id ? <i className='fas fa-spinner fa-spin text-white'></i>
                                        : <span>Add To Cart</span>

                                    }
                                </button>                   
                               </div>

                        </div>


                    ))
                    :
                    <div class="loader absolute top-48"></div>
                }
            </div >
        </>
    )
}
