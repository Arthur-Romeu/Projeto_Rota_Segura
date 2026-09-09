// Importa os serviços de prioridades.
const PrioridadesServices = require('../Services/PrioridadesServices')

// Lista todas as prioridades cadastradas.
async function GetAllRegions(req, res) {
    try {
        // Consulta todas as prioridades no banco.
        const regions = await PrioridadesServices.getAllRegions()
        // Extrai os dados simples dos registros Sequelize.
        const arrayRegions = regions.map((region) => region.dataValues)

        // Retorna a lista quando existem registros.
        if (arrayRegions.length > 0) {
            return res.status(200).json({
                statuscode: 200,
                dados: arrayRegions
            })
        }

        // Informa que não há regiões cadastradas.
        return res.status(404).json({
            statuscode: 404,
            message: 'As regiões não foram implementadas!'
        })
    } catch (error) {
        // Retorna detalhes quando a consulta falha.
        return res.status(500).json({
            statuscode: 500,
            message: 'Erro ao listar as prioridades.',
            erro: error.message
        })
    }
}

// Busca uma prioridade pelo id.
async function GetOneRegion(req, res) {
    // Obtém o identificador informado na rota.
    const id = req.params.id

    // Consulta a prioridade correspondente.
    const region = await PrioridadesServices.getOneRegion(id)

    // Retorna a prioridade encontrada.
    if (region) {
        res.status(201).json({
            statuscode: 201,
            dado: region
        })
    }

    else{
        // Informa que a prioridade não existe.
        res.status(400).json({
            statuscode: 400, 
            message: "Região não encontrada!"
        })
    }
}

// Cria uma ou várias prioridades.
async function createPrioridades(req, res) {
    // Normaliza um objeto único para uma lista.
    const listaPrioridades = Array.isArray(req.body) ? req.body : [req.body]

    // Padroniza os nomes dos campos recebidos.
    const prioridades = listaPrioridades.map((prioridade) => ({
        idPrioridades: prioridade.id,
        Via: prioridade.Via ?? prioridade.via,
        Nivel: prioridade.Nivel ?? prioridade.nivel,
        Sinal_Policiamento: prioridade.Sinal_Policiamento ?? prioridade.sinal_policiamento,
        Sinal_Infraestrutura: prioridade.Sinal_Infraestrutura ?? prioridade.sinal_infraestrutura,
        Pontuacao: prioridade.Pontuacao ?? prioridade.pontuacao
    }))

    // Define os campos obrigatórios de cada prioridade.
    const camposObrigatorios = [
        'idPrioridades',
        'Via',
        'Nivel',
        'Sinal_Policiamento',
        'Sinal_Infraestrutura',
        'Pontuacao'
    ]

    // Verifica se algum campo obrigatório está ausente ou vazio.
    const temCampoVazio = prioridades.some((prioridade) => {
        return camposObrigatorios.some((campo) => {
            return prioridade[campo] === undefined || prioridade[campo] === null || prioridade[campo] === ''
        })
    })

    // Interrompe o cadastro quando há dados inválidos.
    if (temCampoVazio) {
        return res.status(400).json({
            statuscode: 400,
            message: 'Todos os campos da prioridade são obrigatórios.'
        })
    }

    try {
        // Persiste uma ou várias prioridades no banco.
        const resultado = await PrioridadesServices.createPrioridade(prioridades)

        // Retorna os registros criados.
        return res.status(201).json({
            statuscode: 201,
            dados: Array.isArray(req.body) ? resultado : resultado
        })
    } catch (error) {
        // Retorna o erro ocorrido durante a persistência.
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