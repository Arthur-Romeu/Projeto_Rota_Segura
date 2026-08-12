const sequelize = require('./sequelize')
const { DataTypes } = require('sequelize')

const LoginUsuario = sequelize.define('Rota_segura_Online', {
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
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    Senha: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
})

module.exports = LoginUsuario
