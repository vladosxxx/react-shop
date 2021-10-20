import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <h2>Home</h2>
}

export default Home
