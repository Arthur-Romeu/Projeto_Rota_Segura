// Importa o controller de trechos.
const TrechosControllers = require('../Controllers/TrechosControllers')
// Importa o Express.
const express = require('express')
// Cria o roteador de trechos.
const trechoRouter = express.Router()

// Lista todos os trechos.
trechoRouter.get('/', TrechosControllers.GetAllNeighbourhoods)
// Busca um trecho pelo id.
trechoRouter.get('/:id', TrechosControllers.GetOneNeighbourhood)
// Cria um ou vários trechos.
trechoRouter.post('/', TrechosControllers.createNeighbourhood)

// Exporta o roteador de trechos.
module.exports = trechoRouter