// Importa as funções de criação e validação de tokens JWT.
const JWT = require('jsonwebtoken')

// Middleware que valida o token enviado pela requisição.
function authentication (req, res, next){
    // Extrai o token depois do prefixo do cabeçalho Authorization.
    const token = req.headers.authorization.split(' ')[1]

    // Verifica a assinatura e recupera os dados validados do token.
    const decodedToken = JWT.verify(token, process.env.CHAVE_SECRETA)
    // Lê o conteúdo do token para disponibilizá-lo à rota.
    const tokenContent = JWT.decode(token, process.env.CHAVE_SECRETA)

    // Trata tokens válidos e inválidos.
    try{if (decodedToken) {
            // Salva o token validado na requisição.
            req.token = decodedToken
            // Salva o conteúdo decodificado na requisição.
            req.tokenContent = tokenContent
            // Registra o conteúdo do token no terminal.
            console.log(tokenContent)
            // Registra uma mensagem de depuração.
            console.log("Vaaamooooo")
        // Permite a continuação da requisição.
        next()
        } else { // Rejeita quando a validação não retorna conteúdo.
            res.status(401).json({message:"Token inválido"})}}

        // Informa que o acesso foi negado por falha na validação.
        catch(e){res.status(401).json({message:"acesso não concedido. Verifique o Token!"})}
}

// Exporta o middleware para os roteadores.
module.exports = authentication