import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { CartContext } from '../context/CartContext'

export default function Navbar() {

    let { numOfItems } = useContext(CartContext)
    let { userLogin, setUserLogin } = useContext(UserContext)
    function logOut() {
        localStorage.removeItem('userToken')
        setUserLogin(null)
    }
    return (
        <>

            <nav className="bg-gray-50 sticky w-full z-20 top-0 start-0 font-serif  border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-center lg:justify-between xl:justify-between md:justify-center mx-auto p-4">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap"><i className="fa-solid fa-cart-shopping text-green-600"></i> Fresh Cart</span>

                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <Link to='cart'>
                            <i className="fa-solid fa-cart-shopping text-gray-600 text-2xl relative mr-4">
                                <button className='w-6 h-5 rounded-md text-white bg-green-500 absolute left-4 top-[-10px] text-sm '> {numOfItems}</button>
                            </i>
                        </Link>

                        {userLogin != null ? <h2 onClick={logOut} className='text-md pl-2 cursor-pointer'><Link to='login'> Logout</Link> </h2>
                            :
                            <>
                                <h2 className='text-md cursor-pointer'><Link to='login' > Login</Link>  </h2>
                                <h2 className='text-md pl-2 cursor-pointer'> <Link to='register'> Register</Link> </h2>
                            </>
                        }

                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-green-500 rounded-lg md:hidden hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            
                            <svg className="w-5 h-5 text-green" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                                
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                           

                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        {userLogin !== null ?
                            <>
                                <ul className="flex flex-col p-4 md:p-0 mx-3 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-50 text-center md:dark:bg-gray-50">
                                    <li className='text-md cursor-pointer'><NavLink to=''>Home</NavLink> </li>
                                    <li className='text-md cursor-pointer'><NavLink to='cart'>Cart</NavLink> </li>
                                    <li className='text-md cursor-pointer'><NavLink to='wishlist'>Wish List</NavLink> </li>
                                    <li className='text-md cursor-pointer'><NavLink to='/recentproducts'>Products</NavLink> </li>
                                    <li className='text-md cursor-pointer'><NavLink to='categories'>Categories</NavLink> </li>
                                    <li className='text-md cursor-pointer'><NavLink to='brands'>Brands</NavLink> </li>
                                </ul>
                            </> : null
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
