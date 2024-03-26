
const userService = require("../services/user.service");
const { NotFound, BadRequest } = require('../utils/errors');

const { body, validationResult } = require('express-validator');

const logger = require('../utils/logger.utils');
const { response } = require("../server");


const create = async (req, res, next) => {

    const userForm = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.errors[0].msg);
        return next(new BadRequest(errors.errors[0].msg));
    }

    console.log("creating a user");
    userService.create(userForm)
        .then((userResponse) => {
            res.send(userResponse)
        })
        .catch((error) => {
            next(error)
        })

}

const assignedEmployees = async (req, res, next) => {
    userService.assignedEmployees().then(response => {
        logger.info("fetching Employee details...");
        res.send(response);
    })
        .catch(error => {
            next(error);
        })

}

const update = async (req, res, next) => {

    var user_id = req.params['id'];
    console.log('user_id: ', user_id)
    const userForm = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.errors[0].msg);
        return next(new BadRequest(errors.errors[0].msg));
    }

    console.log("Updating user details ");
    userService.update(user_id, userForm)
        .then((userResponse) => {
            res.send(userResponse)
        })
        .catch((error) => {
            console.log(error);
            next(error)
        })

}


const list = async (req, res, next) => {
    logger.info('listing users');

    let params = {};
    params.size = parseInt(req.query.size);
    params.pageNo = parseInt(req.query.page);
    params.firstName = req.query.first_name;
    params.surName = req.query.sur_name;
    params.email = req.query.email;
    params.role = req.query.role;
    params.status = req.query.status;

    console.log(params);

    userService.list(params)

        .then((userResponse) => {
            res.send(userResponse)
        })
        .catch((error) => {

            logger.error('An error occurred during user List API');
            logger.error(error);
        }

        )
    return;

}

const detail = async (req, res, next) => {
    var userId = parseInt(req.params['id']);
    logger.info(`Fetching user details of user: ${userId}`);
    userService.detail(userId)

        .then((userResponse) => {
            res.send(userResponse);
        })

        .catch((error) => {
            logger.info(`An errored during user detail API`);
            logger.error(error);
            next(error);
        });

    return;
}

module.exports = { create, update, list, detail, assignedEmployees };