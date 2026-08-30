const UsersServices = require('../Services/UsersServices')
const bcrypt = require('bcrypt')

async function getAllUser(req, res) {
    const users = await UsersServices.GetAllUsers()

    let arrayUsers = users.map(user =>{
        return user.dataValues
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

async function createNewUser(req, res) {
    const userData = req.body

    if (!userData.Nome || !userData.Email || !userData.Senha) {
        return res.status(400).json({
            statusCode: 400,
            erro: 'Nome, email e senha são obrigatórios.'
        })
    }

    const emailAlreadyExists = await UsersServices.searchEmail(userData.Email)

    if (emailAlreadyExists) {
        return res.status(400).json({
            statusCode: 400,
            erro: 'Email já existente!'
        })
    }

    const salt = bcrypt.genSaltSync(12)
    const criptography = await bcrypt.hash(userData.Senha, salt)

    const user = await UsersServices.createUser({
        Nome: userData.Nome,
        Email: userData.Email,
        Senha: criptography
    })

    return res.status(201).json({
        statusCode: 201,
        dados: user
    })
}

module.exports = {
    getAllUser,
    getOneUser,
    createNewUser
}