const TrechosModels = require('../models/TrechosModels')

function getAllNeighbourhood() {
    return TrechosModels.findAll()
}

function getOneNeighbourhood(id) {
    return TrechosModels.findByPk(id)
}

function createNeighbourhood(objTre) {
    if (Array.isArray(objTre)) {
        return TrechosModels.bulkCreate(objTre)
    }

    return TrechosModels.create(objTre)
}

module.exports = {
    getAllNeighbourhood,
    getOneNeighbourhood,
    createNeighbourhood
}