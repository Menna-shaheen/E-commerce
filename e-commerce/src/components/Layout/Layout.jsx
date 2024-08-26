import React from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout() {
    return (
        <div>
            <Navbar/>
            <div className="container mx-auto"> <Outlet/></div>
            
        </div>
    )
}
