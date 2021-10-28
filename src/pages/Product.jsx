import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import '../style/product.css'
import { getProductById } from '../api/product'
import { updateProductById } from '../api/product'
import { getCart } from '../api/cart'
import { addToCart } from '../api/cart'

import { setSelectedProduct } from '../redux/actions/products'
import { setCart } from '../redux/actions/cart'

const Product = (props) => {
  const [contents, setContent] = useState(null)
  const [error, setError] = useState({})
  const [render, setRender] = useState(false)
  const { id } = useParams()
  const product = useSelector((store) => store.selectedProduct.product)
  const cart = useSelector((store) => store.cart.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    getProductById(id).then((product) => {
      dispatch(setSelectedProduct(product))
    })
    getCart().then((cart) => {
      dispatch(setCart(cart))
    })
  }, [id, render, dispatch])

  const callBackRender = () => {
    setRender((isRender) => !isRender)
  }

  const validInputs = (name, value) => {
    setError((prevState) => ({
      ...prevState,
      [name]: value.length > 30 ? true : false,
    }))
    return value
  }

  const validTextArea = (name, value) => {
    setError((prevState) => ({
      ...prevState,
      [name]: value.length > 600 ? true : false,
    }))
    return value
  }

  const hendler = ({ target: { name, value } }) => {
    if (name === 'description') {
      value = validTextArea(name, value)
    }
    if (name === 'title') {
      value = validInputs(name, value)
    }
    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const edit = () => {
    if (contents !== null) {
      setContent(null)
    } else {
      setContent({
        ...product,
        title: product.title,
        description: product.description,
      })
    }
  }

  const save = () => {
    if (error.description === false || error.title === false) {
      updateProductById(id, contents)
      edit()
      callBackRender()
    }
  }

  const addCart = () => {
    let isProdInCart = cart.products.filter(
      (item) => product.id === item.productId
    )
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
    <div className="home-page">
      <div className="product-item-page">
        <h2>Product</h2>
        {contents ? (
          <>
            <input
              name="title"
              type="text"
              value={contents.title}
              onChange={hendler}
            />
            {error.title && (
              <span className="error">Вы ввели больше 30 символов</span>
            )}
            <div className="product">
              <div className="left-product">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="right-product">
                <span className="price">Цена: {product.price} UAH</span>
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                  onChange={hendler}
                  value={contents.description}
                />
                {error.description && (
                  <p className="error">Вы ввели больше 600 символов</p>
                )}
              </div>
            </div>

            <button className="button" onClick={save}>
              Сохранить
            </button>
          </>
        ) : (
          <>
            <h3>{product.title}</h3>
            <div className="product">
              <div className="left-product">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="right-product">
                <span className="price">Цена: {product.price} UAH</span>
                <p>{product.description}</p>
              </div>
            </div>
          </>
        )}
        {props.location.state.isLogin && !contents ? (
          <>
            <button className="button-page" onClick={addCart}>
              Добавить в корзину
            </button>
            <button className="button-page" onClick={edit}>
              Edit
            </button>
          </>
        ) : (
          <p>Чтобы добавить товар в корзину залогинтесь</p>
        )}
      </div>
    </div>
  )
}

export default Product
