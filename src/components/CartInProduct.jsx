import React, { useEffect, useState } from 'react'

const CartInProduct = (props) => {
  const [quantity, setQuantity] = useState(0)
  const [cart, setCart] = useState({})
  const [renderCart, setRenderCart] = useState(false)

  const cartRender = () => {
    setRenderCart((renderCart) => !renderCart)
  }
  const addToCart = (e) => {
    e.preventDefault()
    cartRender()
    if (quantity <= props.product.inStock) {
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
