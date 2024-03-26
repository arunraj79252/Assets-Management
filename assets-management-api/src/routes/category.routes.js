const express = require('express');
const categoryRouter = express.Router();

const categoryController = require('../controllers/category.controller');
const authenticate = require('../middlewares/authentication.middleware');
const permit = require('../middlewares/authorization.middleware');
const { SuperUser, Admin } = require('../utils/user-roles.utils');
const { createCategorySchema } = require('../validators/category.validator');

categoryRouter.get('/listAll', authenticate, permit(SuperUser, Admin), categoryController.listAll);
categoryRouter.post('/create', createCategorySchema, authenticate, permit(SuperUser, Admin), categoryController.createCategory);
categoryRouter.put('/update/:id', createCategorySchema, authenticate, permit(SuperUser, Admin), categoryController.updateCategory);
categoryRouter.delete('/delete/:id', authenticate, permit(SuperUser, Admin), categoryController.deleteCategory);

module.exports = categoryRouter;