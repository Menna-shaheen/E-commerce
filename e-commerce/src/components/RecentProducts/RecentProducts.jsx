import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import { Link } from 'react-router-dom'
import useProduct from '../../../../Hooks/useProduct'
import { CartContext } from '../context/CartContext'
import toast, { Toaster } from 'react-hot-toast';
export default function RecentProducts() {
    let { addToWishList, wishList, setwishList, GetWishList } = useContext(CartContext);
    const [dataa, setdataa] = useState([])
    const [wishListIds, setwishListIds] = useState([])
    const [filterText, setfilterText] = useState('')
    let { data } = useProduct()
    let { addToCart, setnumOfItems, numOfItems } = useContext(CartContext)
    const [Loading, setLoading] = useState(false)
    const [Loadingh, setLoadingh] = useState(false)
    const [currentId, setcurrntId] = useState(0)
    const [currentIdw, setcurrntIdw] = useState(0)
    async function GetWishListBridg() {
        let { data } = await GetWishList()
        if (data?.status === "success") {

            setwishList(data?.data)
            wishList?.forEach(element => {
                setwishListIds(prevArray => [...prevArray, element.id]);
            });

        }
    }

    useEffect(() => {
        GetWishListBridg()
    }, [wishList, wishListIds])

    async function addToWL(id) {
        setcurrntIdw(id)
        setLoadingh(true)
        let { data } = await addToWishList(id)
        if (data?.status === "success") {
            setdataa(data.id)
            toast.success(data?.message

                , {
                    position: 'top-right',
                    duration: 3000,
                    style: {
                        background: '#fff',
                        color: 'green',
                    }
                }
            ),

                GetWishListBridg();
            setLoadingh(false)


        } else {
            toast.error('something went wrong please refresh the page and try again', {
                duration: 4000,
                position: "top-right",
            });
            GetWishListBridg();
            setLoadingh(false)
        }

    }
    async function addProductToCart(id) {
        setcurrntId(id)
        setLoading(true)
        let response = await addToCart(id)
        if (response.data.status == "success") {
            setnumOfItems(numOfItems + 1)
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

    return (
        <>

            <form className='text-center w-50 mx-auto  mt-12 d-flex align-items-center m-5' >
                <div className="text-center   mx-auto my-5 d-flex align-items-center m-5">
                    <input type="search" className="form-control w-3/4 rounded "
                        placeholder="search... "
                        value={filterText}
                        onChange={(e) => setfilterText(e.target.value)}
                    />
                </div >
            </form>

            <div className='row grid relative place-content-center mt-5 '>

                {data?.data?.data.length > 0 ?
                    data?.data?.data.map((product) => {
                        if (
                            product.title.toLowerCase().indexOf(filterText.toLowerCase()) === -1
                        ) {
                            return;
                        }
                        return (
                            <div key={product.id} className='sm:w-1/3 md:w-1/4  lg:w-1/5 w-1/2 px-3 py-3 rounded-lg hover:shadow-md hover:shadow-green-800 duration-500'>
                                <div className="product my-3 text-center relative" >

                                    <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                                        <img src={product.imageCover} className='w-full' alt="" />
                                        <h3 className=' text-green-600 font-semibold font-sans'>{product.category.name}</h3>
                                        <h3 className='mb-2 font-sans font-semibold'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>

                                        <div className='flex justify-between px-5 '>
                                            <h3>{product.price} EGP</h3>

                                            <h3>{product.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></h3>
                                        </div>
                                    </Link>
                                    <button onClick={() => addToWL(product.id, product)} className={'heart-btn w-25 m-0'}
                                        style={{ color: wishListIds.includes(product.id) || currentIdw == product.id ? 'red' : 'black' }} >
                                        {Loadingh && currentIdw == product.id ? <i className='fas fa-spinner fa-spin  text-black'></i>
                                            : <i className="fa-solid text-xl fa-heart m-0" ></i>
                                        }
                                    </button>
                                    <button onClick={() => addProductToCart(product.id)} className='btn bg-green-700 mt-4 w-full p-2  text-white rounded-md hover:bg-green-600 duration-300'>
                                        {Loading && currentId == product.id ? <i className='fas fa-spinner fa-spin text-white'></i>
                                            : <span>Add To Cart</span>

                                        }
                                    </button>

                                </div>

                            </div>

                        )
                    })
                    :
                    <div className="loader fixed top-48 left-[50%]"></div>}
            </div >

        </>
    )
}
