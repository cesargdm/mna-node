import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Nav from './components/Nav'

function App (props) {
  return (
    <div className='app'>
      <Nav />
      <div className='body'>
        { props.children }
      </div>
    </div>
  )
}

export default App
