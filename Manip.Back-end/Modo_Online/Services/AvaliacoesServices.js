// Importa o model que representa a tabela de avaliações.
const AvaliacoesModels = require('../models/AvaliacoesModels')

// Busca todos os usuários.
function GetAllReviews() {
    // Devolve a consulta de todos os registros.
    return AvaliacoesModels.findAll()
}

// Busca uma avaliação pela chave primária.
function GetReviewID(id) {
    // Devolve o registro correspondente ao id informado.
    return AvaliacoesModels.findByPk(id)
}

// Cria uma avaliação com os dados recebidos.
function createReview(objReview) {
    // Persiste o objeto na tabela de avaliações.
    return AvaliacoesModels.create(objReview)
}

// Exporta as operações disponíveis para os controllers.
module.exports = {
    GetAllReviews,
    GetReviewID,
    createReview
}