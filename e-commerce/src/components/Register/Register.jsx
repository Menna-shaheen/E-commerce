import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import axios from 'axios';
import { UserContext } from '../context/UserContext';



export default function Register() {
    let { userLogin, setUserLogin } = useContext(UserContext)
    const navigate = useNavigate()
    const [apiError, setapiError] = useState('')
    const [isLoading, setisLoading] = useState(false)


    function handleRegister(values) {
        setisLoading(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .then((res) => {
                setisLoading(false)
                if (res.data.message == "success") {
                    localStorage.setItem('userToken', res.data.token)
                    setUserLogin(res.data.token)
                    navigate('/')
                }


            })
            .catch((res) => {
                setapiError(res.response.data.message);
                setisLoading(false)
            })
    }

    let myValidate = yup.object().shape(
        {
            name: yup.string().min(3, "minimum length is 3 characters").max(14, "maximum length is 14 characters").required("name is required"),
            email: yup.string().email("Enter valid email").required("Email is reqired"),
            phone: yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number").required("Phone is required"),
            password: yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "Password should be between 6 and 10 chars").required("Password is required"),
            rePassword: yup.string().oneOf(
                [yup.ref("password")], "Must be same as password").required("confirm password is required")

        }
    )
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },

        validationSchema: myValidate,
        onSubmit: handleRegister,
    })
    return (
        <>
            <h1 className='text-green-800 text-center mt-6 text-3xl font-bold font-serif'> Register Now</h1>
            {apiError ? <div className='w-1/3 p-3 mt-3 bg-white text-red-600 font-bold mx-auto text-center'>{apiError} ! </div> : null}
            <form onSubmit={formik.handleSubmit} className="grid mx-auto mt-3 w-3/4 pb-[22%] lg:pb-[7%] md:pb-[18%]">
                <div className="relative z-0 mt-3 w-full mb-5 group">
                    <input type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        name="name"
                        id="floating_text"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label for="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
                    {formik.touched.name && formik.errors.name ? (
                        <p className="text-red-500">{formik.errors.name}</p>
                    ) : null}
                </div>

                <div className="relative z-0 mt-1  w-full mb-5 group">
                    <input type="email"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        name="email"
                        id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label for="floating_repeat_number" className="peer-focus:font-medium absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
                    {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500">{formik.errors.email}</p>
                    ) : null}
                </div>
                <div className="relative z-0 mt-1  w-full mb-5 group">
                    <input type="tel"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        name="phone"
                        id="floating_number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label for="floating_repeat_number" className="peer-focus:font-medium absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
                    {formik.touched.phone && formik.errors.phone ? (
                        <p className="text-red-500">{formik.errors.phone}</p>
                    ) : null}
                </div>
                <div className="relative z-0  mt-1 w-full mb-5 group">
                    <input type="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        name="password"
                        id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Password</label>
                    {formik.touched.password && formik.errors.password ? (
                        <p className="text-red-500">{formik.errors.password}</p>
                    ) : null}
                </div>
                <div className="relative z-0 mt-1  w-full mb-5 group">
                    <input type="password"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.rePassword}
                        name="rePassword"
                        id="floating_repeat_password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                    <label for="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-700 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                    {formik.touched.rePassword && formik.errors.rePassword ? (
                        <p className="text-red-500">{formik.errors.rePassword}</p>
                    ) : null}
                </div>
                <Link to={'/Login'}>
                    <button type="submit" className="mx-auto text-white bg-green-700 hover:bg-green-900 duration-300 focus:ring-1 
                    focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm max-w-fit px-5 py-2.5 ">
                        {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
                    </button>
                </Link>
                <Link className='mx-auto py-2 underline text-green-800' to={'/Login'}><span >Do you have an account ? Login Now.</span>  </Link>
            </form>

        </>
    )
}
