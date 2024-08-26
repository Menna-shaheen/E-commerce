import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
export default function Brands() {
    const [brands, setbrands] = useState([])
    const [Loading, setLoading] = useState(true)
    const [brand, setBrand] = useState(null);
    const [open, setOpen] = useState(false);
    const [brandLoading, setBrandLoading] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    function getBrands() {
        setLoading(true)
        axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            .then((res) => {
                setbrands(res.data.data)

            })
    }
    async function getSpecificBrand(brandId) {
        try {
            setBrandLoading(true);
            let { data } = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
            );

            setBrand(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setBrandLoading(false);
        }
    }
    useEffect(() => {
        getBrands()
    }, [])
    return (
        <>
            <h1 className='text-center font-semibold text-green-700 mt-10 text-2xl'>All Brands</h1>
            <div className="grid  relative mt-10 md:grid-cols-2 p-7 lg:grid-cols-3 xl:grid-cols-4  gap-6">

                {brands.length > 0 ?
                    brands.map((brand) => (

                        <div onClick={() => { onOpenModal(); getSpecificBrand(brand._id); }} key={brand._id}
                            className="w-full bg-white border cursor-pointer border-green-800 rounded-lg shadow hover:shadow-2xl hover:scale-[1.02] duration-500 ">
                            <img src={brand.image} className='rounded-t-lg w-full' alt="" />
                            <h2 className='text-xl  p-2 bg-green-800 rounded-b-lg text-white text-center font-semibold font-sans'>{brand.name}</h2>
                        </div>

                    ))

                    :
                    <div className="loader mx-auto fixed text-center left-[50%] top-[45%] my-auto align-self-center"></div>

                }
                {brand ? (
                    <Modal open={open} onClose={onCloseModal} showCloseIcon={true} blockScroll={false} animationDuration={500} center>
                        {brandLoading ? (
                            <div className="loader fixed top-48 left-[50%]"></div>
                        ) : (
                            <div className="flex justify-center items-center flex-col md:flex-row">
                                <div className="p-5">
                                    <h2 className="text-3xl text-green-600 font-semibold">{brand.name}</h2>
                                    <p className="text-lg text-gray-500">{brand.slug}</p>
                                </div>
                                <img src={brand.image} className="w-full" alt="" />
                            </div>
                        )}
                    </Modal>
                ) : null}

            </div>
        </>
    )
}
