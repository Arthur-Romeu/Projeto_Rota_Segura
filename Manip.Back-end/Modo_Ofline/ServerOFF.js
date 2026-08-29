const sequelize = require('./Models/ConfigBancoOFF')
const LoginOFFModels = require('./Models/LoginOFFModels')

function ServerOFF(aplication) {
    aplication.listen(5000, ()=>{
        console.log('O servidor offline foi iniciado na porta 5000. Acesse http://localhost:5000')
    })


    sequelize.authenticate()
        .then(()=>{
            console.log("Conexão feita com sucesso")

            sequelize.sync({alter: true}).then(()=>{
                console.log("Tabelas criadas/atualizadas com sucesso")
            })
        })

        .catch(err =>{
            console.log("Paia, não conectou ao banco de dados " + err)
        })
}

module.exports = ServerOFF