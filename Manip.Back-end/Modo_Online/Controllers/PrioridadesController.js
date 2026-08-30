const PrioridadesServices = require('../Services/PrioridadesServices')

async function GetAllRegions(req, res) {
    try {
        const regions = await PrioridadesServices.getAllRegions()
        const arrayRegions = regions.map((region) => region.dataValues)

        if (arrayRegions.length > 0) {
            return res.status(200).json({
                statuscode: 200,
                dados: arrayRegions
            })
        }

        return res.status(404).json({
            statuscode: 404,
            message: 'As regiões não foram implementadas!'
        })
    } catch (error) {
        return res.status(500).json({
            statuscode: 500,
            message: 'Erro ao listar as prioridades.',
            erro: error.message
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

async function createPrioridades(req, res) {
    const listaPrioridades = Array.isArray(req.body) ? req.body : [req.body]

    const prioridades = listaPrioridades.map((prioridade) => ({
        idPrioridades: prioridade.id,
        Via: prioridade.Via ?? prioridade.via,
        Nivel: prioridade.Nivel ?? prioridade.nivel,
        Sinal_Policiamento: prioridade.Sinal_Policiamento ?? prioridade.sinal_policiamento,
        Sinal_Infraestrutura: prioridade.Sinal_Infraestrutura ?? prioridade.sinal_infraestrutura,
        Pontuacao: prioridade.Pontuacao ?? prioridade.pontuacao
    }))

    const camposObrigatorios = [
        'idPrioridades',
        'Via',
        'Nivel',
        'Sinal_Policiamento',
        'Sinal_Infraestrutura',
        'Pontuacao'
    ]

    const temCampoVazio = prioridades.some((prioridade) => {
        return camposObrigatorios.some((campo) => {
            return prioridade[campo] === undefined || prioridade[campo] === null || prioridade[campo] === ''
        })
    })

    if (temCampoVazio) {
        return res.status(400).json({
            statuscode: 400,
            message: 'Todos os campos da prioridade são obrigatórios.'
        })
    }

    try {
        const resultado = await PrioridadesServices.createPrioridade(prioridades)

        return res.status(201).json({
            statuscode: 201,
            dados: Array.isArray(req.body) ? resultado : resultado
        })
    } catch (error) {
        return res.status(400).json({
            statuscode: 400,
            message: 'Não foi possível implementar as prioridades.',
            erro: error.message
        })
    }
}

module.exports = {
    GetAllRegions,
    GetOneRegion,
    createPrioridades
}