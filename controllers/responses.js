const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const db_name = 'generic_form_manager'

const mongodb_options = {
  useUnifiedTopology: true,
}


const collection_name = 'forms'

exports.get_all_responses = (req, res) => {

  let form_id = req.params.form_id
    || req.params.id
    || req.query.form_id
    || req.query.id

  MongoClient.connect(process.env.MONGODB_URL,mongodb_options, (err, db) => {
    if (err) return res.status(500).send('Error connecting to DB')

    let query = { _id: ObjectID(form_id) }

    db.db(db_name)
    .collection(collection_name)
    .findOne(query, (err, result) => {
      if (err) return res.status(500).send('Error querying DB')
      db.close()
      res.send(result.responses)
    })
  })

}

exports.get_single_response = (req, res) => {
  res.send('Not implemented yet')
}


exports.create_response = (req, res) => {

  let form_id = req.params.form_id
  if(!form_id) return res.status(400).send('Form ID not provided')

  MongoClient.connect(process.env.MONGODB_URL,mongodb_options, (err, db) => {
    if (err) return res.status(500).send('Error connecting to DB')

    let query = { _id: ObjectID(form_id) }
    let action = {$push: {responses: req.body}}


    db.db(db_name)
    .collection(collection_name)
    .updateOne(query, action, (err, result) => {
      if (err) return res.status(500).send('Error querying DB')
      db.close()
      res.send('OK')
    })
  })



}

exports.delete_response = (req, res) => {
  res.send('Not implemented yet')
}

exports.update_response = (req, res) => {
  res.send('Not implemented yet')
}
