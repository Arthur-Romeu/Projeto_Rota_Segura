const UsersServices = require('./Services/UsersServices.js')
const bcrypt = require('bcrypt')

async function createNewUser(req, res) {
    const emailUsers = req.body

    const emailExisting = UsersServices.searchEmail(emailUsers.email)

    if (emailExisting) {
        res.status(400).json({
            statuscode: 400,
            message: "O email já existe!"
        })
    }

    const salt = bcrypt.genSaltSync(12)
    const criptography = await bcrypt.hash(emailUsers.senha, salt)
    
    const newUser = await UsersServices.createUser({
        nome: emailUsers.nome,
        email: emailUsers.email,
        senha: criptography
    })

    return(
        res.status(200).json({
            statuscode: 200,
            message: "Usuário criado com sucesso!"
        })
    )
} 

module.exports = createNewUser