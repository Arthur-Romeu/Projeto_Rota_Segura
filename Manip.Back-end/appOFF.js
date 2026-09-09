// Importa o framework da API.
const express = require('express')
// Importa o middleware para liberar requisições externas.
const cors = require('cors')
// Cria a aplicação do modo offline.
const appOFF = express()

// Importa o roteador de login offline.
const loginRouterOFF = require('./Modo_Ofline/Routers/LoginRouterOFF')
// Mantém a rota de prioridades offline desativada.
// const prioridadeRouter = require('./Routers/prioridadeRouter')
// Importa a função que inicializa o servidor offline.
const ServerOFF = require('./Modo_Ofline/ServerOFF')

// Permite interpretar corpos de requisição em JSON.
appOFF.use(express.json())
// Habilita requisições vindas de outras origens.
appOFF.use(cors())

// Responde com informações básicas da API.
appOFF.get('/', (req, res) => {
    // Retorna o nome da API e o autor.
    res.json({
        API: "Projeto Rota Segura de Ceilândia.",
        Author: "Manipulação do Back-End feita por Arthur."
    })
})

// Monta o login offline no caminho /login.
appOFF.use('/login', loginRouterOFF)

// Mantém a rota offline de prioridades desativada.
// app.use('/bairro', prioridadeRouter)

// Inicia o servidor offline.
ServerOFF(appOFF)