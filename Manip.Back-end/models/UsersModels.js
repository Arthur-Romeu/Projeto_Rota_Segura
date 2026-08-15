const sequelize = require('./sequelize')
const { DataTypes } = require('sequelize')

const Users = sequelize.define('Rota_segura_Online', {
    idLogin: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primary_Key: true
    },

    Nome:{
        type: DataTypes.STRING(200),
        allowNull: false
    },

    Email: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
    },

    Senha: {
        type: DataTypes.STRING(50),
        allowNull: false,
        DefaultValues: '$2a$12$3bCAO/E/TI0vFlEwc2rDY.7y2UiLhUqES8.HKr9P1wONXIsRuz3mW'
    }
})

module.exports = Users
