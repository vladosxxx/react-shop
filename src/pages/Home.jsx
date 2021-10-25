import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cart from '../components/Cart'
import '../style/home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../../api/products'
import { setAllProducts } from '../../redux/actions/products'

const Home = (props) => {
  // const [products, setProducts] = useState([])
  const [cart, setCart] = useState({ items: 0, price: 0 })
  // const [render, setRender] = useState(false)
  const products = useSelector((store) => store.allProducts.products)
  const dispatch = useDispatch()
  useEffect(() => {
    getAllProducts().then((products) => {
      dispatch(setAllProducts(products))
    })
  }, [])

  // const callBackRender = () => {
  //   setRender((isRender) => !isRender)
  // }
  const putIntoCart = (cost) => {
    setCart((prevState) => ({
      price: prevState.price + cost,
      items: prevState.items + 1,
    }))
  }
  return (
    <>
      <h2>Home</h2>
      <div className="home-page">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={'/pictures/' + product.image} alt={product.title} />
            <div className="product-list">
              <Link
                to={{
                  pathname: `/product/${product.id}`,
                  state: { isLogin: props.isLogin, cart },
                }}
              >
                <h3>{product.title}</h3>
              </Link>
              <span className="price">{product.price} UAH</span>
              {props.isLogin ? (
                product.inStock ? (
                  <Cart product={product} putIntoCart={putIntoCart} />
                ) : (
                  <p>Not available</p>
                )
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
