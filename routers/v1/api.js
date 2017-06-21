const express = require('express')
const path = require('path')
const request = require('request')
const router = express.Router()

const WatsonServices = require('./WatsonServices')

router.route('/login')
.post((req, res) => {

  

})

router.route('/talk-answer')
.post((req, res) => {

  const { question, conversation_id, workspace_id } = req.body

  WatsonServices.answer(question, conversation_id, workspace_id)
  .then(response => {
    const answer = response.output.text[0]
    const conversation_id = response.context.conversation_id

    WatsonServices.talk(answer)
    .on('response', (response) => {
      console.log('RESPONSE')
    })
    .on('error', (error) => {
      console.log('ERROR')
      return res.status(500).json({ error })
    })
    .on('end', () => {
      console.log('END')
    })
    .pipe(res)

  })
  .catch(error => {
    // TODO save error
    return res.status(500).json({ error })
  })

})

router.route('/talk')
.post((req, res) => {
  const text = req.body.text

  WatsonServices.talk(text)
  .on('response', (response) => {
    console.log('RESPONSE')
  })
  .on('error', (error) => {
    console.log('ERROR')
    return res.status(500).json({ error })
  })
  .pipe(res)

})

router.route('/answer')
.post((req, res) => {

  const { question, conversation_id, workspace_id } = req.body

  WatsonServices.answer(question, conversation_id, workspace_id)
  .then(response => {
    const answer = response.output.text[0]
    const conversation_id = response.context.conversation_id

    return res.status(200).json({ answer, conversation_id })
  })
  .catch(error => {
    console.log(error.body)
    return res.status(500).json({ error: error.body })
  })

})


module.exports = router
