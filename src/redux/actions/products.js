import { ActionTypes } from '../../constants/actionTypes'

export const setAllProducts = (productsData) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: productsData,
  }
}

export const setSelectedProduct = (productData) => {
  return {
    type: ActionTypes.SET_SELECTED_PRODUCT,
    payload: productData,
  }
}

export const clearSelectedProduct = () => {
  return {
    type: ActionTypes.CLEAR_SELECTED_PRODUCT,
  }
}
