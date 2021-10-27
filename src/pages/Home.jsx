import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/home.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api/product'
import { setAllProducts } from '../redux/actions/products'

const Home = (props) => {
  const products = useSelector((store) => store.allProducts.products)
  const dispatch = useDispatch()

  useEffect(() => {
    getAllProducts().then((products) => {
      dispatch(setAllProducts(products))
    })
  }, [])
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
              {/* {props.isLogin ? (
                <Cart product={product} putIntoCart={putIntoCart} />
              ) : (
                <p>Чтобы добавить товар в корзину залогинтесь</p>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
