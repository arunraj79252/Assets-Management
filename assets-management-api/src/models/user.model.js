const { DataTypes } = require('sequelize');
const sequelize = require('../db/db.config');


//create a sequelize model for user
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING
    },
    sur_name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    },
    subject: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.TINYINT
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
    tableName: 'user',
    createdAt: 'created_date',
    updatedAt: 'updated_date'
});

console.log(User === sequelize.models.User);

module.exports = User;