const PrioridadesServices = require('../Services/PrioridadesServices')

async function GetAllRegions(req, res) {
    const regions = await PrioridadesServices.getAllRegions()

    let arrayRegions = regions.map(region =>{
        return regions.dataValues
    })

    if (arrayRegions > 0) {
        res.status(201).json({
            statuscode: 201,
            dados: arrayRegions
        })
    }

    else{
        res.status(400).json({
            statuscode: 400,
            message: "As regiões não foram implementadas!"
        })
    }
}

async function GetOneRegion(req, res) {
    const id = req.params.id

    const region = await PrioridadesServices.getOneRegion(id)

    if (region) {
        res.status(201).json({
            statuscode: 201,
            dado: region
        })
    }

    else{
        res.status(400).json({
            statuscode: 400, 
            message: "Região não encontrada!"
        })
    }
}

module.exports = {
    GetAllRegions,
    GetOneRegion
}