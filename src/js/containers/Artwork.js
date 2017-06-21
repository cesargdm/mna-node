import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addMessage, resetChat } from '../actions'

import Watson from '../Watson'

class Artwork extends Component {
  constructor(props) {
    super(props)

    const piece_name = props.params.piece_name || null

    this.state = {
      piece: piece_name,
      selectedPiece: this.getSelectedPiece(piece_name),
      question: '',
      imageActive: false
    }

    this.questionChange = this.questionChange.bind(this)
    this.getSelectedPiece = this.getSelectedPiece.bind(this)
    this.postQuestion = this.postQuestion.bind(this)
  }

  getSelectedPiece(piece_name) {
    return this.props.pieces.filter(piece => piece.name === piece_name)[0]
  }

  componentWillReceiveProps(nextProps) {
    const nextArtwork = nextProps.params.piece_name

    if (nextArtwork != this.state.piece) {
      this.props.dispatch(resetChat())

      this.setState({
        piece: nextArtwork,
        selectedPiece: this.getSelectedPiece(nextArtwork)
      })
    }
  }

  postQuestion(event) {
    event.preventDefault()

    const question = this.state.question
    const workspace_id = this.state.selectedPiece.workspace_id

    this.props.dispatch(addMessage({ text: question }))
    this.setState({
      question: ''
    }, () => this.chat.scrollTop = this.chat.scrollHeight)

    Watson.ask(question, workspace_id)
    .then(response => {
      const answer = response.data.answer
      if (answer == '' || !answer) return // Don't add message if there's an empty message
      this.props.dispatch(addMessage({ text: answer, answer: true }))
      this.chat.scrollTop = this.chat.scrollHeight // Scroll to bottom on message add
    })
    .catch(error => {
      console.log(error)
    })

  }

  questionChange(event) {
    const { value, name } = event.target

    this.setState({
      [name]: value
    })
  }

  rateAnswer(answer_id, rate) {
    console.log(`Rated ${answer_id} with ${rate}`)
  }

  render() {
    return (
      <div className='dashboard'>
        <div
          className={`image ${this.state.imageActive ? 'active' : ''}`}
          style={{backgroundImage: `url(/static/img/pieces/${this.state.selectedPiece.name}.jpg)`}}
          onClick={() => this.setState({imageActive: !this.state.imageActive})}>
          <p>{this.state.selectedPiece.title}</p>
        </div>
        <div className='watson'>
          <div className='chat' ref={(div) => { this.chat = div }}>
            {
              this.props.chatHistory.map((element, index) =>
                <div
                  key={index}
                  onClick={() => {}}
                  className={element.answer ? 'answer' : 'question'}
                  >
                  { element.text }
                  {
                    element.answer ?
                    <div className='rater'>
                      <p>Califica esta respuesta</p>
                      <div className="rate-container">
                        <div className='good' onClick={() => this.rateAnswer(element.id, true)}></div>
                        <div className='bad' onClick={() => this.rateAnswer(element.id, false)}></div>
                      </div>
                    </div>
                    : null
                  }
                </div>
              )
            }
          </div>
          <div className='ask-container'>
            <form onSubmit={this.postQuestion}>
              <input
                type="text"
                name="question"
                placeholder={`¿Qué te gustaría saber sobre ${this.state.selectedPiece.title}?`}
                value={this.state.question}
                onChange={this.questionChange}
              />
              <input
                onClick={this.postQuestion}
                type="submit"
                value="Enviar"
                autoCorrect="off"
                autoComplete="off"
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ pieces, chatHistory }) => {
  return {
    pieces,
    chatHistory
  }
}

export default connect(mapStateToProps)(Artwork)
