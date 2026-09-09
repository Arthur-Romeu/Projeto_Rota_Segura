// Importa o controller de autenticação.
const LoginController = require('../Controllers/LoginController')
// Importa o Express.
const express = require('express')
// Cria um roteador isolado para login.
const loginRouter = express.Router()

// Encaminha POST /login ao controller.
loginRouter.post('/', LoginController.Login)

// Exporta o roteador de login.
module.exports = loginRouter