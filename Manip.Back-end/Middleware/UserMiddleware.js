function UserValidationMiddleware(req, res, next) {
    if (!req.body.email || !req.body.senha || !req.body.passwordConfirmation || !req.body.nome) {
        res.status(401).json({
            statuscode: 401,
            message: "Email, senha, corfimação da senha e nome são campos obrigatórios!"
        })
        return
    }

    if (req.body.senha !== req.body.passwordConfirmation) {
        res.status(401).json({
            statuscode: 401,
            message:"A senha confirmada e senha não estão iguais!"
        })
        return
    }
    next()
}

module.exports = UserValidationMiddleware