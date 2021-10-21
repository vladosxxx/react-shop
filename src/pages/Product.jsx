import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

const Product = () => {
  const [product, setProduct] = useState({})
  const { id } = useParams()
  useEffect(() => {
    fetch('http://localhost:3004/products/' + id, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [])
  return (
    <div>
      <h1>Product</h1>
      <h2>{product.title}</h2>
      <img src="" alt="" />
      <p>{product.description}</p>
    </div>
  )
}

export default Product
