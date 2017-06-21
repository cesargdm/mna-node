import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import appReducer from './reducers'
const store = createStore(appReducer)

import App from './App'
import Login from './containers/Login'
import Artwork from './containers/Artwork'

function isLoggedIn() {
  const email = localStorage.getItem('email')
  if (!email) {
    return false
  }
  return true
}

const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({
      pathname: '/login'
    })
  }
}


function Select(props) {
  return (
    <div className='select'>Selecciona una pieza</div>
  )
}

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/login" component={Login} />
      <Route path="/" component={App} onEnter={requireAuth}>
        <IndexRoute component={Select} />
        <Route path=":piece_name" component={Artwork} />
      </Route>
    </Router>
  </Provider>
)

export default Routes
