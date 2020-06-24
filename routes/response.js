const express = require('express')
const router = express.Router({mergeParams: true})

const controller = require('../controllers/response.js')

let middleware = (req, res, next) => {
  res.locals.form_id = req.params.form_id
  next()
}

// Cannot use middleware to get req.params
router.use(middleware)

router.route('/')
  .get(controller.get_response)
  .post(controller.create_response)
  .put(controller.update_response)
  .delete(controller.delete_response)

module.exports = router
