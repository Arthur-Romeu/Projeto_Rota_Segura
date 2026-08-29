const sequelize = require('./ConfigBancoOFF')
const { DataTypes } = require('sequelize')

const LoginOFF = sequelize.define('rota_segura_off', {
    idLogin: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    tableName: 'usuariasOFF',
    timestamps: false
})

module.exports = LoginOFF