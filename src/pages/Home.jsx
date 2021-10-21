import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    window.scrollTo(0, 0)
    const url = 'http://localhost:3004/products'
    const fetchData = async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setProducts(json)
      } catch (error) {
        console.log('Error with server connections')
      }
    }

    fetchData()
  }, [])
  function AddToCart(product) {
    if (product.inStock !== 0) {
      let changeStock = products.map((el) =>
        el.id === product.id ? { ...el, inStock: product.inStock - 1 } : el
      )
      setProducts(changeStock)
      fetch('http://localhost:3004/products/' + product.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          inStock: product.inStock - 1,
        }),
      })
    }
  }
  return (
    <div>
      <h2>Home</h2>
      {products.map((product) => (
        <div key={product.id}>
          <Link
            to={{
              pathname: `src/product/${product.id}`,
              state: product,
            }}
            state={product}
          >
            {product.title}
          </Link>
          <h3>{product.title}</h3>
          <img src={'./pictures/' + product.image} alt={product.title} />
          {product.inStock ? (
            <button
              onClick={() => {
                AddToCart(product)
              }}
            >
              Добавить в корзину
            </button>
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
