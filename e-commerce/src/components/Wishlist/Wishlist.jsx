import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function WishList() {
    const [removeLoading, setremoveLoading] = useState(false)
    const [currentId, setcurrntId] = useState(0)
    let { GetWishList, setwishList, wishList, addToCart } = useContext(CartContext)
    const [Loading, setLoading] = useState(false)
    const [addItemLoading, setaddItemLoading] = useState(false)

    async function GetWishListBridg() {
        setLoading(true)
        let { data } = await GetWishList()

        if (data?.status === "success") {
            setwishList(data?.data)
        }
    }
    useEffect(() => {
        GetWishListBridg()
    }, [])

    async function removeItem(id) {
        setremoveLoading(true)
        setcurrntId(id)
        let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            {
                headers: {
                    token: localStorage.getItem('userToken')
                }
            }
        )
        if (data?.status === "success") {
            toast.success(data.message, { position: "top-right" })
            GetWishListBridg()
            setremoveLoading(false)
        } else {
            toast.error(data.message, { position: "top-right" })
        }
    }

    async function addToCartAndRemove(id) {
        setaddItemLoading(true)
        setcurrntId(id)
        let { data } = await addToCart(id);
        if (data?.status === "success") {
            setaddItemLoading(false)

            toast.success(data.message, {
                duration: 4000,
                position: "top-right",

            });
        } else {
            toast.error(data.message, {
                duration: 4000,
                position: "top-right",
            });
        }
        removeItem(id)
        setremoveLoading(false)

    }


    return (
        <>
            <div className='grid relative grid-cols-1 lg:ml-44 md:ml-36 '>
                {wishList === null ?
                    <div class="loader fixed top-48 left-[50%]"></div>
                    :
                    <div>
                        <h1 className='text-3xl font-sans font-semibold text-green-800 mt-8'>Your wish list: </h1>
                        <div className='mt-5 p-4'>
                            <div className="flex justify-evenly mt-14">
                            </div>
                            <div className="mt-5">
                                <table className="mx-auto w-full   text-gray-500 ">
                                    <thead className=" text-black uppercase bg-gray-50 ">
                                    </thead>
                                    <tbody>
                                        {wishList?.map((product, idx) =>
                                            <>
                                                <tr key={idx} className="bg-white   ">
                                                    <td className="py-4 ">
                                                        <img src={product.imageCover} className=" w-[1500px] lg:w-32 md:w-32 " alt="product image" />
                                                    </td>
                                                    <td className=" py-4 font-semibold text-gray-900 ">
                                                        <h3 className='h6 mt-5'> {product?.title.split(' ').slice(0, 5).join(' ')}</h3>
                                                        <h6 className='font-semibold '>Price: {product.price} EGP</h6>
                                                        {removeLoading && currentId == product.id ? <i className='fas fa-spinner fa-spin text-red-700'></i>
                                                            :
                                                            < span onClick={function () { removeItem(product.id) }} className='p-0 cursor-pointer btn font-sm'>
                                                                <i className='text-red-700 fas fa-trash-can mx-1 cursor-pointer'></i>remove</span>
                                                        }


                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="">

                                                            <div className=''>
                                                                {addItemLoading && currentId == product.id ? <i className='fas fa-spinner text-2xl fa-spin place-self-center ml-16 text-green-800 mx-auto text-center'></i>
                                                                    :
                                                                    <button onClick={function () { addToCartAndRemove(product.id) }}
                                                                        className='bg-green-700 mt-5 text-white mx-5 p-3 rounded-lg hover:bg-green-600'>Add to cart
                                                                    </button>
                                                                }

                                                            </div>
                                                            <div>

                                                            </div>

                                                        </div>
                                                    </td>

                                                </tr>

                                            </>
                                        )}


                                    </tbody >
                                </table>

                            </div>


                        </div>
                    </div>



                }

            </div>
            
        </>
    )

}
