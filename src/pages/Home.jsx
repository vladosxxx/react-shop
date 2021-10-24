import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cart from '../components/Cart'
import '../style/home.css'

const Home = (props) => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({ items: 0, price: 0 })
  const [render, setRender] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('http://localhost:3004/products')
          .then((res) => res.json())
          .then((data) => setProducts(data))
      } catch (error) {
        console.log('Error with server connections')
      }
    }
    fetchData()
  }, [render])
  useEffect(() => {
    const fetchCart = async () => {
      try {
        await fetch('http://localhost:3004/cart')
          .then((res) => res.json())
          .then((data) =>
            Object.keys(data).length === 0
              ? setCart({ items: 0, price: 0 })
              : setCart(data)
          )
          .then(() => props.showCart(cart))
      } catch (error) {
        console.log('Error with server connections')
      }
    }
    fetchCart()
  }, [])
  useEffect(() => {
    const fetchCart = async () => {
      try {
        await fetch('http://localhost:3004/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cart),
        }).then(() => props.showCart(cart))
      } catch (error) {
        console.log('Error with server connections')
      }
    }
    fetchCart()
  }, [render])
  const callBackRender = () => {
    setRender((isRender) => !isRender)
  }
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
                  <Cart
                    product={product}
                    callBackRender={callBackRender}
                    putIntoCart={putIntoCart}
                  />
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
