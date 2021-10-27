import { ActionTypes } from '../../constants/actionTypes'

export const setCart = (cartData) => {
  return {
    type: ActionTypes.SET_CART,
    payload: cartData,
  }
}
