// Importa a conexão configurada com o banco.
const sequelize = require('./ConfigBanco')

// Importa os tipos usados nas colunas.
const { DataTypes } = require('sequelize')

// Define o model que representa a tabela de avaliações.
const Avaliacoes = sequelize.define('Avaliation', {
// Define as colunas da tabela.
    id: {
        // Usa números inteiros para identificar a avaliação.
        type: DataTypes.INTEGER,
        // Gera o próximo id automaticamente.
        autoIncrement: true,
        // Define a chave primária.
        primaryKey: true
    },

    nome: {
        // Armazena o nome em até 255 caracteres.
        type: DataTypes.STRING(255),
        // Impede valores nulos.
        allowNull: false,
        validate: {
            // Impede campo vazio.
            notEmpty: true
        }
    },

    nome_local: {
        // Armazena o nome do local em até 255 caracteres.
        type: DataTypes.STRING(255),
        // Impede valores nulos.
        allowNull: false,
        validate: {
            // Impede campo vazio.
            notEmpty: true
        }
    },

    nivel_avaliacao: {
        // Armazena a avaliação com um valor de 1 uma casa de precisão e 1 após a vírgula.
        type: DataTypes.DECIMAL(1,1),
        // Impede valores nulos.
        allowNull: false,
        validate: {
            // Impede texto vazio.
            notEmpty: true
        }
    }
}, {
    // Define o nome físico da tabela.
    tableName: 'avaliacoes',
    // Desativa colunas automáticas de data.
    timestamps: false
})

// Exporta o model de avaliações.
module.exports = Avaliacoes
