const TrechosControllers = require('../Controllers/TrechosControllers')
const express = require('express')
const trechoRouter = express.Router()

trechoRouter.get('/', TrechosControllers.GetAllNeighbourhoods)
trechoRouter.get('/:id', TrechosControllers.GetOneNeighbourhood)
trechoRouter.post('/', TrechosControllers.createNeighbourhood)

module.exports = trechoRouter