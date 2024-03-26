const assetController = require('../controllers/asset.controller');
const authenticate = require('../middlewares/authentication.middleware');
const permit = require('../middlewares/authorization.middleware');
const { SuperUser, Admin } = require('../utils/user-roles.utils');
const assetRouter = require('express').Router();

assetRouter.post('/create', authenticate, permit(SuperUser, Admin), assetController.createAsset);
assetRouter.get('/list', authenticate, permit(SuperUser, Admin), assetController.listAsset);
assetRouter.get('/list/:id', authenticate, permit(SuperUser, Admin), assetController.listById);
assetRouter.put('/edit/:id', authenticate, permit(SuperUser, Admin), assetController.updateAsset);
assetRouter.delete('/delete/:id', authenticate, permit(SuperUser, Admin), assetController.deleteAsset);
assetRouter.get('/listByCategory/:categoryId', authenticate, permit(SuperUser, Admin), assetController.listByCategoryId);
assetRouter.get('/search', authenticate, permit(SuperUser, Admin), assetController.filteredList);
assetRouter.get('/assigned/:assigned', authenticate, permit(SuperUser, Admin), assetController.assignedAssets);

module.exports = assetRouter;