const express = require('express')
const path = require('path')
const request = require('request')
const db = require('../../db/dbmanager')
const router = express.Router()

const WatsonServices = require('./WatsonServices')

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
    return res.status(500).json({ error })
  })
  .pipe(res)
})

router.route('/rate-answer')
.post((req, res) => {
  const { email, question, answer, rate, workspace_id } = req.body

  if (!email) {
    return res.status(400)
  }

  if (email) {
    const now = new Date()

    var month = `${now.getUTCMonth()}`
    month.split('').length < 2 ? month = `0${month}` : null

    var seconds = `${now.getUTCSeconds()}`
    seconds.split('').length < 2 ? seconds = `0${seconds}` : null

    var minutes = `${now.getUTCMinutes()}`
    minutes.split('').length < 2 ? minutes = `0${minutes}` : null

    var hour = `${now.getUTCHours()}`
    hour.split('').length < 2 ? hour = `0${hour}` : null

    var day = `${now.getUTCDate()}`
    day.split('').length < 2 ? day = `0${day}` : null

    const date = `${now.getUTCFullYear()}-${month}-${day} ${hour}:${minutes}:${seconds}`

    answer.split('\'').join('`')

    const query = `INSERT INTO FEEDBACK(USERNAME, QUESTION, ANSWER, FEEDBACK, DATE_TIME, WORKSPACE_ID) values ('${email}','${question}','${answer}',${rate},'${date}', '${workspace_id}')`

    console.log('\nQUERY:', query)

    db.open()
    .then((conn) => {
      return db.execute(conn, query)
    })
    .then((conn, data) => {
      console.log('CONN AND DATA')
      console.log(conn, data)
      res.status(201).json({ message: 'Thanks for your feedback', data })
      db.close(conn)
    })
    .catch((error) => {
      console.log('ERROR', error)
      res.status(500).json({error})
      db.close(conn)
    })

  }

})

router.route('/answer')
.post((req, res) => {

  const { question, conversation_id, workspace_id } = req.body
  const { user } = req.body

  WatsonServices.answer(question, conversation_id, workspace_id)
  .then(response => {
    const answer = response.output.text[0]
    console.log(response)
    const conversation_id = response.context.conversation_id

    return res.status(200).json({ answer, conversation_id })
  })
  .catch(error => {
    console.log(error)
    return res.status(500).json({ error: error.body })
  })

})


module.exports = router
