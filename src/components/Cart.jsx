import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../api/cart'
import { setCart } from '../redux/actions/cart'
import { getAllProducts } from '../api/product'
import { setAllProducts } from '../redux/actions/products'
import { Link } from 'react-router-dom'

const Cart = (props) => {
  const [isLoading, setLoading] = useState(false)
  const [cartId, setCartId] = useState([])
  const [cartProd, setCartProd] = useState([])
  const products = useSelector((store) => store.allProducts.products)
  const cart = useSelector((store) => store.cart.cart)
  const dispatch = useDispatch()

  const filterId = () => {
    let findId = cart.products.map((item) => item.productId)
    setCartId(findId)
  }
  // console.log('CART ID', cartId)

  const filterProduct = () => {
    let newArrProd = products.filter((item) => !cartId.includes(item.id))
    setCartProd(newArrProd)
    // console.log('cartIDID', cartId)
  }

  useEffect(() => {
    setLoading(true)
    getCart()
      .then((cart) => {
        dispatch(setCart(cart))
      })
      .then(() => getAllProducts())
      .then((products) => {
        dispatch(setAllProducts(products))
      })
      .finally(() => {
        filterId()
        setLoading(false)
      })
  }, [])
  console.log('cart: ', cart)

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        products.map((prod) => (
          <div key={prod.id}>
            <div>
              <h2>{prod.title}</h2>
              {/* <h3>{prod.description}</h3> */}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
export default Cart
