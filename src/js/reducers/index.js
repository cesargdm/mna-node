import { combineReducers } from 'redux'

const initialPieces = [
  {
    name: 'piedra-del-sol',
    title: 'Piedra del Sol',
    location: 'Sala Mexica',
    workspace_id: '3a64558c-6b92-429a-88c6-97ddb5717a34'
  },
  {
    name: 'coatlicue',
    title: 'Coatlicue',
    location: 'Sala Mexica',
    workspace_id: '079540b1-6c6c-499e-b9bd-9650d5e6c33c'
  },
  {
    name: 'penacho-de-moctezuma',
    title: 'Penacho de Moctezuma',
    location: 'Sala Mexica',
    workspace_id: '14b361e3-5852-49f7-96a0-5b40c4ecd476'
  },
  {
    name: 'dintel-26',
    title: 'Dintel 26',
    location: 'Sala Maya',
    workspace_id: 'f76b61b0-9158-45d8-a936-a8cfbcda3be9'
  },
  {
    name: 'tumba-de-pakal',
    title: 'Tumba de Pakal',
    location: 'Sala Maya',
    workspace_id: '4b3d7feb-5f85-4ee2-94e8-0a4193a6163f'
  },
  {
    name: 'chac-mool',
    title: 'Chac-Mool',
    location: 'Sala Maya',
    workspace_id: '5a4dc283-6483-4a8d-b1cb-c9df50e3d49d'
  },
  {
    name: 'mural-dualidad',
    title: 'Mural Dualidad',
    location: 'General',
    workspace_id: '6670d9ff-1ec4-4751-9971-27e45f6912b4'
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
