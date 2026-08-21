const sequelize = require('./ConfigBanco')
const { DataTypes } = require('sequelize')

const Users = sequelize.define('rota_segura_online', {
    idLogin: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    Nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Email: {
        type: DataTypes.STRING(200),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },

    Senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    tableName: 'rota_segura_online',
    timestamps: false
})

module.exports = Users
