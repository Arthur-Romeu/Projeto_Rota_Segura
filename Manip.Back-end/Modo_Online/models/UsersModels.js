// Importa a conexão configurada com o banco.
const sequelize = require('./ConfigBanco')

// Importa os tipos usados nas colunas.
const { DataTypes } = require('sequelize')

// Define o model que representa a tabela de usuários.
const Users = sequelize.define('Users', {
// Define as colunas da tabela.
    idLogin: {
        // Usa números inteiros para identificar o usuário.
        type: DataTypes.INTEGER,
        // Gera o próximo id automaticamente.
        autoIncrement: true,
        // Define a chave primária.
        primaryKey: true
    },

    Nome: {
        // Armazena o nome em texto de até 200 caracteres.
        type: DataTypes.STRING(200),
        // Impede valores nulos.
        allowNull: false,
        validate: {
            // Impede texto vazio.
            notEmpty: true
        }
    },

    Email: {
        // Armazena o email em texto de até 200 caracteres.
        type: DataTypes.STRING(200),
        // Impede emails duplicados.
        unique: true,
        // Impede valores nulos.
        allowNull: false,
        validate: {
            // Impede texto vazio.
            notEmpty: true,
            // Valida o formato de email.
            isEmail: true
        }
    },

    Senha: {
        // Armazena o hash da senha em até 255 caracteres.
        type: DataTypes.STRING(255),
        // Impede valores nulos.
        allowNull: false,
        validate: {
            // Impede senha vazia.
            notEmpty: true
        }
    }
}, {
    // Define o nome físico da tabela.
    tableName: 'usuarias',
    // Desativa colunas automáticas de data.
    timestamps: false
})

// Exporta o model de usuários.
module.exports = Users
