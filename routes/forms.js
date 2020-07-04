const express = require('express')
const auth = require('@moreillon/authentication_middleware')

const router = express.Router()

const controller = require('../controllers/forms.js')

router.use(auth.authenticate)

router.route('/')
  .post(controller.create_form)
  .get(controller.get_forms_of_user)

router.route('/:form_id')
  .get(controller.get_form)
  .put(controller.update_form)
  .delete(controller.delete_form)

module.exports = router
