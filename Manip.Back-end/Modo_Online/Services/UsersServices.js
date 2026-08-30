const UsersModels = require('../models/UsersModels')

function GetAllUsers() {
    return UsersModels.findAll()
}

function GetUsersID(id) {
    return UsersModels.findByPk(id)
}

function searchEmail(email) {
    return UsersModels.findOne({
        where:{
            Email: email
        }
    })
}


function createUser(objUser) {
    return UsersModels.create(objUser)
}

module.exports = {
    GetAllUsers,
    GetUsersID,
    searchEmail,
    createUser
}