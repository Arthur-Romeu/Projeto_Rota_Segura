// Importa os serviços responsáveis pelas operações de usuários.
const UsersServices = require('../Services/UsersServices')

// Importa os serviços responsáveis pelas operações de avaliações.
const AvaliacoesServices = require('../Services/AvaliacoesServices')

// Lista todos as avaliações.
async function getAllReview(req, res) {
    // Busca as avaliações no banco por meio do service.
    const users = await AvaliacoesServices.GetAllReviews()

    // Converte os registros Sequelize em objetos simples.
    const arrayReviews = users.map(review =>{
        return review.dataValues
    })

    // Retorna as avaliações quando há registros encontrados.
    if (arrayReviews.length > 0) {
        res.status(200).json({
            statuscode: 200,
            dados: arrayReviews
        })
    }

    else{
        // Retorna erro quando a lista está vazia.
        res.status(400).json({
            statuscode: 400,
            erro: "Nenhuma avaliação encontrada"
        })
    }
}

// Busca um usuário pelo identificador recebido na URL.
async function getOneReview(req, res){
    // Obtém o id informado como parâmetro da rota.
    const id = req.params.id

    // Consulta a avaliação pelo id.
    const review = await AvaliacoesServices.GetReviewID(id)

    // Retorna o registro caso ele exista.
    if (review) {
       res.status(200).json({
            statuscode: 200,
            usuario: review
       }) 
    }

    else{
        // Informa que nenhuma avaliação corresponde ao id.
        res.status(400).json({
            statuscode: 400,
            erro: "Avaliação buscada não encontrada"
        })
    }
}

// Cadastra um nova avaliação.
async function createNewReview(req, res) {
    try {
            const reviewData = req.body

            if (!reviewData.nome_local || !reviewData.nivel_avaliacao) {
                res.status(400).json({
                    statuscode: 400,
                    message:"Insira o nome do local e a avaliação!"
                })
            }

            // Aceita os ids no corpo ou nos parâmetros da rota.
            const idUsuario = req.body?.idUsuario ?? req.params?.idUsuario
    
            // Exige os dois identificadores para continuar.
            if (!idUsuario) {
                return res.status(400).json({
                    statuscode: 400,
                    erro: "idUsuario é obrigatório"
                })
            }
    
            // Busca o usuário relacionado.
            const user = await UsersServices.GetUsersID(idUsuario)
    
            // Valida a existência do usuário.
            if (!user || !user.Nome) {
                return res.status(400).json({
                    statuscode: 400,
                    erro: "Usuário não encontrado. Você criou ou logou sua conta?"
                })
            }
    
            // Cria a avaliacao com os dados necessários.
            const review = await AvaliacoesServices.createReview({
                Nome: user.Nome,
                local: reviewData.nome_local,
                avaliacao: reviewData.nivel_avaliacao
            })
    
            // Retorna a confirmação e o registro criado.
            return res.status(201).json({
                statuscode: 201,
                message: "Dados sincronizados com sucesso",
                dados: review
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
    getAllReview,
    getOneReview,
    createNewReview
}