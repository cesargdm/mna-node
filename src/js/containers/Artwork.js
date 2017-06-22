import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from '../components/Message'
import { connect } from 'react-redux'
import { addMessage } from '../actions'

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
    if (!this.state) {
      const workspace_id = this.props.pieces.filter(piece => piece.name === piece_name)[0].workspace_id
      this.props.dispatch(addMessage({
        text: 'A poco más de medio siglo de creación, el Museo Nacional de Antropología es reconocido como uno de los recintos más emblemáticos para la salvaguarda del legado indígena de México. Durante este recorrido podré auxiliarte con información acerca de: Mural de Rufino Tamayo, Piedra del Sol, Coatlicue, Penacho de Moctezuma, Dintel 26, Tumba de Pakal y Chac Mool',
        answer: true,
        workspace_id
      }))
    }
    return this.props.pieces.filter(piece => piece.name === piece_name)[0]
  }

  componentWillReceiveProps(nextProps) {
    const nextArtwork = nextProps.params.piece_name

    if (nextArtwork != this.state.piece) {
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

    this.props.dispatch(addMessage({ text: question, answer: false, workspace_id: this.state.selectedPiece.workspace_id }))
    this.setState({
      question: ''
    }, () => this.chat.scrollTop = this.chat.scrollHeight)

    Watson.ask(question, workspace_id)
    .then(response => {
      const answer = response.data.answer
      if (answer == '' || !answer) return // Don't add message if there's an empty message
      this.props.dispatch(addMessage({ text: answer, answer: true, workspace_id: this.state.selectedPiece.workspace_id }))
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

    const filteredMessages = this.props.chatHistory.filter(message => message.workspace_id == this.state.selectedPiece.workspace_id)

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
              filteredMessages.map((element, index) =>
                <Message
                  key={index}
                  element={element}
                />
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
