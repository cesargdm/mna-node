import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Watson from '../Watson'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      name: ''
    }

    this.onChange = this.onChange.bind(this)
    this.login = this.login.bind(this)
  }

  login(event) {
    event.preventDefault()

    const { name, email } = this.state

    if (name && email) {

      localStorage.setItem('email', email)
      localStorage.setItem('name', name)

      this.props.router.push('/')

    }

  }

  onChange(event) {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="login">
        <div className="intro">
          <h1>¿Quieres formar parte de la historia?</h1>
          <h1>Regístrate y empieza a entrenar a Watson</h1>
        </div>
        <form onSubmit={this.login}>
          <div id="ibm-inah"></div>
          <input
            name="name"
            value={this.state.name}
            placeholder="Nombre"
            type="text"
            onChange={this.onChange}
            required
          />
          <input
            name="email"
            value={this.state.email}
            placeholder="Correo electrónico"
            type="email"
            onChange={this.onChange}
            required
          />
          <input type="submit" value="Entrar" />
        </form>
      </div>
    )
  }
}

export default Login
