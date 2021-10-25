import { ActionTypes } from '../../constants/actionTypes'

const initialState = {
  product: {},
}

const selectedProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_SELECTED_PRODUCT:
      return {
        product: payload,
      }
    case ActionTypes.CLEAR_SELECTED_PRODUCT:
      return initialState
    default:
      return state
  }
}

export default selectedProductReducer
