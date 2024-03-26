const CategoryAttribute = require('../models/category-attribute.model');
const Category = require('../models/category.model');

const rejectedArr = [];
const createdArr = [];

const create = async (attributeArray) => {

    for await (const attribute of attributeArray) {
        const responseAttribute = await CategoryAttribute.findOne({
            where: { name: attribute.name }
        });

        if (responseAttribute) {
            rejectedArr.push(attribute)

        }
        const createdAttribute = await CategoryAttribute.create({
            caetgory_attribute_id: attribute.category_attribute_id,
            CategoryCategoryId: attribute.category_id,
            name: attribute.name,
            required_status: attribute.required_status

        })
        createdArr.push(createdAttribute);
    }


    return { createdArr, rejectedArr };
};

const deleteAttribute = async (categoryAttributeId) => {
    const row = await CategoryAttribute.destroy({
        where: {
            category_attribute_id: categoryAttributeId
        },
        force: true
    });
    if (row) {
        return "Deleted";
    }
};

const listAll = async (categoryId) => {
    let data = await CategoryAttribute.findAll({
        where: {
            category_id: categoryId
        }
    });

    if (data) {
        return data;
    }

};


module.exports = { create, deleteAttribute, listAll };