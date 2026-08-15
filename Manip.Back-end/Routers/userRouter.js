const UsersControllers = require('../Controllers/UsersControllers')
const UserMiddleware = require('../Middleware/UserMiddleware')
const express = require('express')
const userRouter = express.Router()

userRouter.get('/', UsersControllers.getAllUser)
userRouter.get('/:id', UsersControllers.getOneUser)
userRouter.post('/', UserMiddleware, UsersControllers.createNewUser)

module.exports = userRouter