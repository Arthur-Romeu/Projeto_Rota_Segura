const LoginControllerOFF = require('../Controllers/LoginControllerOFF')
const express = require('express')
const loginRouterOFF = express.Router()

loginRouterOFF.post('/', LoginControllerOFF.LoginOFF)

module.exports = loginRouterOFF