// Importa o controller de prioridades.
const PrioridadesController = require('../Controllers/PrioridadesController')
// Importa o Express.
const express = require('express')
// Cria o roteador de prioridades.
const prioridadeRouter = express.Router()

// Lista todas as prioridades.
prioridadeRouter.get('/', PrioridadesController.GetAllRegions)
// Busca uma prioridade pelo id.
prioridadeRouter.get('/:id', PrioridadesController.GetOneRegion)
// Cria uma ou várias prioridades.
prioridadeRouter.post('/', PrioridadesController.createPrioridades)

// Exporta o roteador de prioridades.
module.exports = prioridadeRouter