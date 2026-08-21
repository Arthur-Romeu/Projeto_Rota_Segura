const PrioridadesModels = require('../models/PrioridadesModels')

function getAllRegions() {
    return PrioridadesModels.findAll()
}

function getOneRegion(id) {
    return PrioridadesModels.findOne(id)
}

module.exports = {
    getAllRegions,
    getOneRegion
}