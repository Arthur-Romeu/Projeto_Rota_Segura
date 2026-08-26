const sequelize = require('./ConfigBanco')
const { DataTypes } = require('sequelize')

const Prioridades = sequelize.define('rota_segura_online', {
    idPrioridades: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    id: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Via: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Sinal_Policiamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Sinal_Infraestrutura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Pontuacao:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } 
}, {
    tableName: 'prioridades',
    timestamps: false
})

module.exports = Prioridades
