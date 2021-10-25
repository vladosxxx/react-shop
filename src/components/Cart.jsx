import React, { useEffect, useState } from 'react'

const Cart = (props) => {
  const [item, setItem] = useState(props.product)

  const addToCart = () => {
    setItem((prevState) => ({
      ...prevState,
      inStock: prevState.inStock > 0 ? prevState.inStock - 1 : 0,
    }))

    props.putIntoCart(item.price)
  }
  return (
    <button className="button" onClick={addToCart}>
      Добавить в корзину
    </button>
  )
}
export default Cart
