const express = require('express')
const path = require('path')
const request = require('request')
const db = require('../../db/dbmanager')
const router = express.Router()

const WatsonServices = require('./WatsonServices')

router.route('/login')
.post((req, res) => {

  const { name, email } = req.body
  
  // BAD LOGIN
  var query = "SELECT * FROM users"
  db.open()
  .then((conn) => {
    console.log('CONN',conn)
    db.execute(conn, query)
    .then((data) => {
      res.json(data)
      db.close(conn)
    }, function(err){
      res.json(err)
      db.close(conn)
    })
  })

  // const query = "INSERT INTO "
  // db.open()
  // .then((conn) => {
  //   return db.execute(conn, query)
  // })
  // .then((data) => {
  //   console.log(data)
  //   res.json(data)
  //   db.close(conn)
  // })
  // .catch((error) => {
  //   console.log(error)
  //   res.json(error)
  //   db.close(conn)
  // })

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

router.route('/rate-answer')
.post((req, res) => {
  const { question, answer, rate, user } = req.body

  if (!user.email) {
    return res.status(400)
  }

  // TODO save all

})

router.route('/answer')
.post((req, res) => {

  const { question, conversation_id, workspace_id } = req.body
  const { user } = req.body

  if (user && user.email) {
    // TODO save question, workspace_id and answer to DB
    const date = new Date.now()
  }

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
