import React from 'react'
import style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import Allorders from '../Allorders/Allorders'
export default function Home() {
    return (
        <>
        <MainSlider/>
        <CategorySlider/> 
        <RecentProducts/>
        
        </>
    )
}
