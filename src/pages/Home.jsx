import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api/product'
import { setAllProducts } from '../redux/actions/products'
import { addToCart } from '../api/cart'
import { getCart } from '../api/cart'
import { setCart } from '../redux/actions/cart'

const Home = (props) => {
  const products = useSelector((store) => store.allProducts.products)
  const cart = useSelector((store) => store.cart.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllProducts().then((products) => {
      dispatch(setAllProducts(products))
    })
  }, [dispatch])
  useEffect(() => {
    getCart().then((cart) => {
      dispatch(setCart(cart))
    })
  }, [dispatch])
  function addCart(id) {
    console.log('ID: ', id)
    let isProdInCart = cart.products.filter((item) => id === item.productId)
    if (isProdInCart.length !== 0) {
      cart.products.forEach((element) => {
        if (element.productId === isProdInCart[0].productId) {
          element.productId = isProdInCart[0].productId
          element.quantity = isProdInCart[0].quantity + 1
        }
      })
      addToCart(cart)
    } else {
      cart.products.push({
        productId: id,
        quantity: 1,
      })
      addToCart(cart)
    }
  }
  return (
    <>
      <h2>Home</h2>
      <div className="home-page">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <div className="container">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="product-list">
              <Link
                to={{
                  pathname: `/product/${product.id}`,
                  state: { isLogin: props.isLogin },
                }}
                className="title-link"
              >
                <h3 className="title-product">{product.title}</h3>
              </Link>
              <span className="price">{product.price} UAH</span>
              {props.isLogin ? (
                <button className="button" onClick={() => addCart(product.id)}>
                  Добавить в корзину
                </button>
              ) : (
                <p>Чтобы добавить товар в корзину залогинтесь</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
