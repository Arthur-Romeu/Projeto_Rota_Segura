const Sequelize = require('sequelize')
require('dotenv').config('../../.env')

const sequelize = new Sequelize(process.env.BANCO2, process.env.USUARIO, process.env.SENHA, {
    host: process.env.HOST,
    dialect: 'mysql',
    port: process.env.PORTA
})

module.exports = sequelize