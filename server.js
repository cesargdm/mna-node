const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')

const API_V1 = require(path.resolve('routers/v1/api.js'))

const PORT = process.env.PORT || 8080

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/v1', API_V1)

app.listen(8080, () => {
  console.log('App listening on 8080')
})
