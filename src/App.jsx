import './App.css'
import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Header from './components/Header'
import Product from './pages/Product'
import Modal from './components/Modal'
import Login from './components/Login'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState({})
  const [login, setLogin] = useState({})

  const toggleLogin = () => {
    isLogin ? setIsLogin(false) : setOpen((prevState) => !prevState)
  }
  const showCart = (dataCart) => {
    setCart(dataCart)
  }
  const handlerOnChange = ({ target: { name, value } }) => {
    setLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setLogin((prevState) => ({
      ...prevState,
      name: login.userName === 'admin' ? true : false,
      pass: login.Password === 'admin' ? true : false,
    }))
    if (login.userName === 'admin' && login.Password === 'admin') {
      setIsLogin(true)
      setOpen(false)
    }
  }
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Header cart={cart} isLogin={isLogin} />
          <div>
            <button onClick={toggleLogin}>
              {isLogin ? 'Logout' : 'Login'}
            </button>
          </div>
          <Switch>
            <Route path="/about" component={About} />
            {/* <Route path="/profile">
            {isLogin ? <Profile /> : <Redirect to="/" />} */}
            {/*<Profile isLogin={isLogin} />*/}
            {/* </Route> */}
            <Route path="/product/:id" component={Product} />
            <Route
              path="/"
              render={() => <Home showCart={showCart} isLogin={isLogin} />}
            />
            {/* <Route component={NotFoundPage} /> */}
          </Switch>
        </div>
      </BrowserRouter>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Login
          handler={handlerOnChange}
          handleSubmit={handleSubmit}
          login={login}
        />
      </Modal>
    </>
  )
}

export default App
