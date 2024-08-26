import React from 'react'
import error from '../../assets/error.svg'
import style from './Notfound.module.css'
export default function Notfound() {
    return (
        <div className='grid mt-5 place-content-center'>
        <img src={error} alt="error image" className='w-full' />
        </div>
    )
}
