const { Op } = require("sequelize");
const sequelize = require("../db/db.config");
const { Asset, AssetAttribute } = require("../models/asset.model");
const { BadRequest, NotFound } = require('../utils/errors');
const logger = require('../utils/logger.utils');
const { validateString } = require('../validators/string-validator')
const createAsset = async (asset) => {
    const assetObj = await Asset.create({
        ...asset
    }, {
        include: [{
            model: AssetAttribute,
            as: 'asset_attributes'
        }]
    })
    console.log(assetObj);
    return assetObj;
}

const listAsset = async () => {
    const assets = await Asset.findAll({
        include: [{
            model: AssetAttribute,
            as: 'asset_attributes'
        }]
    });
    return assets;
}

const listById = async (assetId) => {
    const asset = await Asset.findOne({
        where: {
            asset_id: assetId
        },
        include: [{
            model: AssetAttribute,
            as: 'asset_attributes'
        }]
    })
    if (asset) {
        return asset;
    }
    else
        throw new BadRequest("Failed to fetch the Item.");


}

const updateAsset = async (asset_id, asset) => {
    var filter = {
        where: {
            asset_id: asset_id
        }
    };

    const response = await Asset.findOne(filter).then(async function (data) {

        if (data) {
            const result = await Asset.update(asset, {
                where: {
                    asset_id: asset_id,
                }
            });
            if (result) {
                asset.asset_attributes.forEach(assetAttribute => {
                    const result1 = AssetAttribute.update(assetAttribute, {
                        where: {
                            asset_id: asset_id,
                        }
                    })
                    if (!result1) {
                        throw new BadRequest("Failed to update Asset attributes.");
                    }
                });
                var temp = await listById(asset_id);
                return temp;
            }
        } else {
            throw new NotFound("No such asset type id exist to update");
        }

    })
        .catch((error) => {
            console.log(error);
        })
    return response;

}

const deleteAsset = async (assetId) => {
    const row = await Asset.destroy({
        where: {
            asset_id: assetId
        },
        force: true
    });
    if (row) {
        return { message: 'Deleted' };
    }
};


const listByCategoryId = async (categoryId) => {
    const assets = await Asset.findAll({
        where: {
            category_id: categoryId
        },
        include: [{
            model: AssetAttribute,
            as: 'asset_attributes'
        }]
    })
    if (assets) {
        return assets;
    }
    else
        throw new BadRequest("Failed to fetch the Items.");

}
//returns results based on multiple filter attributes
const filteredList = async (params) => {
    var size = 0;
    var pageNo = 0;
    let hasNextPage = false;

    let where = {};
    where[Op.and] = {};
    if (params.status) {

        where[Op.and].status = {}
        where[Op.and].status[Op.eq] = `${params.status}`;

    }
    if (validateString(params.modelName)) {
        let arr = [];
        // Use raw SQL queries to select model_ids  which matches with the model_name
        const modelIds = await sequelize.query('SELECT model_id FROM models WHERE name LIKE :search_name', {
            replacements: { search_name: `%${params.modelName}%` },
            type: sequelize.QueryTypes.SELECT
        });;
        modelIds.forEach(element => {
            arr.push(element.model_id)
        });

        where[Op.and].model_id = {}
        where[Op.and].model_id[Op.in] = arr;

    }


    if (validateString(params.manufacturer)) {
        let arr = [];
        // Use raw SQL queries to select manufacturer_ids  which matches with the manufacturer_name
        const manufacturerIds = await sequelize.query('SELECT manufacturer_id FROM manufacturer WHERE name LIKE :search_name', {
            replacements: { search_name: `%${params.manufacturer}%` },
            type: sequelize.QueryTypes.SELECT
        });;
        manufacturerIds.forEach(element => {
            arr.push(element.manufacturer_id)
        });

        where[Op.and].manufacturer_id = {}
        where[Op.and].manufacturer_id[Op.in] = arr;

    }

    if (params.auditStatus) {

        where[Op.and].audit_status = {}
        where[Op.and].audit_status[Op.eq] = `${params.auditStatus}`;

    }

    console.log("emplyee_id", params.employeeId);
    if (params.employeeId) {

        where[Op.and].employee_id = {}
        where[Op.and].employee_id[Op.like] = `%${params.employeeId}%`;

    }


    if (params.lastUpdatedDate) {

        where[Op.and].updated_date = {}
        //it's the filter with last updated date. Actually getting date only from front end but database field having DATETIME format 
        //so we are converting to datetime and search for date in-between 
        where[Op.and].updated_date[Op.lt] = `${new Date(new Date(params.lastUpdatedDate).getTime() + 60 * 60 * 24 * 1000 - 1)}`
        where[Op.and].updated_date[Op.gt] = `${new Date(params.lastUpdatedDate)}`

    }
    if (params.assigned) {
        where[Op.and].employee_id = {}
        where[Op.and].employee_id[Op.ne] = null;

    }
    else if (params.assigned == 0) {
        where[Op.and].employee_id = {}
        where[Op.and].employee_id[Op.eq] = null;
    }

    if (params.categoryId) {
        where[Op.and].category_id = {}
        where[Op.and].category_id[Op.eq] = `${params.categoryId}`;
    }

    const assetCount = await Asset.count({
        where: where
    });

    logger.info(assetCount, ' of asset found');

    if (Number.isInteger(params.size)) {
        size = params.size;
    }
    else {
        size = assetCount;
    }

    if (Number.isInteger(params.pageNo) && params.pageNo > 0) {
        pageNo = (params.pageNo - 1) * size;
    }

    if ((pageNo + size) < assetCount) {
        hasNextPage = true;
    }

    const assetList = await Asset.findAll({
        limit: size, offset: pageNo, where: where, include: [
            {
                model: AssetAttribute,
                as: 'asset_attributes'
            }
        ]
    });

    return { totalCount: assetCount, assets: assetList, hasNextPage: hasNextPage };

}
//return assigned and unassigned assets according to the flag.
const assignedAssets = async (assigned) => {
    var assets;
    if (assigned) {
        assets = await Asset.findAll({
            where: {
                employee_id: {
                    [Op.ne]: null
                }
            },
            include:
            {
                model: AssetAttribute,
                as: 'asset_attributes'
            }

        })

    }
    else {
        assets = await Asset.findAll(
            {
                where: {
                    employee_id: {
                        [Op.eq]: null
                    }
                },
                include: {
                    model: AssetAttribute,
                    as: 'asset_attributes'
                }
            }
        );
    }

    if (assets) {
        return assets;
    }
    else {
        throw new BadRequest("Failed to fetch the Items.");
    }

}

module.exports = { createAsset, listAsset, updateAsset, listById, deleteAsset, listByCategoryId, filteredList, assignedAssets }
