const UsersModels = require('./models/UsersModels.js')
const { where } = require('sequelize')


function GetAllUsers() {
    return UsersModels.findAll()
}

function GetUsersID(id) {
    return UsersModels.findByPk(id)
}

function searchEmail(){
    UsersModels.findOne({
        where:{
            email: email
        }
}) 
}

function createUser(objUser) {
    UsersModels.create(objUser)
}

module.exports = {
    GetAllUsers,
    GetUsersID,
    searchEmail,
    createUser
}