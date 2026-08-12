const UsersModels = require('./models/LoginUserModels.js')
const { where } = require('sequelize')


function AllUsers() {
    return UsersModels.findAll()
}

function UserID(id) {
    return UsersModels.findByPk(id)
}

function seachEmail(){
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
    AllUsers,
    UserID,
    seachEmail,
    createUser
}