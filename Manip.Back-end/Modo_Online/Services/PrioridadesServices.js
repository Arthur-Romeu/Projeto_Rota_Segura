const PrioridadesModels = require('../models/PrioridadesModels')

function getAllRegions() {
    return PrioridadesModels.findAll()
}

function getOneRegion(id) {
    return PrioridadesModels.findByPk(id)
}

function createPrioridade(objPrio) {
    if (Array.isArray(objPrio)) {
        return PrioridadesModels.bulkCreate(objPrio)
    }

    return PrioridadesModels.create(objPrio)
}

module.exports = {
    getAllRegions,
    getOneRegion,
    createPrioridade
}