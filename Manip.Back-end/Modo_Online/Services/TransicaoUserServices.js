// Importa o model da tabela de transições.
const TransicaoUserModels = require('../models/TransicaoUserModels')

// Busca todas as transições.
function GetAllData() {
    return TransicaoUserModels.findAll()
}

// Busca uma transição pela chave primária.
function GetDataID(id) {
    return TransicaoUserModels.findByPk(id)
}

// Cria uma nova transição.
function createData(objData) {
    return TransicaoUserModels.create(objData)
}

// Exporta as operações de transição.
module.exports = {
    GetAllData,
    GetDataID,
    createData
}