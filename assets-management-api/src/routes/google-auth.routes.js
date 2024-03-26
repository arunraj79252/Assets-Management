const express = require('express');
const googleAuthController = require('../controllers/google-auth.controller');

const authRouter = express.Router();

authRouter.post('/oauth2/tokens', googleAuthController.getGoogleAuthTokens);
authRouter.put('/oauth2/refresh', googleAuthController.getRefreshedAccessToken);
authRouter.post('/oauth2/revoke', googleAuthController.revokeRefreshToken);

module.exports = authRouter;