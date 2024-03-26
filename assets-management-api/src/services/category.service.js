const { Op } = require('sequelize');
const CategoryAttribute = require('../models/category-attribute.model');
const Category = require('../models/category.model');
const { BadRequest, NotFound } = require('../utils/errors');

//list all category with  category attributes associated. 
const listAll = async () => {
    let data = await Category.findAll({
        include: [{
            model: CategoryAttribute,
            // as: 'CategoryAttribute',
        }],
    });

    if (data) {
        return data;
    }

};

const createCategory = async (category) => {
    const [categoryObj, created] = await Category.findOrCreate({
        //inserts the category object into db if the category name is unique(case insensitive)
        where: {
            name: {
                [Op.like]: category.name
            }
        },
        defaults: { ...category }
    })
    if (!created)
        throw new BadRequest('cannot have duplicate categories');
    else
        return categoryObj;
}


const updateCategory = async (category_id, category) => {
    const categoryObj = await Category.findByPk(category_id);
    if (categoryObj === null)
        throw new NotFound('category not found');
    if (!isNaN(category.status))
        categoryObj.status = category.status
    if (category.name != undefined) {
        //check if there is any other category with the given name
        const duplicateCategory = await Category.findOne({
            where: {
                category_id: {
                    [Op.not]: category_id
                },
                name: {
                    [Op.like]: category.name
                }
            }
        });
        if (duplicateCategory != null)
            throw new BadRequest('cannot have duplicate categories');
        categoryObj.name = category.name;
        categoryObj.save();
        return categoryObj;
    }
}


const deleteCategory = async (category_id) => {
    const category = await Category.findByPk(category_id);
    console.log(category);
    if (category === null)
        throw new NotFound('category not found')
    const deletedRows = await Category.destroy({
        where: {
            category_id: category_id
        }
    });
    console.log(deletedRows, 'deleted');
    if (deletedRows == 0)
        throw new BadRequest('failed to delete')
    return true;
}

module.exports = { listAll, createCategory, updateCategory, deleteCategory };