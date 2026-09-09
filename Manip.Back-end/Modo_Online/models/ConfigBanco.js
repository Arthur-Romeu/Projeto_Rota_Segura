// Importa o construtor de conexões do Sequelize.
const Sequelize = require('sequelize')
const path = require('path')

// Carrega as variáveis de ambiente do arquivo .env.
require('dotenv').config({
    path: path.resolve(__dirname, '../../.env')
})

// Cria a conexão usando banco, usuário e senha configurados.
const sequelize = new Sequelize(process.env.BANCO, process.env.USUARIO, process.env.SENHA, {
    
// Define host, sistema gerenciador e porta do banco.

    // Define o endereço do servidor do banco.
    host: process.env.HOST, //Host (Servidor: local da máquina ou via navegador)
    // Informa que o banco utilizado é MySQL.
    dialect: 'mysql', // dialect (nome do SGBD escolhido)
    // Define a porta de comunicação com o banco.
    port: process.env.PORTA //port (porta padrão do SGBD escolhido)
})

// Exporta a conexão para models e servidor.
module.exports = sequelize