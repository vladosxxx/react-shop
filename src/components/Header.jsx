import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../style/menu.css'

const Header = ({ isLogin, toggleLogin, toggleCart }) => {
  return (
    <div>
      <ul className="nav">
        <li>
          <NavLink activeClassName="link--active" to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="link--active" to="/about">
            About
          </NavLink>
        </li>
        <li className="menu-right">
          <a onClick={toggleLogin}>{isLogin ? 'Logout' : 'Login'}</a>
        </li>
        {isLogin && (
          <li className="menu-right">
            <a onClick={toggleCart} className="cart">
              <img
                className="cart-icon"
                src="shopping-cart.png"
                alt="shopping cart"
              />
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Header
