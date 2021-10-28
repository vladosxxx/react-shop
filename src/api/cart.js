import { GET_CART_URL } from '../constants/productsURL'

export const getCart = async () => {
  const response = await fetch(GET_CART_URL, {
    method: 'GET',
  })
  return response.json()
}

export const addToCart = async (content) => {
  const response = await fetch(GET_CART_URL, {
    method: 'PUT',
    body: JSON.stringify(content),
  })
  return response.json()
}
