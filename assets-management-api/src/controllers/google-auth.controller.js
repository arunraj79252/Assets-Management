const googleAuthService = require("../services/google-auth.service");
const userService = require("../services/user.service");

const getGoogleAuthTokens = async (req, res, next) => {
    googleAuthService.generateGoogleAuthTokens(req, res, next)
        .then((authResponse) => {
            //if valid tokens are generated, update the user details with basic profile info
            userService.findAndUpdateUser(req, res, authResponse.user)
                .then((user) => {
                    res.send({
                        token: authResponse.tokens,
                        user: { ...user },
                    })
                })
                .catch((error) => {
                    next(error);
                });
        })
        .catch((error) => {
            next(error);
        });
}

const getRefreshedAccessToken = async (req, res, next) => {
    googleAuthService.refreshAccessToken(req, res)
        .then((response) => {
            res.send({ tokens: { ...response.tokens } })
        })
        .catch((error) => {
            next(error);
        })
}

const revokeRefreshToken = async (req, res, next) => {
    googleAuthService.revokeRefreshToken(req, res)
        .then((status) => {
            res.status(status);
        })
        .catch((error) => {
            next(error);
        });
}

module.exports = {
    getGoogleAuthTokens,
    getRefreshedAccessToken,
    revokeRefreshToken,
};