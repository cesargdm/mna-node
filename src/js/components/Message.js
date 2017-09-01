import React from 'react'

function Message(props) {
  return (
    <div className={props.element.answer ? 'answer' : 'question'} >
      { props.element.text }
      { props.unReviewable}
      {
        (props.element.answer && !props.unReviewable) ?
        <div className='rater'>
          <p>¿Te satisface la respuesta?</p>

          {
            props.reviewed
            ? <span><strong>Gracias por tu ayuda</strong></span>
            : <div className="rate-container">
                <div className='good' onClick={() => props.onRate(props.element.text, true, props.index)}></div>
                <div className='bad' onClick={() => props.onRate(props.element.text, false, props.index)}></div>
              </div>
          }

        </div>
        : null
      }
    </div>
  )
}

export default Message
