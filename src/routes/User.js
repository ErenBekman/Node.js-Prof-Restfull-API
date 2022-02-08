const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const schemas = require('../validations/Users');
// const { create, index , login, projectList, resetPassword, update, deleteUser, changePassword, updateProfileImage} = require('../controllers/Users')
const UserController = require('../controllers/User');
const authenticateToken = require('../middleware/authenticate');

// router.get('/', index)
router.route('/').get(authenticateToken, UserController.index);
router
   .route('/')
   .patch(
      authenticateToken,
      validate(schemas.updateValidation),
      UserController.update
   );
router
   .route('/')
   .post(validate(schemas.createValidation), UserController.create);
router
   .route('/login')
   .post(validate(schemas.loginValidation), UserController.login);
router.route('/projects').get(authenticateToken, UserController.projectList);
router
   .route('/reset-password')
   .post(
      validate(schemas.resetPasswordValidation),
      UserController.resetPassword
   );
router
   .route('/change-password')
   .post(
      authenticateToken,
      validate(schemas.changePasswordValidation),
      UserController.changePassword
   );
router.route('/:id').delete(authenticateToken, UserController.deleteUser);
router
   .route('/update-profile-image')
   .post(authenticateToken, UserController.updateProfileImage);

module.exports = router;
