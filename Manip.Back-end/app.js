// Importa a conexão com o banco de dados online.
const sequelize = require('./Modo_Online/models/ConfigBanco')
// Carrega as variáveis definidas no arquivo .env.
require('dotenv').config({ path: ".env" })

// Importa o framework responsável pela API HTTP.
const express = require('express')
// Importa o middleware que permite requisições de outras origens.
const cors = require('cors')
// Cria a aplicação Express.
const app = express()

// Importa as rotas de autenticação.
const loginRouter = require('./Modo_Online/Routers/loginRouter')
// Importa as rotas de usuários.
const userRouter = require('./Modo_Online/Routers/userRouter')
// Importa as rotas de prioridades.
const prioridadeRouter = require('./Modo_Online/Routers/prioridadeRouter')
// Importa as rotas de trechos.
const trechoRouter = require('./Modo_Online/Routers/trechoRouter')
// Importa as rotas de transição de usuários.
const transicaoUserRouter = require('./Modo_Online/Routers/transicaoUserRouter')
// Importa as rotas de avaliações.
const avaliacaoRouter = require('./Modo_Online/Routers/avaliacaoRouter')
// Importa a função que inicializa o servidor online.
const Server = require('./Modo_Online/Server')

// Permite interpretar requisições com corpo JSON.
app.use(express.json())
// Habilita o acesso à API por diferentes origens.
app.use(cors())

// Responde com informações básicas na rota raiz.
app.get('/', (req, res) => {
    // Envia a identificação da API e do autor.
    res.json({
        API: "Projeto Rota Segura de Ceilândia.",
        Author: "Manipulação do Back-End feita por Arthur."
    })
})

// Monta as rotas de usuários no caminho /usuarios.
app.use('/usuarios', userRouter)

// Monta as rotas de login no caminho /login.
app.use('/login', loginRouter)

// Monta as rotas de prioridades no caminho /bairro.
app.use('/bairro', prioridadeRouter)

// Monta as rotas de trechos no caminho /trecho.
app.use('/trecho', trechoRouter)

// Monta as rotas de transição no caminho /transicao.
app.use('/transicao', transicaoUserRouter)

// Monta as rotas de usuários no caminho /usuarios.
app.use('/avaliacao', avaliacaoRouter)

// Inicia o servidor e a conexão com o banco.
Server(app)