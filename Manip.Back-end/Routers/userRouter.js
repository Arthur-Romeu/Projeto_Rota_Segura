const UsersControllers = require('./Controller/UsersControllers.js')
const UserMiddleware = require('./Middleware/UserMiddleware.js')
const CreateUserController = require('./Controllers/CreateUserController.js')
const express = require('express')
const userRouter = express.Router

userRouter.get('/', UsersControllers.getAllUsers)

userRouter.get('/:id', UsersControllers.getOneUser)

userRouter.post('/', UserMiddleware, CreateUserController.createNewUser)

module.exports = userRouter