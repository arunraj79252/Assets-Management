const categoryService = require("../services/category.service");
const { NotFound, BadRequest } = require('../utils/errors');
const logger = require('../utils/logger.utils')
const { body, validationResult } = require('express-validator');
const { response } = require("../server");



const listAll = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequest(errors.errors[0].msg));
    }

    categoryService.listAll()
        .then((response) => {
            res.send(response)
        })
        .catch((error) => {
            logger.error(`${error.status} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            next(error)
        })
}

const createCategory = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequest(errors.errors[0].msg))
    }
    categoryService.createCategory(req.body)
        .then((response) => {
            logger.info(`category created ${response.getDataValue('name')} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.send(response)
        })
        .catch((error) => {
            next(error);
        });
}

const updateCategory = async (req, res, next) => {
    const category_id = req.params.id;

    categoryService.updateCategory(category_id, req.body)
        .then((response) => {
            logger.info(`category updated ${response.getDataValue('name')} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.send(response);
        })
        .catch((error) => {
            next(error);
        })
}

const deleteCategory = async (req, res, next) => {
    const category_id = req.params.id;

    categoryService.deleteCategory(category_id)
        .then((response) => {
            logger.info(`category deleted - ${req.originalUrl} - ${req.method} - ${req.ip}`)
            res.status(204).end();
        })
        .catch((error) => {
            next(error);
        })
}

module.exports = { listAll, createCategory, updateCategory, deleteCategory };