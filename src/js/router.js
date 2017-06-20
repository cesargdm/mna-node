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

const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path=":piece_name" component={Artwork}/>
      </Route>
    </Router>
  </Provider>
)

export default Routes
