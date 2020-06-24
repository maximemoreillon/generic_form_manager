const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

const APP_PORT = process.env.APP_PORT || 80


const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/form', require('./routes/form.js'))

app.listen(APP_PORT, () => `Generic form manager listening on port ${APP_PORT}`)
