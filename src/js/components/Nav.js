import React from 'react'
import { Link } from 'react-router'

import { connect } from 'react-redux'

function Nav(props) {
  return (
    <div className='nav'>
      {
        props.pieces.map(artwork =>
          <Link to={`/${artwork.name}`} key={artwork.name} activeClassName="active">
            <div className='thumb-nail'>
              <div className='image' style={{backgroundImage: `url(/static/img/pieces/${artwork.name}.jpg)`}}></div>
              <span>{artwork.title}</span>
            </div>
          </Link>
        )
      }
    </div>
  )
}

const mapStateToProps = ({ pieces }) => {
  return {
    pieces
  }
}


export default connect(mapStateToProps)(Nav)
