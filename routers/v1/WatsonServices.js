const express = require('express')
const request = require('request')
const requestPromise = require('request-promise')
const fs = require('fs')

const config = require('../../config/config')

const FORMAT = 'wav'
const VOICE = 'es-LA_SofiaVoice'

const TALK_ENDPOINT = `https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?voice=${VOICE}`
const ASK_ENDPOINT = 'https://'

class WatsonServices {

  static talk(text = "Este es un texto de prueba") {

    const options = {
      url: TALK_ENDPOINT,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': `audio/${FORMAT}`
      },
      auth: {
        user: config.talk.user,
        pass: config.talk.pass
      },
      json: { text }
    }

    return request(options)

  }

  static answer(question = '¿Esto es una pregunta de prueba?', conversation_id = null, workspace_id) {

    const options = {
      url: `https://gateway.watsonplatform.net/conversation/api/v1/workspaces/${workspace_id}/message?version=2017-05-26`,
      method: 'POST',
      auth: {
        user: config.answer.user,
        pass: config.answer.pass
      },
      json: {
        input: {
          text: question,
          // context: {
          //   conversation_id,
          // }
        }
      }
    }

    return requestPromise(options)

  }
}

module.exports = WatsonServices
