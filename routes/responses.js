const express = require('express')
const router = express.Router({mergeParams: true})

const controller = require('../controllers/responses.js')


router.route('/')
  .get(controller.get_all_responses)
  .post(controller.create_response)

router.route('/:response_id')
  .delete(controller.delete_response)

module.exports = router
