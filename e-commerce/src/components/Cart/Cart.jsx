import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
export default function Cart() {
    const [currentId, setcurrntId] = useState(0)
    const [CartDetails, setCartDetails] = useState(null)
    const [Loading, setLoading] = useState(false)
    const [removeLoading, setremoveLoading] = useState(false)
    let { getLoggedUserCart, updateCartProductCount, deletCartItem, clearCart, setnumOfItems, getLoggedUserWishlist,numOfItems } = useContext(CartContext)
    async function getCartItems() {

        let response = await getLoggedUserCart()
        if (response.data.status == 'success') {
            setCartDetails(response.data.data)
        }

    }
    async function getProductCount(id, count) {
        setcurrntId(id)
        setLoading(true)
        if (count == 0) {
            deleteItem(id)
            setremoveLoading(false)
        }
        else {
            let response = await updateCartProductCount(id, count)
            setLoading(false)
            setCartDetails(response.data.data)
            if (response.data.status == 'success') {
                setCartDetails(response.data.data)
                toast.success('Product Updated successfully', {
                    position: 'top-right',
                    duration: 3000,
                    style: {
                        background: '#fff',
                        color: 'green',
                    },
                })
            }
            else {
                toast.error(('Error'))

            }
        }
    }

    async function deleteItem(productId) {
        setremoveLoading(true)
        setcurrntId(productId)
        let response = await deletCartItem(productId)
        setCartDetails(response.data.data)
        setremoveLoading(false)
        setnumOfItems(numOfItems - 1)
        toast.success('Product removed successfully', {
            position: 'top-right',
            duration: 3000,
            style: {
                background: '#fff',
                color: 'green',
            },
        })
    }

    async function clearCartItems() {

        let response = await clearCart()
        setCartDetails(response.data.data)
        setnumOfItems(numOfItems-numOfItems)

    }

    useEffect(() => {
        getLoggedUserWishlist()
        getCartItems()

    }, [])
    return (
        <>

            {CartDetails?.products.length != 0 ?
                <>
                    <div className="flex justify-evenly mt-14">
                        <span className='place-self-start text-2xl font-semibold font-sans underline text-green-800'>TOTAL PRICE : {CartDetails?.totalCartPrice} EGB</span>
                        <button onClick={() => clearCartItems()} className='rounded-lg  place-self-end p-3 bg-green-800 hover:bg-green-700 duration-300 text-white'>Clear Cart</button>
                    </div>
                    <div className=" mt-5  ">

                        <table className=" mx-auto w-full text-gray-500 ">

                            <thead className=" text-black uppercase bg-gray-50 ">

                            </thead>
                            <tbody>
                                {CartDetails?.products.map((product) =>
                                    <>
                                        <tr key={product.product.id} className="bg-white   ">
                                            <td className="">
                                                <img src={product.product.imageCover} className=" sm:w-[300px] lg:w-32 md:w-32 " alt="" />
                                            </td>
                                            <td className="px-2 py-4 font-semibold text-gray-900 ">
                                                {product.product.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">

                                                    <button onClick={() => getProductCount(product.product.id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none  focus:ring-4 focus:ring-gray-200 " type="button">
                                                        <span className="sr-only">Quantity button</span>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                                        </svg>
                                                    </button>
                                                    <div>
                                                        {Loading && currentId == product.product.id ? <i className='fas fa-spinner fa-spin text-green'></i>
                                                            : <span> {product.count}</span>
                                                        }

                                                    </div>
                                                    <button onClick={() => getProductCount(product.product.id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none  focus:ring-4 focus:ring-gray-200 " type="button">
                                                        <span className="sr-only">Quantity button</span>
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 ">
                                                {product.price * product.count}  EGB
                                            </td>
                                            <td className="px-6 py-4">
                                               
                                                {removeLoading && currentId == product.product.id ? <i className='fas fa-spinner fa-spin text-red-700'></i>

                                                    : <span onClick={() => deleteItem(product.product.id)} className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
                                                }
                                            </td>
                                        </tr>
                                 
                                    </>
                                )}

                               
                            </tbody >
                        </table>
                        <Link to={`/checkout`} className='grid place-content-center' >
                                    <button className='w-auto mb-32 bg-green-800 text-white mx-auto rounded-lg p-4 mt-3 text-xl hover:bg-green-700 duration-300'>Check Out</button>
                                </Link>
                    </div>
                </>
                :
                <div className="flex justify-evenly mt-14">
                    <span className='place-self-start text-2xl font-semibold font-sans underline text-green-800'>TOTAL PRICE : {CartDetails?.totalCartPrice} EGB</span>
                    <button onClick={() => clearCartItems()} className='rounded-lg  place-self-end p-3 bg-green-800 hover:bg-green-700 duration-300 text-white'>Clear Cart</button>
                </div>

            }


        </>


    )
}
