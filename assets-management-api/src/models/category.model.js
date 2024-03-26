const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');


//create a sequelize model for Category
const Category = sequelize.define('Category', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },

    status: {
        type: DataTypes.TINYINT
    },
    created_date: {
        type: DataTypes.DATE
    },
    updated_date: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'category',
    createdAt: 'created_date',
    updatedAt: 'updated_date'
});

console.log(Category === sequelize.models.Category);

module.exports = Category;