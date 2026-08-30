const UsersModels = require('../models/UsersModels')

function GetAllUsers() {
    return UsersModels.findAll()
}

function GetUsersID(id) {
    return UsersModels.findByPk(id)
}


function createUser(objData) {
    return UsersModels.create(objData)
}

module.exports = {
    GetAllUsers,
    GetUsersID,
    createUser
}