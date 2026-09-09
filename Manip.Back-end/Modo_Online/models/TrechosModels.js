// Importa a conexão com o banco.
const sequelize = require('./ConfigBanco')
// Importa os tipos de dados do Sequelize.
const { DataTypes } = require('sequelize')

// Define o model dos trechos de rota.
const Trechos = sequelize.define('rota_segura_online', {
    // Identificador interno do registro.
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    // Identificador original do trecho.
    idTrechos: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Nome da via.
    Via: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Ponto de origem textual.
    De: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Ponto de destino textual.
    Para: {
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Comprimento do trecho em metros.
    Comprimento_m: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

    // Latitude do ponto inicial.
    Lat_origem:{
        type: DataTypes.FLOAT(15),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } ,

    // Longitude do ponto inicial.
    Lng_origem:{
        type: DataTypes.FLOAT(15),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } ,

    // Latitude do ponto final.
    Lat_destino:{
        type: DataTypes.FLOAT(15),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } ,

    // Longitude do ponto final.
    Lng_destino:{
        type: DataTypes.FLOAT(15),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    } 


}, {
    // Define o nome físico da tabela.
    tableName: 'trechos',
    // Desativa colunas automáticas de data.
    timestamps: false
})

// Exporta o model de trechos.
module.exports = Trechos