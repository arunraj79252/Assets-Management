const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');
const authenticate = require('../middlewares/authentication.middleware');
const permit = require('../middlewares/authorization.middleware');
const { SuperUser, Admin } = require('../utils/user-roles.utils');
const userValidator = require('../validators/user-validator');

router.post('/create', authenticate, permit(SuperUser), userValidator.userValidator('createUser'), userController.create);

router.put('/update/:id', userValidator.userValidator('updateUser'), userController.update);

router.get('/list', userController.list);

router.get('/detail/:id', userController.detail)

router.get('/details/employees/assigned', authenticate, permit(SuperUser, Admin), userController.assignedEmployees);

module.exports = router;