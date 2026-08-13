const UsersServices = require('./Services/UsersServices.js')

async function getAllUser(req, res) {
    const users = await UsersServices.GetAllUsers()

    let arrayUsers = users.map(user =>{
        return users.dataValues
    })

    if (arrayUsers.length > 0) {
        res.status(200).json({
            statuscode: 200,
            dados: arrayUsers
        })
    }

    else{
        res.status(400).json({
            statuscode: 400,
            erro: "Nenhum usuário encontrado"
        })
    }
}

async function getOneUser(req, res){
    const id = req.params.id

    const user = await UsersServices.GetUsersID(id)

    if (user) {
       res.status(200).json({
            statuscode: 200,
            usuario: user
       }) 
    }

    else{
        res.status(400).json({
            statuscode: 400,
            erro: "Usuário buscado não encontrado"
        })
    }
}

module.exports = {
    getAllUser,
    getOneUser
}