const TrechosServices = require('../Services/TrechosServices')

async function GetAllNeighbourhoods(req, res) {
    try {
        const neighbourhoods = await TrechosServices.getAllNeighbourhood()
        const arrayNeighbourhoods = neighbourhoods.map((neighbourhood) => neighbourhood.dataValues)

        if (arrayNeighbourhoods.length > 0) {
            return res.status(200).json({
                statuscode: 200,
                dados: arrayNeighbourhoods
            })
        }

        return res.status(404).json({
            statuscode: 404,
            message: 'Os trechos não foram implementadas!'
        })
    } catch (error) {
        return res.status(500).json({
            statuscode: 500,
            message: 'Erro ao listar os trechos.',
            erro: error.message
        })
    }
}

async function GetOneNeighbourhood(req, res) {
    const id = req.params.id

    const neighbourhood = await TrechosServices.getOneNeighbourhood(id)

    if (neighbourhood) {
        res.status(201).json({
            statuscode: 201,
            dado: neighbourhood
        })
    }

    else{
        res.status(400).json({
            statuscode: 400, 
            message: "Trecho não encontrado!"
        })
    }
}

async function createNeighbourhood(req, res) {
    const listaNeighbourhoods = Array.isArray(req.body) ? req.body : [req.body]

    const neighbourhoods = listaNeighbourhoods.map((trecho) => ({
        idTrechos: trecho.idTrechos ?? trecho.id ?? trecho.id_trechos,
        Via: trecho.Via ?? trecho.via,
        De: trecho.De ?? trecho.de,
        Para: trecho.Para ?? trecho.para,
        Comprimento_m: Number(trecho.Comprimento_m ?? trecho.comprimento_m ?? trecho.comprimentoM ?? trecho.comprimento_metro),
        Lat_origem: Number(trecho.Lat_origem ?? trecho.lat_origem),
        Lng_origem: Number(trecho.Lng_origem ?? trecho.lng_origem),
        Lat_destino: Number(trecho.Lat_destino ?? trecho.lat_destino),
        Lng_destino: Number(trecho.Lng_destino ?? trecho.lng_destino)
    }))

    const camposObrigatorios = [
        'idTrechos',
        'Via',
        'De',
        'Para',
        'Comprimento_m',
        'Lat_origem',
        'Lng_origem',
        'Lat_destino',
        'Lng_destino'
    ]

    const temCampoVazio = neighbourhoods.some((trecho) => {
        return camposObrigatorios.some((campo) => {
            return trecho[campo] === undefined || trecho[campo] === null || trecho[campo] === '' || Number.isNaN(trecho[campo])
        })
    })

    if (temCampoVazio) {
        return res.status(400).json({
            statuscode: 400,
            message: 'Todos os campos dos trechos são obrigatórios.'
        })
    }

    try {
        const resultado = await TrechosServices.createNeighbourhood(neighbourhoods)

        return res.status(201).json({
            statuscode: 201,
            dados: resultado
        })
    } catch (error) {
        return res.status(400).json({
            statuscode: 400,
            message: 'Não foi possível implementar os trechos.',
            erro: error.message
        })
    }
}

module.exports = {
    GetAllNeighbourhoods,
    GetOneNeighbourhood,
    createNeighbourhood
}