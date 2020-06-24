const collection_name = 'responses'

exports.get_response = (req, res) => {
  res.send('Not implemented yet')
}

exports.create_response = (req, res) => {
  console.log(`Form ID: ${res.locals.form_id}`)
  console.log(req.body)
  res.send({
    form_id: res.locals.form_id,
    response_body: req.body
  })
}

exports.delete_response = (req, res) => {
  res.send('Not implemented yet')
}

exports.update_response = (req, res) => {
  res.send('Not implemented yet')
}
