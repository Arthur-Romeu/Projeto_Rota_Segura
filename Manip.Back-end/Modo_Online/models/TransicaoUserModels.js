// Importa a conexão com o banco.
const sequelize = require('./ConfigBanco')
// Importa os tipos de dados do Sequelize.
const { DataTypes } = require('sequelize')

// Define o model que registra transições de usuários.
const Transicao = sequelize.define('rota_segura_online', {
    // Identificador interno do registro.
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // Nome do usuário relacionado.
    Nome: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Local de origem da transição.
    De: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Local de destino da transição.
    Para: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    ultima_atividade:{
        type: DataTypes.TEXT
    }
}, {
    // Define o nome físico da tabela.
    tableName: 'transicao',
    // Desativa colunas automáticas de data.
    timestamps: false
})

// Exporta o model de transições.
module.exports = Transicao