// Importa o model que representa a tabela de usuários.
const UsersModels = require('../models/UsersModels')

// Busca todos os usuários.
function GetAllUsers() {
    // Devolve a consulta de todos os registros.
    return UsersModels.findAll()
}

// Busca um usuário pela chave primária.
function GetUsersID(id) {
    // Devolve o registro correspondente ao id informado.
    return UsersModels.findByPk(id)
}

//Buscas todos os emails existentes
function searchEmail(email) {
    return UsersModels.findOne({
        where:{
            Email: email
        }
    })
}

// Cria um usuário com os dados recebidos.
function createUser(objData) {
    // Persiste o objeto na tabela de usuários.
    return UsersModels.create(objData)
}

// Exporta as operações disponíveis para os controllers.
module.exports = {
    GetAllUsers,
    GetUsersID,
    createUser,
    searchEmail
}