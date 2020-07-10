const express = require('express')
const auth = require('../authentication.js')
const controller = require('../controllers/forms.js')

const router = express.Router()


router.route('/')
  .post(auth.authenticate, controller.create_form)
  .get(auth.authenticate, controller.get_forms_of_user)

router.route('/:form_id/fields')
  .get(controller.get_form_fields)

router.route('/:form_id')
  .get(auth.authenticate, controller.get_form)
  .put(auth.authenticate, controller.update_form)
  .delete(auth.authenticate, controller.delete_form)




module.exports = router
