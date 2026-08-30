const sequelize = require('./ConfigBanco')
const { DataTypes } = require('sequelize')

const Trechos = sequelize.define('rota_segura_online', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    idTrechos: {
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
    },

    Comprimento_m: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Lat_origem:{
        type: DataTypes.FLOAT(15),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } ,

    Lng_origem:{
        type: DataTypes.FLOAT(15),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } ,

    Lat_destino:{
        type: DataTypes.FLOAT(15),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } ,

    Lng_destino:{
        type: DataTypes.FLOAT(15),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } 


}, {
    tableName: 'trechos',
    timestamps: false
})

module.exports = Trechos