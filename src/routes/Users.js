const express = require('express')
const router = express.Router()
const validate = require('../middleware/validate')
const schemas = require('../validations/Users')
const { create, index , login, projectList, resetPassword, update, deleteUser, changePassword, updateProfileImage} = require('../controllers/Users')
const authenticateToken = require('../middleware/authenticate')

// router.get('/', index)
router.route('/').get(authenticateToken, index)
router.route('/').patch(authenticateToken,validate(schemas.updateValidation), update)
router.route('/').post(validate(schemas.createValidation), create)
router.route('/login').post(validate(schemas.loginValidation), login)
router.route('/projects').get(authenticateToken,projectList)
router.route('/reset-password').post(validate(schemas.resetPasswordValidation), resetPassword)
router.route('/change-password').post(authenticateToken,validate(schemas.changePasswordValidation), changePassword)
router.route('/:id').delete(authenticateToken, deleteUser)
router.route('/update-profile-image').post(authenticateToken, updateProfileImage)

module.exports = router 