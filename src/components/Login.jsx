import React from 'react'

const Login = (props) => {
  function errorShow() {
    if (props.login.name === false && props.login.pass === false) {
      return (
        <span className="error">введенный пароль и логин недействительные</span>
      )
    } else if (props.login.name === false) {
      return <span className="error">введенный логин недействителен</span>
    } else if (props.login.pass === false) {
      return <span className="error">введенный пароль недействителен</span>
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          name="userName"
          placeholder="Username"
          onChange={props.handler}
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          onChange={props.handler}
        />
        {errorShow()}
        <input
          type="submit"
          name="login"
          className="login loginmodal-submit"
          value="Login"
        />
      </form>
    </>
  )
}
export default Login
