const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const schemas = require('../validations/Projects');
const authenticateToken = require('../middleware/authenticate');
const idChecker = require('../middleware/idChecker');
// const { create, index, update, deleteProject } = require('../controllers/Projects')
const ProjectController = require('../controllers/Project');

// router.get('/', index)
router.route('/').get(authenticateToken, ProjectController.index);
router
   .route('/')
   .post(
      authenticateToken,
      validate(schemas.createValidation),
      ProjectController.create
   );
router
   .route('/:id')
   .patch(idChecker(), authenticateToken, ProjectController.update);
router
   .route('/:id')
   .delete(idChecker(), authenticateToken, ProjectController.deleteProject);

module.exports = router;
