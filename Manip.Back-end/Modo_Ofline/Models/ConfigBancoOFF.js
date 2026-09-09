// Importa o construtor de conexão do Sequelize.
const Sequelize = require('sequelize')
// Carrega as variáveis de ambiente do arquivo .env.
require('dotenv').config('../../.env')

// Cria a conexão usando as credenciais do banco offline.
const sequelize = new Sequelize(process.env.BANCO2, process.env.USUARIO, process.env.SENHA, {
    // Define o endereço do servidor do banco.
    host: process.env.HOST,
    // Informa o uso do MySQL.
    dialect: 'mysql',
    // Define a porta do banco.
    port: process.env.PORTA
})

// Exporta a conexão para o model offline.
module.exports = sequelize