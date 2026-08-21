const sequelize = require('./ConfigBanco')
const { DataTypes } = require('sequelize')

const Prioridades = sequelize.define('rota_segura_online', {
    idPrioridades: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    Via: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Nivel_Policiamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Infraestrutura_Local: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    Iluminacao:{
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate:{
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
