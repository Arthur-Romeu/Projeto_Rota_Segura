const sequelize = require('./ConfigBanco')
const { DataTypes } = require('sequelize')

const Transicao = sequelize.define('rota_segura_online', {
    id: {
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

    De: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Para: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    tableName: 'transicao',
    timestamps: false
})

module.exports = Transicao