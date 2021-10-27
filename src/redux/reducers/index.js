import { combineReducers } from 'redux'
import { productsReducer } from './productReducer'
import { cartReducer } from './cartReducer'
import selectedProductReducer from './selectedProductReducer'

const reducers = combineReducers({
  allProducts: productsReducer,
  cart: cartReducer,
  selectedProduct: selectedProductReducer,
})

export default reducers
