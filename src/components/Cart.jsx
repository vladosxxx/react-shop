import { useEffect, useState } from 'react'

const Cart = (props) => {
  const [item, setItem] = useState(props.product)
  const [cart, setCart] = useState(props.cart)

  useEffect(() => {
    const putData = async () => {
      try {
        await fetch('http://localhost:3004/products/' + item.id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        })
      } catch (error) {
        console.log('Error with server connections')
      }
    }
    putData()
    const putCart = async () => {
      try {
        await fetch('http://localhost:3004/cart/', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cart),
        })
      } catch (error) {
        console.log('Error with server connections')
      }
    }
    putCart()
  }, [item])

  function AddToCart() {
    setItem((prevState) => ({
      ...prevState,
      inStock: prevState.inStock > 0 ? prevState.inStock - 1 : 0,
    }))
    setCart({
      items: props.cart.items + 1,
      price: props.cart.price + item.price,
    })
  }
  console.log(cart)
  return (
    <button
      onClick={() => {
        AddToCart()
        props.callBackRender()
      }}
    >
      Добавить в корзину
    </button>
  )
}
export default Cart
