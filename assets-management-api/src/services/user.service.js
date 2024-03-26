const { NotFound, BadRequest, Forbidden } = require('../utils/errors');
const User = require('../models/user.model');
const roles = require('../utils/user-roles.utils')
const status = require('../utils/user-status.utils')

const { Op } = require("sequelize");
const { validationResult } = require('express-validator/check');
const { Console } = require('console');
const logger = require('../utils/logger.utils');
const { logging } = require('googleapis/build/src/apis/logging');
const { validateString } = require('../validators/string-validator');
const { Asset } = require('../models/asset.model');

const findAndUpdateUser = async (req, res, user) => {
    //check if user exist on db
    const userObj = await User.findOne({ where: { email: user.email } });
    if (!userObj || userObj.getDataValue('role') == roles.Employee) {
        throw new NotFound('user not found');
    } else if (userObj.getDataValue('status') != 0) {
        throw new Forbidden('user suspended');
    } else {
        if (!userObj.subject) {
            //populate user details if not present
            const updatedUser = await userObj.update({
                subject: user.sub,
                photo: user.picture
            });
            return {
                user_id: updatedUser.getDataValue('user_id'),
                role: updatedUser.getDataValue('role'),
                status: updatedUser.getDataValue('status'),
            };
        } else {
            return {
                user_id: userObj.getDataValue('user_id'),
                role: userObj.getDataValue('role'),
                status: userObj.getDataValue('status'),

            }
        }
    }
}
const create = async (user) => {

    console.log("checking for existing user: ", user)
    const userExist = await User.findOne({
        where:
        {
            [Op.or]: [
                { email: user.email },
                { employee_id: user.employee_id }
            ]
        }

    });

    if (userExist) {
        throw new BadRequest("user already exists");
    }

    console.log("creating user");
    const createdUser = await User.create({
        employee_id: user.employee_id,
        first_name: user.first_name,
        sur_name: user.sur_name,
        email: user.email,
        role: user.role,
        status: 0

    })

    console.log("user created");
    return createdUser;


};


const update = async (id, userform) => {
    console.log('user_id', id);
    console.log('userform', userform);
    let user = await User.findOne({
        where: {
            user_id: id
        }
    })

    let updatedUser = {};

    if (userform.sur_name)
        updatedUser.sur_name = userform.sur_name;

    if (userform.first_name)
        updatedUser.first_name = userform.first_name;

    if (userform.email) {
        let userWithEmail = await User.findOne({
            where: {
                email: userform.email
            }
        });

        if (userWithEmail)
            throw new BadRequest("Email already exists");

        updatedUser.email = userform.email;
    }

    if (userform.status)
        updatedUser.status = userform.status;

    if (userform.role)
        updatedUser.role = userform.role;


    console.log(updatedUser)

    console.log('Checking for user in DB');
    user = await user.update(updatedUser);

    return user;
}

const list = async (params) => {
    console.log("params---", params)

    var size = 0;
    var pageNo = 0;
    let hasNextPage = false;

    let where = {};
    where[Op.and] = {}

    if (validateString(params.firstName)) {

        where[Op.and].first_name = {}
        where[Op.and].first_name[Op.like] = `%${params.firstName}%`;

    }

    if (validateString(params.surName)) {

        where[Op.and].sur_name = {}
        where[Op.and].sur_name[Op.like] = `%${params.surName}%`;

    }

    if (validateString(params.email)) {

        where[Op.and].email = {}
        where[Op.and].email[Op.like] = `%${params.email}%`;

    }

    if (validateString(params.role)) {

        where[Op.and].role = {}
        where[Op.and].role[Op.like] = `%${params.role}%`;

    }

    if (validateString(params.status)) {

        where[Op.and].status = {}
        where[Op.and].status[Op.eq] = `%${params.status}%`;

    }
    const userCount = await User.count({
        where: where
    });

    logger.info(userCount, ' of users found');

    if (Number.isInteger(params.size)) {
        size = params.size;

    }
    else {

        size = userCount
    }


    if (Number.isInteger(params.pageNo) && params.pageNo > 0) {
        pageNo = (params.pageNo - 1) * size;
    }

    if ((pageNo + size) < userCount) {

        hasNextPage = true;
        logger.info(hasNextPage, ' next');
    }

    const userList = await User.findAll({ limit: size, offset: pageNo, where: where });

    return { totalCount: userCount, users: userList, hasNextPage: hasNextPage };

}


const detail = async (userId) => {

    logger.info(`Fetching user details from DB for user ${userId}`)

    let user = await User.findOne({
        where: {
            user_id: userId
        }
    });

    if (!user) {
        console.log(user);
        logger.error(` user not found for id: ${userId}`)
        throw new NotFound("user not found");

    }

    return user;
}

const assignedEmployees = async () => {
    let employees = await User.findAll({

        include: [{
            model: Asset,
            as: 'assets',
            attributes: ['asset_id', 'name', 'model_id', 'manufacturer_id', 'status', 'audit_status'],
            where: {
                employee_id: {
                    [Op.ne]: null
                }
            }
        }]
    });

    if (employees) {
        return employees;
    }
    else {
        throw new BadRequest("Failed to fetch the data.")
    }
};


module.exports = { create, findAndUpdateUser, update, list, detail, assignedEmployees };