const UserServices = require('./Services/UsersServices.js')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

async function login(req, res) {
    const userObject = req.body

    const userFound = await UserServices.searchEmail(userObject.email)

    if (!userFound) {
        res.status(401).json({
            statuscode: 401, 
            message: "A conta procurada não existe."
        })
        return
    }

    const passwordCompare = await bcrypt.compare(userObject.senha, userFound.senha)

    if (passwordCompare) {
        const token = JWT.sign({
            email: userFound.email,
            senha: userFound.senha
        }, process.env.CHAVE_SECRETA, { expiresIn: '30d'}
        )

        return(
            res.status(200).json({
                statuscode:200,
                message: "Login feito com sucesso!"
            })
        )
    }

    else{
        res.status(401).json({
            statuscode: 401,
            message: "email ou senha incorreta"
        })
    }

}

module.exports = login