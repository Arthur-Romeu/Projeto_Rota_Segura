// Importa o model da tabela de prioridades.
const PrioridadesModels = require('../models/PrioridadesModels')

// Busca todas as prioridades.
function getAllRegions() {
    return PrioridadesModels.findAll()
}

// Busca uma prioridade pela chave primária.
function getOneRegion(id) {
    return PrioridadesModels.findByPk(id)
}

// Cria uma ou várias prioridades.
function createPrioridade(objPrio) {
    // Insere vários registros em uma única operação quando necessário.
    if (Array.isArray(objPrio)) {
        return PrioridadesModels.bulkCreate(objPrio)
    }

    // Insere um único registro.
    return PrioridadesModels.create(objPrio)
}

// Exporta as operações de prioridades.
module.exports = {
    getAllRegions,
    getOneRegion,
    createPrioridade
}