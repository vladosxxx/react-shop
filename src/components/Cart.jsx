import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../api/cart'
import { setCart } from '../redux/actions/cart'
import { getAllProducts } from '../api/product'
import { setAllProducts } from '../redux/actions/products'

const Cart = () => {
  const [isLoading, setLoading] = useState(false)
  const [cartId, setCartId] = useState([])
  const [cartProd, setCartProd] = useState([])
  const products = useSelector((store) => store.allProducts.products)
  const cart = useSelector((store) => store.cart.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    getCart().then((cart) => {
      dispatch(setCart(cart))
    })
  }, [])
  useEffect(() => {
    getAllProducts().then((products) => {
      dispatch(setAllProducts(products))
    })
  }, [])
  useEffect(() => {
    let findId = cart.products.map((item) => item.productId)
    setCartId(findId)
    let newArrProd = products.filter((item) => findId.includes(item.id))
    newArrProd = newArrProd.map((item, index) => ({
      ...item,
      price: item.price * cart.products[index].quantity,
      quantity: cart.products[index].quantity,
    }))
    setCartProd(newArrProd)
    setLoading(false)
  }, [cart, products])

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        cartProd.map((prod) => (
          <div key={prod.id}>
            <div className="container-cart">
              <img src={prod.image} alt={prod.title} />
            </div>
            <h3>{prod.title}</h3>
            <div className="price-cart">
              <p>Количество товара: {prod.quantity}</p>
              <p>Стоимость: {prod.price}</p>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
export default Cart
