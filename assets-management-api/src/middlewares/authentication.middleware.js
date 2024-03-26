const User = require("../models/user.model");
const { checkAccessTokenValidity } = require("../services/google-auth.service");
const { Unauthorized } = require("../utils/errors");
const logger = require('../utils/logger.utils');


const authenticate = async (req, res, next) => {
    const access_token = req.header('Authorization');
    console.log(access_token)
    if (!access_token) {
        next(new Unauthorized('authorization required'));
    }
    else if (!access_token.startsWith('ASSETS')) {
        next(new Unauthorized('access denied'))
    } else {
        try {
            const token = await checkAccessTokenValidity(access_token.replace('ASSETS ', ''));
            const user = await User.findOne({ where: { email: token.email }, raw: true });
            //associating user with the request 
            req.user = user;
            //continue to the next middleware
            next();
        } catch (error) {
            logger.error(`${error.status} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

            next(new Unauthorized('access denied'));
        }
    }
}

module.exports = authenticate;