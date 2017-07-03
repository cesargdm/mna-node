import { combineReducers } from 'redux'

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function initialPieces () {
  return shuffleArray([
    {
      name: 'piedra-del-sol',
      title: 'Piedra del Sol',
      location: 'Sala Mexica',
      workspace_id: '99d3e78d-8e38-448a-903b-d887c5bf3dd3'
    },
    {
      name: 'coatlicue',
      title: 'Coatlicue',
      location: 'Sala Mexica',
      workspace_id: 'f46bba7b-6355-463a-aaa7-d51386612d50'
    },
    {
      name: 'penacho-de-moctezuma',
      title: 'Penacho de Moctezuma',
      location: 'Sala Mexica',
      workspace_id: 'e151b746-d91c-480c-8137-5cce7294201d'
    },
    {
      name: 'dintel-26',
      title: 'Dintel 26',
      location: 'Sala Maya',
      workspace_id: '1ea9af05-c530-4e56-8c54-eaf95fb13f91'
    },
    {
      name: 'tumba-de-pakal',
      title: 'Tumba de Pakal',
      location: 'Sala Maya',
      workspace_id: '536e6b75-98d7-41ae-bbad-4f1d776e56a6'
    },
    {
      name: 'chac-mool',
      title: 'Chac-Mool',
      location: 'Sala Maya',
      workspace_id: 'e1ea6765-3399-4367-85e6-47425605f8b6'
    },
    {
      name: 'mural-dualidad',
      title: 'Mural Dualidad',
      location: 'General',
      workspace_id: '215266ea-264a-46ba-8cb9-3b01177c4a56'
    },
    {
      name: 'coyolxauhqui',
      title: 'Coyolxauhqui',
      location: 'Sala Mexica',
      workspace_id: '6c1de7f2-109e-48d6-9418-db2b58b31bde'
    },
    {
      name: 'ocelocuauhxicalli',
      title: 'Ocelocuauhxicalli',
      location: 'Sala Mexica',
      workspace_id: '1e8f7277-c44c-4933-8ee7-bae318428a73'
    },
    {
      name: 'piedra-tizoc',
      title: 'Piedra de Tizoc',
      location: 'Sala Maya',
      workspace_id: 'e3fab98f-daaa-47d8-b4b4-dd65775f7f82'
    },
    {
      name: 'friso-estucado',
      title: 'Friso Estucado',
      location: 'Sala Mexica',
      workspace_id: 'e2b7f5ad-eb36-4e45-a824-70e1af62e8be'
    },
  ])
}

function pieces(state = initialPieces(), action) {
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
        workspace_id: action.message.workspace_id,
        unReviewable: action.message.unReviewable
      }]
    case 'REVIEW_ANSWER':
      let workSpaceChat = chat
      .filter(message => message.workspace_id == action.workspace_id)
      .map((message, index) => index == action.index ?  Object.assign({}, message, { reviewed: true }) : message )

      let filteredChat = chat.filter(message => message.workspace_id !== action.workspace_id)

      return [
        ...filteredChat,
        ...workSpaceChat
      ]

    default:
      return chat
  }
}

const appReducer = combineReducers({
  pieces,
  chatHistory
})

export default appReducer
