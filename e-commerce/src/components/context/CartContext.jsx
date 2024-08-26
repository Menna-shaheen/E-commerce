import axios from "axios";
import { createContext, useEffect, useState } from "react";
export let CartContext = createContext()
export default function CartContextProvider(props) {
    const [wishList, setwishList] = useState(null)
    const [cartId, setcartId] = useState(null)
    const [numOfItems, setnumOfItems] = useState(0)
    let headers = { token: localStorage.getItem('userToken') }

    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: productId },
            { headers })

            .then((res) => res)
            .catch((err) => err)
    }
    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => {
                setnumOfItems(res.data.numOfCartItems)
               
                return res

            }
            )
            .catch((err) => err)
    }

    function checkOut(cartId, url, formData) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress: formData,
            }
            ,
            { headers }
            , { params: 'http://localhost:5176/' }
        )
            .then((res) => {

                return res
            }
            )
            .catch((err) => err)
    }

    function updateCartProductCount(productId, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count: newCount }, { headers })

            .then((res) => res)
            .catch((err) => err)
    }

    function deletCartItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }

    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    useEffect(() => {
        getLoggedUserCart()
    }, [])
    function GetWishList() {
        return axios
            .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers,
            })
            .then((res) =>

                res
            )
            .catch((err) => err);
    }

    function getLoggedUserWishlist() {
        return axios
          .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: { token: localStorage.getItem("token") },
          })
          .then((response) => {
            setWishlist(
              response.data.data.map((product) => {
                return product.id;
              })
            );
            return response;
          })
          .catch((error) => error);
      }

    function addToWishList(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: id, },
            { headers }
        )
            .then((res) => res)
            .catch((err) => err);
    }

    return (

        <>
            < CartContext.Provider value={{
                addToCart, addToWishList, getLoggedUserWishlist,wishList, setwishList, clearCart, getLoggedUserCart, updateCartProductCount, deletCartItem, setnumOfItems, numOfItems, checkOut, cartId, setcartId, GetWishList

            }}>
                {props.children}
            </CartContext.Provider>
        </>
    )
}