import { ActionTypes } from '../../constants/actionTypes'
import { getAllProducts, getProductById } from '../../api/products'

export const setAllProducts = () => (dispatch, state) => {
  getAllProducts().then((products) => {
    dispatch({
      type: ActionTypes.SET_PRODUCTS,
      payload: products,
    })

    console.log(state())
  })
}

export const setSelectedProduct = (productId) => (dispatch) => {
  return getProductById(productId).then((product) => {
    dispatch({
      type: ActionTypes.SET_SELECTED_PRODUCT,
      payload: product,
    })
  })
}

export const clearSelectedProduct = () => (dispatch) => {
  dispatch({
    type: ActionTypes.CLEAR_SELECTED_PRODUCT,
  })
}
