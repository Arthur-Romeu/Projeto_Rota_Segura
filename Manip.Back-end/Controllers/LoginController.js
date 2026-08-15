const UsersServices = require('../Services/UsersServices')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

async function login(req, res) {
    const userObject = req.body

    if (!userObject.Email || !userObject.Senha) {
        return res.status(400).json({
            statuscode: 400,
            message: "Email e senha são obrigatórios."
        })
    }

    const userFound = await UsersServices.searchEmail(userObject.Email)

    if (!userFound) {
        return res.status(401).json({
            statuscode: 401,
            message: "A conta procurada não existe."
        })
    }

    const passwordCompare = await bcrypt.compare(userObject.Senha, userFound.Senha)

    if (passwordCompare) {
        const token = JWT.sign({
            Email: userFound.Email,
            Senha: userFound.Senha
        }, process.env.CHAVE_SECRETA, { expiresIn: '30d' })

        return res.status(200).json({
            statuscode: 200,
            message: "Login feito com sucesso!",
            token
        })
    }

    return res.status(401).json({
        statuscode: 401,
        message: "email ou senha incorreta"
    })
}

module.exports = login