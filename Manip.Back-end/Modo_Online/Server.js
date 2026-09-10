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
// Carrega o modelo de avaliações.
const AvaliacoesModels = require('./models/AvaliacoesModels')

// Inicializa o servidor HTTP e a estrutura do banco.
async function Server(aplication) {
    try {
        // Testa a conexão com o banco de dados.
        await sequelize.authenticate()
        console.log("Conexão feita com sucesso")

        // Cria ou ajusta todas as tabelas conforme os modelos registrados.
        await sequelize.sync({alter: true})
        console.log("Tabelas criadas/atualizadas com sucesso")

        // Escuta requisições somente depois que o banco está pronto.
        aplication.listen(3000, ()=>{
            console.log('O servidor foi iniciado na porta 3000. Acesse http://localhost:3000')
        })
    } catch (err) {
        // Exibe a falha completa de conexão ou sincronização.
        console.error("Falha ao conectar ou sincronizar o banco de dados:", err)
        process.exitCode = 1
    }
}

// Expõe a função de inicialização para o arquivo principal.
module.exports = Server