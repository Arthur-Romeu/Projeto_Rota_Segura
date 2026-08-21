const PrioridadesController = require('../Controllers/PrioridadesController')
const express = require('express')
const prioridadeRouter = express.Router()

prioridadeRouter.get('/', PrioridadesController.GetAllRegions)
prioridadeRouter.get('/:id', PrioridadesController.GetOneRegion)

module.exports = prioridadeRouter