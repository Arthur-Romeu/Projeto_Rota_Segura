// Importa o serviço de transições.
const TransicaoUserServices = require('../Services/TransicaoUserServices')
// Importa o serviço de usuários.
const UsersServices = require('../Services/UsersServices')
// Importa o serviço de trechos.
const TrechosServices = require('../Services/TrechosServices')

// Lista todas as transições registradas.
async function getAllDatas(req, res) {
    try {
        // Consulta as transições no banco.
        const datas = await TransicaoUserServices.GetAllData()
        // Normaliza registros Sequelize e objetos comuns.
        const arrayDatas = Array.isArray(datas) ? datas.map(data => data.dataValues ?? data) : []

        // Retorna os dados quando há registros.
        if (arrayDatas.length > 0) {
            return res.status(200).json({
                statuscode: 200,
                dados: arrayDatas
            })
        }

        // Informa que nenhum dado foi encontrado.
        return res.status(400).json({
            statuscode: 400,
            erro: "Nenhum dado encontrado"
        })
    } catch (error) {
        // Retorna o erro inesperado da consulta.
        return res.status(500).json({
            statuscode: 500,
            erro: error.message
        })
    }
}

// Busca uma transição pelo identificador.
async function getOneData(req, res) {
    // Obtém o id informado na URL.
    const id = req.params.id

    try {
        // Consulta a transição correspondente.
        const data = await TransicaoUserServices.GetDataID(id)

        // Retorna a transição encontrada.
        if (data) {
            return res.status(200).json({
                statuscode: 200,
                usuario: data
            })
        }

        // Informa que o registro não existe.
        return res.status(400).json({
            statuscode: 400,
            erro: "Dado buscado não encontrado"
        })
    } catch (error) {
        // Retorna o erro ocorrido na consulta.
        return res.status(500).json({
            statuscode: 500,
            erro: error.message
        })
    }
}

// Cria uma transição relacionando usuário e trecho.
async function criarTransicao(req, res) {
    try {
        // Aceita os ids no corpo ou nos parâmetros da rota.
        const idUsuario = req.body?.idUsuario ?? req.params?.idUsuario
        const idTrecho = req.body?.idTrecho ?? req.params?.idTrecho

        // Exige os dois identificadores para continuar.
        if (!idUsuario || !idTrecho) {
            return res.status(400).json({
                statuscode: 400,
                erro: "idUsuario e idTrecho são obrigatórios"
            })
        }

        // Busca o usuário e o trecho relacionados.
        const user = await UsersServices.GetUsersID(idUsuario)
        const trecho = await TrechosServices.getOneNeighbourhood(idTrecho)

        // Valida a existência do usuário.
        if (!user || !user.Nome) {
            return res.status(400).json({
                statuscode: 400,
                erro: "Usuário não encontrado"
            })
        }

        // Valida a existência e os limites do trecho.
        if (!trecho || !trecho.De || !trecho.Para) {
            return res.status(400).json({
                statuscode: 400,
                erro: "Trecho não encontrado ou sem origem/destino"
            })
        }

        // Cria a transição com os dados necessários.
        const transicao = await TransicaoUserServices.createData({
            Nome: user.Nome,
            De: trecho.De,
            Para: trecho.Para
        })

        // Retorna a confirmação e o registro criado.
        return res.status(201).json({
            statuscode: 201,
            message: "Dados sincronizados com sucesso",
            dados: transicao
        })
    } catch (error) {
        // Retorna o erro da sincronização.
        return res.status(500).json({
            statuscode: 500,
            erro: error.message
        })
    }
}

module.exports = {
    getAllDatas,
    getOneData,
    criarTransicao
}