const express = require('express')
const router = express.Router()

const controller = require('../controllers/form.js')

router.route('/')
  .get(controller.get_form)
  .post(controller.create_form)
  .put(controller.update_form)
  .delete(controller.delete_form)

module.exports = router
