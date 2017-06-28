export function resetChat() {
  return {
    type: 'RESET_CHAT'
  }
}

export function reviewAnswer(index, workspace_id) {
  return {
    type: 'REVIEW_ANSWER',
    index,
    workspace_id
  }
}


export function addMessage(message) {
  return {
    type: 'ADD_MESSAGE',
    message: {
      unReviewable: message.unReviewable || false,
      text: message.text,
      answer: message.answer,
      workspace_id: message.workspace_id
    }
  }
}
