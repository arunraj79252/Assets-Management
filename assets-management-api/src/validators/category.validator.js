const { body } = require('express-validator');

exports.createCategorySchema = [
    body('name')
        .exists()
        .withMessage('name is required'),
    body('status')
        .exists()
        .withMessage('status is required')
]