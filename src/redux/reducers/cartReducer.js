import { ActionTypes } from '../../constants/actionTypes'

const initialState = {
  cart: {
    products: [],
  },
}

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CART:
      return {
        cart: payload,
      }
    default:
      return state
  }
}
