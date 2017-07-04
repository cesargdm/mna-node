import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Message from '../components/Message'
import { connect } from 'react-redux'
import { addMessage, reviewAnswer } from '../actions'

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
    this.rateAnswer = this.rateAnswer.bind(this)
  }

  getSelectedPiece(piece_name) {
    if (!this.state) {
      const workspace_id = this.props.pieces.filter(piece => piece.name === piece_name)[0].workspace_id
      setTimeout(() => {
        this.props.dispatch(addMessage({
          text: 'A poco más de medio siglo de creación, el Museo Nacional de Antropología es reconocido como uno de los recintos más emblemáticos para la salvaguarda del legado indígena de México. Durante este recorrido podré auxiliarte con información acerca de: Mural de Rufino Tamayo, Piedra del Sol, Coatlicue, Penacho de Moctezuma, Dintel 26, Tumba de Pakal y Chac Mool',
          unReviewable: true,
          answer: true,
          workspace_id
        }))
      }, 1000)

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
    const email = localStorage.getItem('email')

    this.props.dispatch(addMessage({ text: question, answer: false, workspace_id: this.state.selectedPiece.workspace_id }))
    this.setState({
      question: ''
    }, () => window.scrollTo(0,document.body.scrollHeight))

    Watson.ask(question, workspace_id, email)
    .then(response => {
      const answer = response.data.answer
      if (answer == '' || !answer) return // Don't add message if there's an empty message
      this.props.dispatch(addMessage({ text: answer, answer: true, workspace_id: this.state.selectedPiece.workspace_id }))
      window.scrollTo(0,document.body.scrollHeight)
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

  rateAnswer(answer, rate, index) {
    const filteredMessages = this.props.chatHistory.filter(message => message.workspace_id == this.state.selectedPiece.workspace_id)

    const email = localStorage.getItem('email')
    const question = filteredMessages[index-1].text
    const workspace_id = this.state.selectedPiece.workspace_id

    Watson.rate(email, question, answer, rate, workspace_id)
    .then(response => {
      this.props.dispatch(reviewAnswer(index, workspace_id))
    })
    .catch(error => {
      alert('Inténtalo de nuevo más tarde')
    })

  }

  render() {
    const filteredMessages = this.props.chatHistory.filter(message => message.workspace_id == this.state.selectedPiece.workspace_id)

    return (
      <div className='dashboard' ref={(div) => { this.dashboard = div }}>
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
                  index={index}
                  onRate={this.rateAnswer}
                  key={index}
                  element={element}
                  reviewed={element.reviewed}
                  unReviewable={element.unReviewable}
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
