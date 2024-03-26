const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");
const Category = require("./category.model");
const Manufacturer = require("./manufacturer.model");
const Models = require("./models.model");
const User = require("./user.model");

const Asset = sequelize.define('Asset', {
    asset_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    audit_status: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'category_id'
        }
    },
    employee_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    group: {
        type: DataTypes.STRING
    },
    group_in_charge: {
        type: DataTypes.STRING
    },
    last_audited_date: {
        type: DataTypes.DATE
    },
    manufacturer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Manufacturer,
            key: 'manufacturer_id'
        }
    },
    model_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Models,
            key: "model_id"
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serial_no: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    created_date: {
        type: DataTypes.DATE
    },
    updated_date: {
        type: DataTypes.DATE
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id'
        }
    }
}, {
    tableName: 'asset',
    createdAt: 'created_date',
    updatedAt: 'updated_date'
});


const AssetAttribute = sequelize.define('AssetAttribute', {
    asset_attribute_id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    asset_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Asset,
            key: 'asset_id',
        }
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'asset_attribute',
    createdAt: 'created_date',
    updatedAt: 'updated_date'
})


Asset.hasMany(AssetAttribute, {
    foreignKey: 'asset_id',
    as: 'asset_attributes'
});

Models.hasMany(Asset, {
    as: 'assets',
    foreignKey: 'model_id'
});

Manufacturer.hasMany(Asset,
    {
        as: 'assets',
        foreignKey: 'manufacturer_id'
    });

User.hasMany(Asset, {
    as: 'assets',
    foreignKey: 'employee_id'
});
console.log(Asset === sequelize.models.Asset);
console.log(AssetAttribute === sequelize.models.AssetAttribute);

module.exports = { Asset, AssetAttribute };