const JWT = require('jsonwebtoken')

function authentication (req, res, next){
    const token = req.headers.authorization.split(' ')[1]

    const decodedToken = JWT.verify(token, process.env.CHAVE_SECRETA)
    const tokenContent = JWT.decode(token, process.env.CHAVE_SECRETA)

    try{if (decodedToken) {
            req.token = decodedToken
            req.tokenContent = tokenContent
            console.log(tokenContent)
            console.log("Vaaamooooo")
        next()
        } else {res.status(401).json({message:"Token inválido"})}}

        catch(e){res.status(401).json({message:"acesso não concedido. Verifique o Token!"})}
}

module.exports = authentication