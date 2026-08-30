const sequelize = require('./Modo_Online/models/ConfigBanco')
require('dotenv').config({ path: ".env" })

const express = require('express')
const cors = require('cors')
const app = express()

const loginRouter = require('./Modo_Online/Routers/loginRouter')
const userRouter = require('./Modo_Online/Routers/userRouter')
const prioridadeRouter = require('./Modo_Online/Routers/prioridadeRouter')
const trechoRouter = require('./Modo_Online/Routers/trechoRouter')
const transicaoUserRouter = require('./Modo_Online/Routers/transicaoUserRouter')
const Server = require('./Modo_Online/Server')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        API: "Projeto Rota Segura de Ceilândia.",
        Author: "Manipulação do Back-End feita por Arthur."
    })
})

app.use('/usuarios', userRouter)

app.use('/login', loginRouter)

app.use('/bairro', prioridadeRouter)

app.use('/trecho', trechoRouter)

app.use('/transicao', transicaoUserRouter)

Server(app)