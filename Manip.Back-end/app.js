const sequelize = require('./models/ConfigBanco')
require('dotenv').config({ path: ".env" })

const express = require('express')
const cors = require('cors')
const app = express()

const loginRouter = require('./Routers/loginRouter')
const userRouter = require('./Routers/userRouter')
const Server = require('./Server')

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

Server(app)