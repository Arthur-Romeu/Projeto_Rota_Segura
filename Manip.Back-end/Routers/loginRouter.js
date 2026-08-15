const express = require('express')
const loginRouter = express.Router
const LoginController = require('./Controllers/LoginController.js')
const Authentication = require('./Middleware/authetication.js')

loginRouter.post('/', Authentication, LoginController)

module.exports = loginRouter