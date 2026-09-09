// Importa o serviço usado para consultar o usuário.
const UsersServices = require('../../Modo_Online/Services/UsersServices')
// Importa a comparação de senhas criptografadas.
const bcrypt = require('bcrypt')
// Importa a criação de tokens JWT.
const JWT = require('jsonwebtoken')

// Realiza o login no modo offline.
async function LoginOFF(req, res) {
    // Obtém as credenciais enviadas.
    const userObject = req.body

    // Valida email e senha.
    if (!userObject.Email || !userObject.Senha) {
        return res.status(400).json({
            statuscode: 400,
            message: "Email e senha são obrigatórios."
        })
    }

    // Procura o usuário pelo email.
    const userFound = await UsersServices.searchEmail(userObject.Email)

    // Interrompe quando a conta não existe.
    if (!userFound) {
        return res.status(401).json({
            statuscode: 401,
            message: "A conta procurada não existe."
        })
    }

    // Compara a senha informada com o hash armazenado.
    const passwordCompare = await bcrypt.compare(userObject.Senha, userFound.Senha)

    // Gera o token quando a senha é válida.
    if (passwordCompare) {
        // Assina o token com validade de 30 dias.
        const token = JWT.sign({
            Email: userFound.Email,
            Senha: userFound.Senha
        }, process.env.CHAVE_SECRETA, { expiresIn: '30d' })

        // Retorna o token ao cliente.
        return res.status(200).json({
            statuscode: 200,
            message: "Login feito com sucesso!",
            token
        })
    }

    // Informa que as credenciais não conferem.
    return res.status(401).json({
        statuscode: 401,
        message: "email ou senha incorreta"
    })
}

module.exports = { LoginOFF }