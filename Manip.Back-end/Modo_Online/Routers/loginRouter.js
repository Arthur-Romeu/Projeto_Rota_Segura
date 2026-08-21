const LoginController = require('../Controllers/LoginController')
const express = require('express')
const loginRouter = express.Router()

loginRouter.post('/', LoginController.Login)

module.exports = loginRouter