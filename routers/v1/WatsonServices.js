const express = require('express')
const request = require('request')
const fs = require('fs')

const USERNAME = 'ce8d54c2-cd46-4f8d-87b9-293409dc75c9'
const PASSWORD = 'Cqdfyo78tpR8'
const FORMAT = 'wav'
const VOICE = 'es-LA_SofiaVoice'

class WatsonServices {
  static textToSpeech(text = "Este es un texto de prueba") {

    const options = {
      url: `https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?voice=${VOICE}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': `audio/${FORMAT}`
      },
      auth: {
        user: USERNAME,
        pass: PASSWORD
      },
      json: { text }
    }

    return request(options)

  }
}

module.exports = WatsonServices
