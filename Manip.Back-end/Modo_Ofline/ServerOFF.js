// Importa a conexão com o banco offline.
const sequelize = require('./Models/ConfigBancoOFF')
// Carrega o modelo de login offline.
const LoginOFFModels = require('./Models/LoginOFFModels')

// Inicializa o servidor offline e suas tabelas.
function ServerOFF(aplication) {
    // Escuta requisições na porta 5000.
    aplication.listen(5000, ()=>{
        // Informa no terminal que o modo offline foi iniciado.
        console.log('O servidor offline foi iniciado na porta 5000. Acesse http://localhost:5000')
    })


    // Verifica a conexão com o banco offline.
    sequelize.authenticate()
        .then(()=>{
            // Confirma o sucesso da conexão.
            console.log("Conexão feita com sucesso")

            // Sincroniza o modelo com as tabelas do banco.
            sequelize.sync({alter: true}).then(()=>{
                // Confirma a criação ou atualização das tabelas.
                console.log("Tabelas criadas/atualizadas com sucesso")
            })
        })

        // Trata erros de conexão.
        .catch(err =>{
            // Exibe a falha no terminal.
            console.log("Paia, não conectou ao banco de dados " + err)
        })
}

// Expõe a função para o arquivo principal.
module.exports = ServerOFF