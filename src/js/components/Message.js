import React from 'react'

function Message(props) {
  return (
    <div className={props.element.answer ? 'answer' : 'question'} >
      { props.element.text }
      { props.unReviewable}
    </div>
  )
}

export default Message
