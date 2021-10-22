import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Cart from '../components/Cart'

const Product = (props) => {
  console.log(props)
  const [product, setProduct] = useState({})
  const [render, setRender] = useState(false)
  const { id } = useParams()
  useEffect(() => {
    fetch('http://localhost:3004/products/' + id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [render])
  const callBackRender = () => {
    setRender((isRender) => !isRender)
  }

  return (
    <div>
      <h1>Product</h1>
      <Cart
        product={product}
        callBackRender={callBackRender}
        putIntoCart={props.putIntoCart}
      />
      <h3>{props.isLogin ? 'LOGIN!!!!' : 'USER'}</h3>
      <h2>{product.title}</h2>
      <img src="" alt="" />
      <p>{product.description}</p>
    </div>
  )
}

export default Product
