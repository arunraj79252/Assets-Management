const { google } = require('googleapis');
const { BadRequest } = require('../utils/errors');
const dotenv = require('dotenv');

dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, BEARER } = process.env;

//create a google oauth2 object
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

//generate access token, refresh token from authorization code
const generateGoogleAuthTokens = async (req, res) => {
    try {
        const { code } = req.body;
        const authResponse = await oauth2Client.getToken(code);
        const user = await verifyIdToken(authResponse.tokens.id_token)
        const userDetails = user.getPayload();
        return {
            tokens: {
                access_token: `${BEARER} ${authResponse.tokens.access_token}`,
                refresh_token: authResponse.tokens.refresh_token,
                expiry: authResponse.tokens.expiry_date,
            },
            user: userDetails,
        }
    } catch (error) {
        throw new BadRequest('invalid code');
    }
}

const refreshAccessToken = async (req, res) => {
    try {
        const { refresh_token } = req.body;
        //set the refresh token in oauth2 object to generate new access tokens
        oauth2Client.setCredentials({
            refresh_token: refresh_token
        });
        const tokens = await oauth2Client.getAccessToken();
        const user = await verifyIdToken(tokens.res.data.id_token);
        return {
            tokens: {
                access_token: `${BEARER} ${tokens.res.data.access_token}`,
                refresh_token: tokens.res.data.refresh_token,
                expiry: tokens.res.data.expiry_date
            }
        };
    } catch (error) {
        throw new BadRequest('invalid refresh token');
    }
}

const revokeRefreshToken = async (req, res) => {
    const { refresh_token } = req.body;
    try {
        //revoking refresh token will also revoke associated access tokens
        const response = await oauth2Client.revokeToken(refresh_token);
        console.info(`${new Date()} [INFO]: Revoked refresh token`);
        return res.status;
    } catch (error) {
        console.error(`${new Date()} [ERROR]: ${error} status: ${error.code}`);
        throw new BadRequest('invalid refresh token');
    }
}

const checkAccessTokenValidity = async (access_token) => {
    try {
        const token = await oauth2Client.getTokenInfo(access_token);
        return token;
    } catch (error) {
        throw new BadRequest('invalid access token');
    }
}

//check if the given id_token is valid
const verifyIdToken = async (id_token) => {
    const user = await oauth2Client.verifyIdToken({
        idToken: id_token,
    });
    return user;
}

module.exports = {
    generateGoogleAuthTokens,
    refreshAccessToken,
    revokeRefreshToken,
    checkAccessTokenValidity
};