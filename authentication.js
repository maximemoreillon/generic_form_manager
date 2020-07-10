const axios = require('axios')
const Cookies = require('cookies')
const dotenv = require('dotenv')

dotenv.config()


// secret set by the application
exports.authentication_api_url = process.env.AUTHENTICATION_API_URL
exports.authentication_api_endpoint = '/user_from_jwt'

let retrieve_jwt = (req, res) => {
  let jwt = undefined

  // See if jwt available from authorization header
  if(!jwt){
    if(('authorization' in req.headers)) {
      jwt = req.headers.authorization.split(" ")[1]
    }
  }

  // Try to get JWT from cookies
  if(!jwt) {
    var cookies = new Cookies(req, res)
    jwt = cookies.get('jwt')
  }

  if(!jwt) {
    jwt = req.query.token
      || req.query.jwt
      || req.body.token
      || req.body.jwt
  }

  return jwt
}

exports.authenticate = (req, res, next) => {

  // Retrieves user information using the JWT provided by the user
  // will NOT allow the user to proceed with the request if not authenticated

  // check if the API URL is defined
  // could just let the axios request fail
  if(!exports.authentication_api_url){
    console.error("Authentication API URL not set")
    return res.status(500).send('Authentication API URL not set in the server-side application')
  }

  // retrieve JWT
  let jwt = retrieve_jwt(req, res)

  // if no JWT available, reject request
  if(!jwt) {
    console.log('JWT not found in either cookies or authorization header')
    res.status(403).send('JWT not found in either cookies or authorization header')
    return
  }

  // Send the token to the authentication api for verification
  // IDEA: first request to AMS for content of JWT and second to UMMS for user information
  axios.get(
    `${exports.authentication_api_url}${exports.authentication_api_endpoint}`,
    {params: {jwt: jwt}}
  )
  .then(response => {

    // passing the user object to the route using res.locals
    res.locals.user = response.data

    // allow to request to proceed
    next()
  })
  .catch(error => {
    // In case the request fails, forward error message
    console.log(error)
    res.status(403).send(error)
    return
  })

}
