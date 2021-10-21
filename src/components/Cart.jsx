import { useEffect, useState } from 'react'

const Cart = (props) => {
  const [item, setItem] = useState(props.product)

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
  }, [item])

  const addToCart = () => {
    setItem((prevState) => ({
      ...prevState,
      inStock: prevState.inStock > 0 ? prevState.inStock - 1 : 0,
    }))
    props.putIntoCart(item.price)
    props.callBackRender()
  }
  return <button onClick={addToCart}>Добавить в корзину</button>
}
export default Cart
