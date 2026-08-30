const TransicaoUserModels = require('../models/TransicaoUserModels')

function GetAllData() {
    return TransicaoUserModels.findAll()
}

function GetDataID(id) {
    return TransicaoUserModels.findByPk(id)
}

function createData(objData) {
    return TransicaoUserModels.create(objData)
}

module.exports = {
    GetAllData,
    GetDataID,
    createData
}