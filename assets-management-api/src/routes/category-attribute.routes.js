const express = require('express');
const categoryAttributeRouter = express.Router();

const categoryAttributeController = require('../controllers/category-attribute.controller');
const authenticate = require('../middlewares/authentication.middleware');
const permit = require('../middlewares/authorization.middleware');
const { SuperUser } = require('../utils/user-roles.utils');
categoryAttributeRouter.post('/create', authenticate, permit(SuperUser), categoryAttributeController.create);
categoryAttributeRouter.delete('/delete/:id', authenticate, permit(SuperUser), categoryAttributeController.deleteAttribute);
categoryAttributeRouter.get('/list/:id', authenticate, permit(SuperUser), categoryAttributeController.listAll);

module.exports = categoryAttributeRouter;