const express = require('express')
const path = require('path')
const request = require('request')
const router = express.Router()

const WatsonServices = require('./WatsonServices')

router.route('/text_to_speech')
.get((req, res) => {
  WatsonServices.textToSpeech("Haz creado una peticion GET, mas texto para que sea mas grande")
  .on('response', (response) => {
    console.log(response.statusCode)
  })
  .on('error', (error) => {
    console.log(error)
  })
  .pipe(res)
})
.post((req, res) => {
  const text = req.body.text

  WatsonServices.textToSpeech(text)
  .on('response', (response) => {
    console.log(response.statusCode)
  })
  .on('error', (error) => {
    console.log(error)
  })
  .pipe(res)

})

module.exports = router
