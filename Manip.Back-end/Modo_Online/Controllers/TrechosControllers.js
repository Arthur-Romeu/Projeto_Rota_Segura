// Importa os serviços de trechos.
const TrechosServices = require('../Services/TrechosServices')

// Lista todos os trechos cadastrados.
async function GetAllNeighbourhoods(req, res) {
    try {
        // Consulta os trechos no banco.
        const neighbourhoods = await TrechosServices.getAllNeighbourhood()
        // Converte os registros Sequelize em objetos simples.
        const arrayNeighbourhoods = neighbourhoods.map((neighbourhood) => neighbourhood.dataValues)

        // Retorna os trechos quando existem registros.
        if (arrayNeighbourhoods.length > 0) {
            return res.status(200).json({
                statuscode: 200,
                dados: arrayNeighbourhoods
            })
        }

        // Informa que não há trechos cadastrados.
        return res.status(404).json({
            statuscode: 404,
            message: 'Os trechos não foram implementadas!'
        })
    } catch (error) {
        // Retorna o erro da consulta.
        return res.status(500).json({
            statuscode: 500,
            message: 'Erro ao listar os trechos.',
            erro: error.message
        })
    }
}

// Busca um trecho pelo id.
async function GetOneNeighbourhood(req, res) {
    // Obtém o id enviado na URL.
    const id = req.params.id

    // Consulta o trecho correspondente.
    const neighbourhood = await TrechosServices.getOneNeighbourhood(id)

    // Retorna o trecho encontrado.
    if (neighbourhood) {
        res.status(201).json({
            statuscode: 201,
            dado: neighbourhood
        })
    }

    else{
        // Informa que o trecho não foi encontrado.
        res.status(400).json({
            statuscode: 400, 
            message: "Trecho não encontrado!"
        })
    }
}

// Cria um ou vários trechos.
async function createNeighbourhood(req, res) {
    // Normaliza objeto único e lista para o mesmo formato.
    const listaNeighbourhoods = Array.isArray(req.body) ? req.body : [req.body]

    // Converte os campos recebidos para o formato do model.
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

    // Define os campos obrigatórios do trecho.
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

    // Detecta campos vazios e valores numéricos inválidos.
    const temCampoVazio = neighbourhoods.some((trecho) => {
        return camposObrigatorios.some((campo) => {
            return trecho[campo] === undefined || trecho[campo] === null || trecho[campo] === '' || Number.isNaN(trecho[campo])
        })
    })

    // Recusa o cadastro quando algum campo é inválido.
    if (temCampoVazio) {
        return res.status(400).json({
            statuscode: 400,
            message: 'Todos os campos dos trechos são obrigatórios.'
        })
    }

    try {
        // Salva os trechos no banco.
        const resultado = await TrechosServices.createNeighbourhood(neighbourhoods)

        // Retorna os trechos criados.
        return res.status(201).json({
            statuscode: 201,
            dados: resultado
        })
    } catch (error) {
        // Retorna o erro da operação de persistência.
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