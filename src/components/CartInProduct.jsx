import { useEffect, useState } from 'react'

const CartInProduct = (props) => {
  const [quantity, setQuantity] = useState(0)
  const [cart, setCart] = useState({})
  const [renderCart, setRenderCart] = useState(false)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        await fetch('http://localhost:3004/cart')
          .then((res) => res.json())
          .then((data) => setCart(data))
      } catch (error) {
        console.log('Error with server connections')
      }
    }
    fetchCart()
  }, [renderCart])
  const cartRender = () => {
    setRenderCart((renderCart) => !renderCart)
  }
  const addToCart = (e) => {
    e.preventDefault()
    cartRender()
    if (quantity <= props.product.inStock) {
      fetch('http://localhost:3004/products/' + props.product.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: props.product.id,
          title: props.product.title,
          description: props.product.description,
          image: props.product.image,
          price: props.product.price,
          inStock: props.product.inStock - quantity,
        }),
      })
        .then(() =>
          fetch('http://localhost:3004/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              items: cart.items + quantity,
              price: cart.price + props.product.price * quantity,
            }),
          })
        )
        .then(() => props.callBackRender())
    }
  }
  const handlerQuantity = (e) => {
    setQuantity(Math.floor(e.target.value))
  }
  return (
    <>
      <form onSubmit={addToCart} className="form-product">
        <input type="number" onChange={handlerQuantity} />
        <button className="button" type="submit">
          Добавить в корзину
        </button>
        <span></span>
      </form>
    </>
  )
}
export default CartInProduct
