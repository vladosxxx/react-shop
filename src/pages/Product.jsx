import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import '../style/product.css'
import { getProductById } from '../api/product'
import {
  setSelectedProduct,
  clearSelectedProduct,
} from '../redux/actions/products'

const Product = (props) => {
  // const [product, setProduct] = useState({})
  const [contents, setContent] = useState(null)
  const [error, setError] = useState({})
  // const [render, setRender] = useState(false)

  const { id } = useParams()
  console.log(props)
  const product = useSelector((store) => store.selectedProduct.product)
  const dispatch = useDispatch()
  useEffect(() => {
    getProductById(id).then((product) => {
      dispatch(setSelectedProduct(product))
    })
  }, [id])
  // useEffect(() => {
  //   getProductById(id).then((product) => {
  //     dispatch(setSelectedProduct(product))
  //   })

  //   return () => {
  //     dispatch(clearSelectedProduct())
  //   }
  // }, [id])
  // const callBackRender = () => {
  //   setRender((isRender) => !isRender)
  // }
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
        title: product.title,
        description: product.description,
      })
    }
  }
  const save = () => {
    if (error.description === false || error.title === false) {
      edit()
      // callBackRender()
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
            {/* <CartInProduct product={product} callBackRender={callBackRender} /> */}
            <button className="button" onClick={edit}>
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
