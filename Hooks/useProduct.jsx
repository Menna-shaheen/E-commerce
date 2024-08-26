import React from 'react'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
export default function useProduct() {
    function getProducts() {
        return (axios.get('https://ecommerce.routemisr.com/api/v1/products'))
    }

    let productInfo = useQuery({
        queryKey: ['products'],
        queryFn: getProducts
    })
    return productInfo
}
