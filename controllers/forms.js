const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const db_name = 'generic_form_manager'

const mongodb_options = {
  useUnifiedTopology: true,
}


const collection_name = 'forms'

exports.create_form = (req, res) => {

  // Author
  let author_id = res.locals.user.identity.low
  if(!author_id) return res.status(400).send('User ID not provided')

  // Form name
  let name = req.body.name
  if(!name) return res.status(400).send('Form name not provided')

  MongoClient.connect(process.env.MONGODB_URL,mongodb_options, (err, db) => {
    if (err) return res.status(500).send('Error connecting to DB')

    let form = {
      name: name,
      author_id: author_id,
    }

    db.db(db_name)
    .collection(collection_name)
    .insertOne(form, (err, result) => {
      if (err) return res.status(500).send('Error querying DB')
      db.close()
      res.send(result)
    })
  })

}

exports.get_forms_of_user = (req, res) => {

  let author_id = req.query.user_id
    || req.query.author_id
    || res.locals.user.identity.low

  MongoClient.connect(process.env.MONGODB_URL,mongodb_options, (err, db) => {
    if (err) return res.status(500).send('Error connecting to DB')

    let query = {
      author_id: author_id,
    }

    db.db(db_name)
    .collection(collection_name)
    .find(query)
    .toArray((err, result) => {
      if (err) return res.status(500).send('Error querying DB')
      db.close()
      res.send(result)
    })
  })
}



exports.get_form = (req, res) => {

  // Todo: Aggregate


  let form_id = req.params.form_id
    || req.params.id
    || req.query.form_id
    || req.query.id


  if(!form_id) return res.status(400).send('Form ID not provided')


  MongoClient.connect(process.env.MONGODB_URL,mongodb_options, (err, db) => {
    if (err) return res.status(500).send('Error connecting to DB')

    let query = {
      _id: ObjectID(form_id),
    }

    db.db(db_name)
    .collection(collection_name)
    .findOne(query,(err, result) => {
      if (err) return res.status(500).send('Error querying DB')
      db.close()
      res.send(result)
    })
  })
}



exports.delete_form = (req, res) => {

  let form_id = req.params.form_id
    || req.params.id
    || req.query.form_id
    || req.query.id

  if(!form_id) return res.status(400).send('Form ID not provided')

  MongoClient.connect(process.env.MONGODB_URL,mongodb_options, (err, db) => {
    if (err) return res.status(500).send('Error connecting to DB')

    let query = {
      _id: ObjectID(form_id),
    }

    db.db(db_name)
    .collection(collection_name)
    .deleteOne(query,(err, result) => {
      if (err) return res.status(500).send('Error querying DB')
      db.close()
      res.send('OK')
    })
  })
}

exports.update_form = (req, res) => {

  let form_id = req.params.form_id
    || req.params.id
    || req.body.form_id
    || req.body.id

  if(!form_id) return res.status(400).send('Form ID not provided')



  MongoClient.connect(process.env.MONGODB_URL,mongodb_options, (err, db) => {
    if (err) return res.status(500).send('Error connecting to DB')

    let query = {
      _id: ObjectID(form_id),
    }

    delete req.body._id


    let actions = {
      $set: req.body
    }

    db.db(db_name)
    .collection(collection_name)
    .updateOne(query,actions,(err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send('Error querying DB')
      }
      db.close()
      res.send(result)
    })
  })

}
