const { body } = require('express-validator')

const status = require('../utils/user-status.utils')

const { Module } = require('module')
const { isString } = require('util')
const userValidator = (validationtype) => {

    switch (validationtype) {

        case 'createUser': {
            console.log(status.values)
            return [
                body('first_name', 'First name required').exists(),
                body('sur_name', 'invalid sur_name').optional().isString(),
                body('phone', 'invalid phone').optional().isString(),
                body('employee_id', 'Employee Id required').exists(),
                body('email', 'Email required').exists()
                    .isEmail(),
                body('role', 'Invalid role').optional()
                    .isInt().
                    isIn([0, 1, 2])
                // body('status', 'invalid status').exists().isIn([0,1,2])


            ]
        }

        case 'updateUser': {
            return [
                body('first_name', 'Invalid first name').optional()
                    .isString().
                    isLength({ min: 2, max: 20 }),
                body('sur_name', 'Invalid first name').optional()
                    .isString().
                    isLength({ min: 2, max: 20 }),
                body('phone', 'Invalid first name').optional()
                    .isString().
                    isLength({ min: 10, max: 20 }),
                body('email', 'Invalid email').optional()
                    .isEmail(),
                body('status', 'Invalid status').optional()
                    .isInt().
                    isIn([0, 1, 2]),
                body('role', 'Invalid role').optional()
                    .isInt().
                    isIn([0, 1, 2])


            ]
        }

    }

}

module.exports = { userValidator };