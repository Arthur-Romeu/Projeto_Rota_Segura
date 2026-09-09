// Importa o model da tabela de trechos.
const TrechosModels = require('../models/TrechosModels')

// Busca todos os trechos cadastrados.
function getAllNeighbourhood() {
    return TrechosModels.findAll()
}

// Busca um trecho pela chave primária.
function getOneNeighbourhood(id) {
    return TrechosModels.findByPk(id)
}

// Cria um ou vários trechos.
function createNeighbourhood(objTre) {
    // Usa inserção em lote quando recebe uma lista.
    if (Array.isArray(objTre)) {
        return TrechosModels.bulkCreate(objTre)
    }

    // Usa inserção simples para um único trecho.
    return TrechosModels.create(objTre)
}

// Exporta as operações de trechos.
module.exports = {
    getAllNeighbourhood,
    getOneNeighbourhood,
    createNeighbourhood
}