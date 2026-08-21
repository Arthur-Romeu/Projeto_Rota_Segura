function UserValidationMiddleware(req, res, next) {
    if (!req.body.Nome || !req.body.Email || !req.body.Senha || !req.body.ConfirmacaoSenha) {
        return res.status(401).json({
            statuscode: 401,
            message: "Nome, Email, senha e confirmação da senha são campos obrigatórios!"
        })
    }

    if (req.body.Senha !== req.body.ConfirmacaoSenha) {
        return res.status(401).json({
            statuscode: 401,
            message: "A senha confirmada e a senha não estão iguais!"
        })
    }

    next()
}

module.exports = UserValidationMiddleware