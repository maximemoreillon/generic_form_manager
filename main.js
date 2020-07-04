const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

dotenv.config()

const APP_PORT = process.env.APP_PORT || 80


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(`Generic form manager API, Maxime MOREILLON`)
})

app.use('/forms', require('./routes/forms.js'))
app.use('/forms/:form_id/responses', require('./routes/responses.js'))

app.listen(APP_PORT, () => {console.log(`Generic form manager listening on port ${APP_PORT}`)})
