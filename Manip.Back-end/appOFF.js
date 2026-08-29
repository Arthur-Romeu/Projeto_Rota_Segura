const express = require('express')
const cors = require('cors')
const appOFF = express()

const loginRouterOFF = require('./Modo_Ofline/Routers/LoginRouterOFF')
// const prioridadeRouter = require('./Routers/prioridadeRouter')
const ServerOFF = require('./Modo_Ofline/ServerOFF')

appOFF.use(express.json())
appOFF.use(cors())

appOFF.get('/', (req, res) => {
    res.json({
        API: "Projeto Rota Segura de Ceilândia.",
        Author: "Manipulação do Back-End feita por Arthur."
    })
})

appOFF.use('/login', loginRouterOFF)

// app.use('/bairro', prioridadeRouter)

ServerOFF(appOFF)