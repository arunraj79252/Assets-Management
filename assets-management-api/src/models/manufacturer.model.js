const sequelize = require("../db/db.config");
const { DataTypes } = require("sequelize");

const Manufacturer = sequelize.define('Manufacturer', {

    manufacturer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    register_id: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'manufacturer',
    createdAt: 'created_date',
    updatedAt: 'updated_date'
})
module.exports = Manufacturer;