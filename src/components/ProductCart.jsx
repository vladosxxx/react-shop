import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../api/product'
import {
  setSelectedProduct,
  clearSelectedProduct,
} from '../redux/actions/products'

const ProductCart = ({ id }) => {
  const product = useSelector((store) => store.selectedProduct.product)
  const dispatch = useDispatch()
  useEffect(() => {
    getProductById(id).then((product) => {
      dispatch(setSelectedProduct(product))
    })
  }, [id])
  return (
    <div>
      <h1>{product.title}</h1>
    </div>
  )
}
export default ProductCart
