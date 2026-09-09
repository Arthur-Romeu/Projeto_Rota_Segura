// Importa a conexão com o banco online.
const sequelize = require('./models/ConfigBanco')
// Carrega o modelo de usuários para registrar sua definição.
const UserModels = require('./models/UsersModels')
// Carrega o modelo de prioridades.
const PrioridadesModels = require('./models/PrioridadesModels')
// Carrega o modelo de trechos.
const TrechosModels = require('./models/TrechosModels')
// Carrega o modelo de transições de usuários.
const TransicaoUserModels = require('./models/TransicaoUserModels')

// Inicializa o servidor HTTP e a estrutura do banco.
function Server(aplication) {
    // Escuta requisições na porta 3000.
    aplication.listen(3000, ()=>{
        // Informa no terminal que o servidor está disponível.
        console.log('O servidor foi iniciado na porta 3000. Acesse http://localhost:3000')
    })


    // Testa a conexão com o banco de dados.
    sequelize.authenticate()
        .then(()=>{
            // Confirma que a conexão foi estabelecida.
            console.log("Conexão feita com sucesso")

            // Cria ou ajusta as tabelas conforme os modelos.
            sequelize.sync({alter: true}).then(()=>{
                // Confirma a sincronização das tabelas.
                console.log("Tabelas criadas/atualizadas com sucesso")
            })
        })

        // Trata falhas na conexão com o banco.
        .catch(err =>{
            // Exibe o erro ocorrido no terminal.
            console.log("Paia, não conectou ao banco de dados " + err)
        })
}

// Expõe a função de inicialização para o arquivo principal.
module.exports = Server