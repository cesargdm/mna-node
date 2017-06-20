import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import appReducer from './reducers'
const store = createStore(appReducer)

import App from './App'
import Artwork from './containers/Artwork'

const requireAuth = (nextState, replace) => {
  if (!isAuthenticated()) {
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
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
      <Route path="/" component={App}>
        <IndexRoute component={Select}/>
        <Route path=":piece_name" component={Artwork}/>
      </Route>
    </Router>
  </Provider>
)

export default Routes
