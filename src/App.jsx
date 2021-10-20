import './App.css'
import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'
import Header from './components/Header'

function App() {
  const [isLogin, setIsLogin] = useState(false)

  const toggleLogin = () => {
    setIsLogin((prevState) => !prevState)
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Header isLogin={isLogin} />
        <div>
          <button onClick={toggleLogin}>
            {isLogin ? 'Log out' : 'Log in'}
          </button>
        </div>
        <Switch>
          <Route path="/about" component={About} />
          {/* <Route path="/profile">
            {isLogin ? <Profile /> : <Redirect to="/" />} */}
          {/*<Profile isLogin={isLogin} />*/}
          {/* </Route> */}
          {/* <Route path="/post/:id" component={Post} /> */}
          <Route path="/" component={Home} exact />
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
