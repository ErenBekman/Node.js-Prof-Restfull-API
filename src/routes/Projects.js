const express = require('express')
const router = express.Router()
const validate = require('../middleware/validate')
const schemas = require('../validations/Projects')
const authenticateToken = require('../middleware/authenticate')
const { create, index, update, deleteProject } = require('../controllers/Projects')

// router.get('/', index)
router.route('/').get(authenticateToken, index)
router.route('/').post(authenticateToken, validate(schemas.createValidation), create)
router.route('/:id').patch(authenticateToken, update)
router.route('/:id').delete(authenticateToken, deleteProject)
 
module.exports = router 