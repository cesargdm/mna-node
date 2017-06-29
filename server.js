const express = require('express')
const fs = require('fs')
const app = express()
const compression = require('compression')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')

const API_V1 = require(path.resolve('routers/v1/api.js'))

const PORT = process.env.PORT || 8080

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(compression({ filter: (req, res) => req.headers['x-no-compression'] ? false : compression.filter(req, res) }))

app.use('/static', express.static(path.resolve('static'), {
  maxAge: 1209600000
}))

app.use('/manifest.json', express.static(path.resolve('manifest.json'), {
  maxAge: 86400000
}))

app.use('/dist', express.static(path.resolve('dist'), {
  // maxAge: 86400000
}))

app.use('/v1', API_V1)

app.use('*', (req, res) => {
    res.sendFile(path.resolve('src/index.html'))
})

app.listen(8080, () => {
  console.log('App listening on 8080')
})
