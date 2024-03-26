const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');
const Category = require('./category.model')


//create a sequelize model for category attributes
const CategoryAttribute = sequelize.define('CategoryAttribute', {
    category_attribute_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    CategoryCategoryId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'category', // 'category' refers to table name
            key: 'category_id', // 'category_id' refers to column name in category table
        }
    },
    name: {
        type: DataTypes.STRING
    },

    required_status: {
        type: DataTypes.TINYINT
    },
    created_date: {
        type: DataTypes.DATE
    },
    updated_date: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'category_attribute',
    createdAt: 'created_date',
    updatedAt: 'updated_date'
})

Category.hasMany(CategoryAttribute);
CategoryAttribute.belongsTo(Category);
console.log(CategoryAttribute === sequelize.models.CategoryAttribute);
module.exports = CategoryAttribute;