
const categoryAttributeService = require("../services/category-attribute.service");
const { NotFound, BadRequest } = require('../utils/errors');
const logger = require('../utils/logger.utils')
const { body, validationResult } = require('express-validator');
const { response } = require("../server");

const create = async (req, res, next) => {
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.errors[0].msg);
        return next(new BadRequest(errors.errors[0].msg));
    }
    categoryAttributeService.create(req.body)
        .then((response) => {
            res.send(response)
        })
        .catch((error) => {
            next(error)
        })

}

const deleteAttribute = async (req, res, next) => {

    var categoryAttributeId = req.params['id'];
    console.log('categoryAttributeId: ', categoryAttributeId)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.errors[0].msg);
        return next(new BadRequest(errors.errors[0].msg));
    }

    categoryAttributeService.deleteAttribute(categoryAttributeId)
        .then((response) => {
            res.send(response)
        })
        .catch((error) => {
            logger.error(`${error.status} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            next(error)
        })

}

const listAll = async (req, res, next) => {
    var categoryId = req.params['id'];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequest(errors.errors[0].msg));
    }

    categoryAttributeService.listAll(categoryId)
        .then((response) => {
            res.send(response)
        })
        .catch((error) => {
            logger.error(`${error.status} - 'error' - ${error.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            next(error)
        })
}

module.exports = { create, deleteAttribute, listAll };