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
            <div className='good' onClick={() => this.rateAnswer(props.element.text, true)}></div>
            <div className='bad' onClick={() => this.rateAnswer(props.element.text, false)}></div>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default Message
