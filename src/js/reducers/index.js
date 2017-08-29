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
  return [
    {
      name: 'friso-estucado',
      title: 'Friso Estucado',
      location: 'Sala Mexica',
      workspace_id: '36b526c1-e082-4805-9987-2adfaa82c81c'
    },
    {
      name: 'piedra-tizoc',
      title: 'Piedra de Tizoc',
      location: 'Sala Maya',
      workspace_id: 'a8be1ed9-06ce-4f83-a3b3-caa844c8652a'
    },
    {
      name: 'ocelocuauhxicalli',
      title: 'Ocelocuauhxicalli',
      location: 'Sala Mexica',
      workspace_id: 'd70bc353-b5dd-442c-9fdf-bd29348cea31'
    },
    {
      name: 'coyolxauhqui',
      title: 'Coyolxauhqui',
      location: 'Sala Mexica',
      workspace_id: 'f9ef9583-9983-4565-9ba3-c049728831a6'
    },
    {
      name: 'dintel-26',
      title: 'Dintel 26',
      location: 'Sala Maya',
      workspace_id: '0af5181c-cee1-4aa1-9a9d-8afa70f69290'
    },
    {
      name: 'tumba-de-pakal',
      title: 'Tumba de Pakal',
      location: 'Sala Maya',
      workspace_id: 'b4e9b2df-1073-44b7-a9f8-9dbe1117588e'
    },
    {
      name: 'mural-dualidad',
      title: 'Mural Dualidad',
      location: 'General',
      workspace_id: '348f53b4-2538-4281-ae19-d98e6393ab14'
    },
    {
      name: 'chac-mool',
      title: 'Chac-Mool',
      location: 'Sala Maya',
      workspace_id: '7547a3e5-c402-45a3-abd2-e75c6c8295a5'
    },
    {
      name: 'piedra-del-sol',
      title: 'Piedra del Sol',
      location: 'Sala Mexica',
      workspace_id: '073ea817-fbef-4051-8f3e-5c4a164a3850'
    },
    {
      name: 'coatlicue',
      title: 'Coatlicue',
      location: 'Sala Mexica',
      workspace_id: '43c62df1-4638-4583-b429-83391dd5b703'
    },
    {
      name: 'penacho-de-moctezuma',
      title: 'Penacho de Moctezuma',
      location: 'Sala Mexica',
      workspace_id: 'dcc9709b-8188-4917-bab2-6d11d1f748ed'
    }
  ]
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
