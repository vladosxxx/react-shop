import { GET_ALL_PRODUCTS_URL } from '../constants/productsURL'

export const getAllProducts = async () => {
  const response = await fetch(GET_ALL_PRODUCTS_URL, {
    method: 'GET',
  })

  return response.json()
}

export const getProductById = async (productId) => {
  const response = await fetch(`${GET_ALL_PRODUCTS_URL}/${productId}`, {
    method: 'GET',
  })

  return response.json()
}
