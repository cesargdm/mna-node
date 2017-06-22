import { combineReducers } from 'redux'

const initialPieces = [
  {
    name: 'piedra-del-sol',
    title: 'Piedra del Sol',
    location: 'Sala Mexica',
    workspace_id: ''
  },
  {
    name: 'coatlicue',
    title: 'Coatlicue',
    location: 'Sala Mexica',
    workspace_id: ''
  },
  {
    name: 'penacho-de-moctezuma',
    title: 'Penacho de Moctezuma',
    location: 'Sala Mexica',
    workspace_id: ''
  },
  {
    name: 'dintel-26',
    title: 'Dintel 26',
    location: 'Sala Maya',
    workspace_id: '91520396-535c-409c-b1a7-60e2724ec8ba'
  },
  {
    name: 'tumba-de-pakal',
    title: 'Tumba de Pakal',
    location: 'Sala Maya',
    workspace_id: '976dbd0a-20eb-4898-94e0-3c3a6dc6526f'
  },
  {
    name: 'chac-mool',
    title: 'Chac-Mool',
    location: 'Sala Maya',
    workspace_id: '4f9a0e7d-41c1-4505-846e-3998418a4e10'
  },
  {
    name: 'mural-dualidad',
    title: 'Mural Dualidad',
    location: 'General',
    workspace_id: '2bf70448-d22c-4f7f-b220-d3f2fe25249b'
  }
]

function pieces(state = initialPieces, action) {
  switch (action.type) {
    default:
      return state
  }
}

function chatHistory(chat = [], action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [...chat, {
        text: action.message.text,
        answer: action.message.answer,
        workspace_id: action.message.workspace_id
      }]
    default:
      return chat
  }
}

const appReducer = combineReducers({
  pieces,
  chatHistory
})

export default appReducer
