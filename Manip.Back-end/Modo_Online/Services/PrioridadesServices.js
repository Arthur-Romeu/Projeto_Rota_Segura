const PrioridadesModels = require('../models/PrioridadesModels')

function getAllRegions() {
    return PrioridadesModels.findAll()
}

function getOneRegion(id) {
    return PrioridadesModels.findByPk(id)
}

function createPrioridade(objPrio) {
    return Array.isArray(objPrio)
        ? PrioridadesModels.bulkCreate(objPrio)
        : PrioridadesModels.create(objPrio)
}

module.exports = {
    getAllRegions,
    getOneRegion,
    createPrioridade
}