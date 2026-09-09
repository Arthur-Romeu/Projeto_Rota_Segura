// Importa os serviços responsáveis pelas operações de usuários.
const UsersServices = require('../Services/UsersServices')

// Importa a ferramenta para gerar hashes de senha.
const bcrypt = require('bcrypt')

// Lista todos os usuários cadastrados.
async function getAllUser(req, res) {
    // Busca os usuários no banco por meio do service.
    const users = await UsersServices.GetAllUsers()

    // Converte os registros Sequelize em objetos simples.
    const arrayUsers = users.map(user =>{
        return user.dataValues
    })

    // Retorna os usuários quando há registros encontrados.
    if (arrayUsers.length > 0) {
        res.status(200).json({
            statuscode: 200,
            dados: arrayUsers
        })
    }

    else{
        // Retorna erro quando a lista está vazia.
        res.status(400).json({
            statuscode: 400,
            erro: "Nenhum usuário encontrado"
        })
    }
}

// Busca um usuário pelo identificador recebido na URL.
async function getOneUser(req, res){
    // Obtém o id informado como parâmetro da rota.
    const id = req.params.id

    // Consulta o usuário pelo id.
    const user = await UsersServices.GetUsersID(id)

    // Retorna o registro caso ele exista.
    if (user) {
       res.status(200).json({
            statuscode: 200,
            usuario: user
       }) 
    }

    else{
        // Informa que nenhum usuário corresponde ao id.
        res.status(400).json({
            statuscode: 400,
            erro: "Usuário buscado não encontrado"
        })
    }
}

// Cadastra um novo usuário.
async function createNewUser(req, res) {
    // Lê os dados enviados pelo cliente.
    const userData = req.body

    // Valida os campos mínimos do cadastro.
    if (!userData.Nome || !userData.Email || !userData.Senha) {
        return res.status(400).json({
            statusCode: 400,
            erro: 'Nome, email e senha são obrigatórios.'
        })
    }

    // Confere se o email já está em uso.
    const emailAlreadyExists = await UsersServices.searchEmail(userData.Email)

    // Impede o cadastro de emails duplicados.
    if (emailAlreadyExists) {
        return res.status(400).json({
            statusCode: 400,
            erro: 'Email já existente!'
        })
    }

    // Gera um salt criptográfico com 12 rounds.
    const salt = bcrypt.genSaltSync(12)
    // Criptografa a senha antes de armazená-la.
    const criptography = await bcrypt.hash(userData.Senha, salt)

    // Cria o usuário usando a senha criptografada.
    const user = await UsersServices.createUser({
        Nome: userData.Nome,
        Email: userData.Email,
        Senha: criptography
    })

    // Retorna o novo registro criado.
    return res.status(201).json({
        statusCode: 201,
        dados: user
    })
}

module.exports = {
    getAllUser,
    getOneUser,
    createNewUser
}