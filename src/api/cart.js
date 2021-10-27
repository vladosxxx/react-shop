import { GET_CART_URL } from '../constants/productsURL'

export const getCart = async () => {
  const response = await fetch(GET_CART_URL, {
    method: 'GET',
  })
  console.log('json', response)
  return response.json()
}
