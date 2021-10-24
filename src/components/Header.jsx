import { NavLink } from 'react-router-dom'
import '../style/menu.css'

const Header = ({ isLogin, cart, toggleLogin }) => {
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
            <div className="cart">
              <img
                className="cart-icon"
                src="shopping-cart.png"
                alt="shopping cart"
              />
              <div className="cart-inside">
                <p>{cart.items} шт.</p>
                <p>{cart.price} UAH</p>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Header
