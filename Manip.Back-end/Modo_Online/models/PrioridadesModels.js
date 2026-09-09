// Importa a conexão com o banco.
const sequelize = require('./ConfigBanco')
// Importa os tipos de dados do Sequelize.
const { DataTypes } = require('sequelize')

// Define o model das prioridades de rota.
const Prioridades = sequelize.define('Prioridades', {
    // Identificador interno do registro.
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // Identificador original da prioridade.
    idPrioridades: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Nome da via avaliada.
    Via: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Nível de prioridade.
    Nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Indicador de policiamento.
    Sinal_Policiamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Indicador de infraestrutura.
    Sinal_Infraestrutura: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Pontuação final da via.
    Pontuacao:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } 
}, {
    // Define o nome físico da tabela.
    tableName: 'prioridades',
    // Desativa colunas automáticas de data.
    timestamps: false
})

// Exporta o model de prioridades.
module.exports = Prioridades
