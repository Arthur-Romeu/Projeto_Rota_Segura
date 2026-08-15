const loginController = require('../Controllers/LoginController')
const Authentication = require('../Middleware/authentication')
const express = require('express')
const loginRouter = express.Router()

loginRouter.post('/login', Authentication, loginController)

module.exports = loginRouter