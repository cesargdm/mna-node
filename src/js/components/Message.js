import React from 'react'

function Message(props) {
  return (
    <div className={props.element.answer ? 'answer' : 'question'} >
      { props.element.text }
      {
        props.element.answer ?
        <div className='rater'>
          <p>Califica esta respuesta</p>
          <div className="rate-container">
            <div className='good' onClick={() => props.onRate(props.element.text, true, props.index)}></div>
            <div className='bad' onClick={() => props.onRate(props.element.text, false, props.index)}></div>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default Message
