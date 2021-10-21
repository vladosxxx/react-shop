import { useEffect } from 'react'

const Product = (props) => {
  console.log(props)
  return (
    <div>
      <h2>{props.location.state.title}</h2>
      <img src="" alt="" />
      <p>{props.location.state.description}</p>
    </div>
  )
}

export default Product
