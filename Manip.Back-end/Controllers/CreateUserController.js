const UsersServices = require('./Services/UsersServices.js')
const bcrypt = require('bcrypt')

async function createNewUser(req, res) {
    const emailUsers = req.body

    const emailAlreadyExists = UsersServices.searchEmail(emailUsers.email)

    if (emailAlreadyExists) {
        res.status(401).json({
            statuscode: 401,
            message: "O email já extiste."
        })
    }

    const salt = bcrypt.genSaltSync(12)
    const criptography = await bcrypt.hash(emailUsers.senha, salt)
    
    const newUser = await UsersServices.createUser({
        nome: emailUsers.nome,
        email: emailUsers.email,
        senha: criptography
    })

    if(newUser.senha < 6 || newUser.nome == '' || newUser.email == ''){
        res.status(401).json({
            statuscode:401,
            message: "A senha é simples; nome e email são campos obrigatórios! Crie sua conta novamente."
        })
    }
    else{
        return(
            res.status(200).json({
                statuscode: 200,
                message: "Usuário criado com sucesso!"
            })
        )
    }  
}

module.exports = createNewUser