const assetService = require('../services/asset.service');
const logger = require('../utils/logger.utils');

const createAsset = async (req, res, next) => {
    assetService.createAsset(req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            next(error);
        })
}

const listAsset = async (req, res, next) => {
    assetService.listAsset()
        .then((response) => {
            res.send(response)
        })
        .catch((error) => {
            next(error);
        })
}

const listById = async (req, res, next) => {
    var asset_id = req.params['id'];
    assetService.listById(asset_id).then((response) => {
        res.send(response);
    })
        .catch((error) => {
            next(error);
        })

}

const listByCategoryId = async (req, res, next) => {

    var categoryId = req.params['categoryId'];
    assetService.listByCategoryId(categoryId).then(response => {
        res.send(response);
    })
        .catch(error => {
            next(error);
        })
}

const updateAsset = async (req, res, next) => {
    var asset_id = req.params['id'];
    assetService.updateAsset(asset_id, req.body)
        .then((response) => {
            res.send(response);
        })
        .catch((error) => {
            next(error);
        })
}

const deleteAsset = async (req, res, next) => {
    var asset_id = req.params['id'];
    assetService.deleteAsset(asset_id).then((response) => {
        res.send(response);
    })
        .catch((error) => {
            next(error);
        })

}

const assignedAssets = async (req, res, next) => {
    var assigned = parseInt(req.params['assigned']);
    assetService.assignedAssets(assigned).then(response => {
        res.send(response);
    })
        .catch(error => {
            next(error);
        })
}

const filteredList = async (req, res, next) => {
    logger.info('listing assets');


    let params = {};
    params.size = parseInt(req.query.size);
    params.pageNo = parseInt(req.query.page);
    params.status = req.query.status;
    params.auditStatus = req.query.audit_status;
    params.employeeId = req.query.employee_id;
    params.lastUpdatedDate = req.query.updated_date;
    params.assigned = parseInt(req.query.assigned);
    params.categoryId = req.query.category_id;
    params.modelName = req.query.model_name;
    params.manufacturer = req.query.manufacturer;

    console.log(params);

    assetService.filteredList(params)

        .then((response) => {
            res.send(response)
        })
        .catch((error) => {

            next(error);
        })

    return;

}


module.exports = { createAsset, listAsset, updateAsset, listById, deleteAsset, listByCategoryId, filteredList, assignedAssets }