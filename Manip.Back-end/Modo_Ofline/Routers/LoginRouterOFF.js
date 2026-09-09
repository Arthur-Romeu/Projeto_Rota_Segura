// Importa o controller de login offline.
const LoginControllerOFF = require('../Controllers/LoginControllerOFF')
// Importa o Express.
const express = require('express')
// Cria o roteador offline.
const loginRouterOFF = express.Router()

// Encaminha POST /login ao controller offline.
loginRouterOFF.post('/', LoginControllerOFF.LoginOFF)

// Exporta o roteador offline.
module.exports = loginRouterOFF