// Importa as funções de avaliações.
const AvaliacoesController = require('../Controllers/AvaliacoesController')
// Importa o Express.
const express = require('express')
// Cria o roteador de avaliação.
const avaliacaoRouter = express.Router()

// Lista todos as valiações.
avaliacaoRouter.get('/', AvaliacoesController.getAllReview)
// Busca uma avaliação pelo id.
avaliacaoRouter.get('/:id', AvaliacoesController.getOneReview)
// Valida e cria um nova avaliação.
avaliacaoRouter.post('/', AvaliacoesController.createNewReview)

// Exporta o roteador de avaliações.
module.exports = avaliacaoRouter