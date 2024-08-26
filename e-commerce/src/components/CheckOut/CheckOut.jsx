import React, { useContext, useState } from 'react'
import style from './CheckOut.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import * as Yup from "yup";

export default function CheckOut() {
    let { cartId } = useContext(CartContext)
    let { checkOut } = useContext(CartContext)
    let validationSchema = Yup.object().shape({
        details: Yup.string().required("Details is required"),
        phone: Yup.string()
          .required("Phone is required")
          .matches(/^(002|\+20)?01[0125][0-9]{8}$/, "Ex:(01111111111)"),
        city: Yup.string().required("Ex:(cairo)"),
      });

    let formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validationSchema,
        onSubmit: () =>
        
        handleCheckOut(cartId, `http://localhost:5176`)
    })

    async function handleCheckOut(cartId, url) {
        let { data } = await checkOut(cartId, url, formik.values)

        window.location.href = data.session.url


    }


    return (
        <>
            <h1 className='text-green-800 text-center mt-6 text-3xl font-bold font-serif'> Checkout Now</h1>


            <form onSubmit={formik.handleSubmit} className="grid mx-auto mt-3 w-3/4 pb-[22%] lg:pb-[7%] md:pb-[18%]">

                <div className="relative z-0 mt-1  w-full mb-5 group">
                    <input type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.details}
                        name="details"
                        id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label for="floating_repeat_number" className="peer-focus:font-medium absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details</label>

                </div>

                <div className="relative z-0  mt-1 w-full mb-5 group">
                    <input type="tel"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        name="phone"
                        id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your phone</label>

                </div>
                <div className="relative z-0  mt-1 w-full mb-5 group">
                    <input type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        name="city"
                        id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label for="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter your city</label>

                </div>

                <button type="submit" className="mx-auto text-white bg-green-700 hover:bg-green-900 duration-300 focus:ring-1 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 ">
                    Checkout
                </button>
            </form>

        </>
    )
}
