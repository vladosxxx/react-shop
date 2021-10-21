// import { useEffect, useState } from 'react'

// const Cart = (props) => {
//   const [item, setItem] = useState(props.product)
//   useEffect(() => {
//     fetch('http://localhost:3004/products/' + item.id, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(item),
//     })
//     console.log('Успех:')
//   }, [item.inStock])
//   function AddToCart() {
//     setItem((prevState) => ({
//       ...prevState,
//       inStock: prevState.inStock > 0 ? prevState.inStock-- : 0,
//     }))
//   }
//   return (
//     <button
//       onClick={() => {
//         AddToCart()
//         props.callBack(true)
//       }}
//     >
//       Добавить в корзину
//     </button>
//   )
// }
// export default Cart
