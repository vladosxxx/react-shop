import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../api/cart'
import { setCart } from '../redux/actions/cart'
import { getAllProducts } from '../api/product'
import { setAllProducts } from '../redux/actions/products'
import '../style/cart.css'

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
  }, [dispatch])
  useEffect(() => {
    getAllProducts().then((products) => {
      dispatch(setAllProducts(products))
    })
  }, [dispatch])
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
        <>
          <h3 className="title-cart">Shopping Cart</h3>
          {cartProd.map((prod) => (
            <div key={prod.id} className="container-cart">
              <img src={prod.image} alt={prod.title} />
              <h3>{prod.title}</h3>
              <div className="price-cart">
                <h5>{prod.quantity} шт.</h5>
                <h5>{prod.price} USD</h5>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
export default Cart
