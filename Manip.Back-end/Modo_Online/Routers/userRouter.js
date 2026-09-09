// Importa as funções de usuários.
const UsersControllers = require('../Controllers/UsersControllers')
// Importa a validação dos dados de cadastro.
const UserMiddleware = require('../Middleware/UserMiddleware')
// Importa o Express.
const express = require('express')
// Cria o roteador de usuários.
const userRouter = express.Router()

// Lista todos os usuários.
userRouter.get('/', UsersControllers.getAllUser)
// Busca um usuário pelo id.
userRouter.get('/:id', UsersControllers.getOneUser)
// Valida e cria um novo usuário.
userRouter.post('/', UserMiddleware, UsersControllers.createNewUser)

// Exporta o roteador de usuários.
module.exports = userRouter