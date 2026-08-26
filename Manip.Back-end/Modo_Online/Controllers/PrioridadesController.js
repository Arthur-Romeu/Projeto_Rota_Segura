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

async function createPrioridades(req, res) {
    const prioridadeData = Array.isArray(req.body) ? req.body : [req.body]
    const prioridades = prioridadeData.map(prioridade => ({
        id: prioridade.id,
        Via: prioridade.Via ?? prioridade.via,
        Nivel: prioridade.Nivel ?? prioridade.nivel,
        Sinal_Policiamento: prioridade.Sinal_Policiamento ?? prioridade.sinal_policiamento,
        Sinal_Infraestrutura: prioridade.Sinal_Infraestrutura ?? prioridade.sinal_infraestrutura,
        Pontuacao: prioridade.Pontuacao ?? prioridade.pontuacao
    }))

    const camposObrigatorios = [
        'id',
        'Via',
        'Nivel',
        'Sinal_Policiamento',
        'Sinal_Infraestrutura',
        'Pontuacao'
    ]
    const dadosInvalidos = prioridades.some(prioridade => camposObrigatorios.some(campo =>
        prioridade[campo] === undefined || prioridade[campo] === null || prioridade[campo] === ''
    ))

    if (dadosInvalidos) {
        return res.status(400).json({
            statuscode: 400,
            message: 'Todos os campos da prioridade são obrigatórios.'
        })
    }

    try {
        const resultado = await PrioridadesServices.createPrioridade(prioridades)

        return res.status(201).json({
            statuscode: 201,
            dados: Array.isArray(req.body) ? resultado : resultado[0],
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