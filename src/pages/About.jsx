import { useEffect } from 'react'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return <h2>About</h2>
}

export default About
