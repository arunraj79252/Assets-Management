const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");
const Models = sequelize.define("Models", {

    model_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING
    },
    product_no: {
        type: DataTypes.STRING
    }
}, {
    tableName: "models",
    createdAt: "created_date",
    updatedAt: "updated_date"
})



module.exports = Models;