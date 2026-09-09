// Importa a conexão do banco offline.
const sequelize = require('./ConfigBancoOFF')
// Importa os tipos de dados do Sequelize.
const { DataTypes } = require('sequelize')

// Define o model de autenticação offline.
const LoginOFF = sequelize.define('rota_segura_off', {
    // Identificador automático do login.
    idLogin: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // Email único usado para autenticação.
    Email: {
        type: DataTypes.STRING(200),
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },

    // Hash da senha do usuário.
    Senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    // Define o nome físico da tabela offline.
    tableName: 'usuariasOFF',
    // Desativa colunas automáticas de data.
    timestamps: false
})

// Exporta o model de login offline.
module.exports = LoginOFF