const TransicaoUserServices = require('../Services/TransicaoUserServices')
const UsersServices = require('../Services/UsersServices')
const TrechosServices = require('../Services/TrechosServices')

async function getAllDatas(req, res) {
    try {
        const datas = await TransicaoUserServices.GetAllData()
        const arrayDatas = Array.isArray(datas) ? datas.map(data => data.dataValues ?? data) : []

        if (arrayDatas.length > 0) {
            return res.status(200).json({
                statuscode: 200,
                dados: arrayDatas
            })
        }

        return res.status(400).json({
            statuscode: 400,
            erro: "Nenhum dado encontrado"
        })
    } catch (error) {
        return res.status(500).json({
            statuscode: 500,
            erro: error.message
        })
    }
}

async function getOneData(req, res) {
    const id = req.params.id

    try {
        const data = await TransicaoUserServices.GetDataID(id)

        if (data) {
            return res.status(200).json({
                statuscode: 200,
                usuario: data
            })
        }

        return res.status(400).json({
            statuscode: 400,
            erro: "Dado buscado não encontrado"
        })
    } catch (error) {
        return res.status(500).json({
            statuscode: 500,
            erro: error.message
        })
    }
}

async function criarTransicao(req, res) {
    try {
        const idUsuario = req.body?.idUsuario ?? req.params?.idUsuario
        const idTrecho = req.body?.idTrecho ?? req.params?.idTrecho

        if (!idUsuario || !idTrecho) {
            return res.status(400).json({
                statuscode: 400,
                erro: "idUsuario e idTrecho são obrigatórios"
            })
        }

        const user = await UsersServices.GetUsersID(idUsuario)
        const trecho = await TrechosServices.getOneNeighbourhood(idTrecho)

        if (!user || !user.Nome) {
            return res.status(400).json({
                statuscode: 400,
                erro: "Usuário não encontrado"
            })
        }

        if (!trecho || !trecho.De || !trecho.Para) {
            return res.status(400).json({
                statuscode: 400,
                erro: "Trecho não encontrado ou sem origem/destino"
            })
        }

        const transicao = await TransicaoUserServices.createData({
            Nome: user.Nome,
            De: trecho.De,
            Para: trecho.Para
        })

        return res.status(201).json({
            statuscode: 201,
            message: "Dados sincronizados com sucesso",
            dados: transicao
        })
    } catch (error) {
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