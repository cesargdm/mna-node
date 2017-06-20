export function resetChat() {
  return {
    type: 'RESET_CHAT'
  }
}

export function addMessage(message) {
  return {
    type: 'ADD_MESSAGE',
    message: {
      text: message.text,
      answer: message.answer
    }
  }
}
