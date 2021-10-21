import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cart from '../components/Cart'

const Home = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [render, setRender] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3004/products')
        const json = await res.json()
        setProducts(json)
      } catch (error) {
        console.log('Error with server connections')
      }
    }
    fetchData()
    const fetchCart = async () => {
      try {
        const res = await fetch('http://localhost:3004/cart')
        const json = await res.json()
        setCart(json)
      } catch (error) {
        console.log('Error with server connections')
      }
    }
    fetchCart()
  }, [render])

  const callBackRender = () => {
    setRender((isRender) => !isRender)
  }

  return (
    <div>
      <h2>Home</h2>
      {products.map((product) => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
          <h3>{product.title}</h3>
          <img src={'./pictures/' + product.image} alt={product.title} />
          {product.inStock ? (
            <Cart
              product={product}
              cart={cart}
              callBackRender={callBackRender}
              render={render}
            />
          ) : (
            <h4>Not available</h4>
          )}
          <p>{product.price} UAH</p>
        </div>
      ))}
    </div>
  )
}

export default Home
