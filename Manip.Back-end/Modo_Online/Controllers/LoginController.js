// Importa os serviços de consulta de usuários.
const UsersServices = require('../Services/UsersServices')
// Importa a ferramenta de comparação de senhas criptografadas.
const bcrypt = require('bcrypt')
// Importa a ferramenta de tokens JWT.
const JWT = require('jsonwebtoken')

// Processa a autenticação de um usuário.
async function Login(req, res) {
    // Obtém email e senha enviados no corpo da requisição.
    const userObject = req.body

    // Exige os dados básicos para realizar o login.
    if (!userObject.Email || !userObject.Senha) {
        // Retorna erro quando algum dado está ausente.
        return res.status(400).json({
            statuscode: 400,
            message: "Email e senha são obrigatórios."
        })
    }

    // Procura no banco um usuário com o email informado.
    const userFound = await UsersServices.searchEmail(userObject.Email)

    // Interrompe se o email estiver cadastrado.
    if (!userFound) {
        return res.status(401).json({
            statuscode: 401,
            message: "A conta procurada não existe."
        })
    }

    // Compara a senha recebida com a senha armazenada.
    const passwordCompare = await bcrypt.compare(userObject.Senha, userFound.Senha)

    // Cria um token quando a senha confere.
    if (passwordCompare) {
        // Assina o token com os dados do usuário e validade de 30 dias.
        const token = JWT.sign({
            Email: userFound.Email,
            Senha: userFound.Senha
        }, process.env.CHAVE_SECRETA, { expiresIn: '30d' })

        // Retorna o token após o login bem-sucedido.
        return res.status(200).json({
            statuscode: 200,
            message: "Login feito com sucesso!",
            token
        })
    }

    // Informa que o email ou a senha não conferem.
    return res.status(401).json({
        statuscode: 401,
        message: "email ou senha incorreta"
    })
}

module.exports = { Login }