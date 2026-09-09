// Valida os campos necessários para cadastrar um usuário.
function UserValidationMiddleware(req, res, next) {
    // Recusa a requisição quando algum campo obrigatório está ausente.
    if (!req.body.Nome || !req.body.Email || !req.body.Senha || !req.body.ConfirmacaoSenha) {
        // Retorna o erro de validação para o cliente.
        return res.status(401).json({
            statuscode: 401,
            message: "Nome, Email, senha e confirmação da senha são campos obrigatórios!"
        })
    }

    // Confere se a senha e sua confirmação são iguais.
    if (req.body.Senha !== req.body.ConfirmacaoSenha) {
        // Retorna o erro quando as senhas divergem.
        return res.status(401).json({
            statuscode: 401,
            message: "A senha confirmada e a senha não estão iguais!"
        })
    }

    // Encaminha a requisição validada ao próximo middleware.
    next()
}

// Exporta o middleware de validação.
module.exports = UserValidationMiddleware