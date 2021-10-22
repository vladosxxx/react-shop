import { NavLink } from 'react-router-dom'

const Header = ({ isLogin, cart }) => {
  //   const history = useHistory()

  //   const handleGoToPostN = (n) => {
  //     history.push(`/post/${n}`, { text: 'Hello from Router State' })
  //   }

  return (
    <div>
      <h1>React Router DOM Tutorial</h1>
      {/* <button onClick={() => handleGoToPostN(3)}>Go to post 3</button> */}
      <ul className="nav">
        <li>
          {/*<a href="/">Home</a>*/}
          {/*<Link to="/">Home</Link>*/}
          <NavLink activeClassName="link--active" to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          {/*<a href="/about">About</a>*/}
          {/*<Link to="/about">About</Link>*/}
          <NavLink activeClassName="link--active" to="/about">
            About
          </NavLink>
        </li>

        {isLogin && (
          <li>
            <h3>{cart.items} шт.</h3>
            <p>{cart.price} UAH</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Header
