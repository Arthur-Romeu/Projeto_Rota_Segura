const sequelize = require('./models/ConfigBanco')
const UserModels = require('./models/UsersModels')

function Server(aplication) {
    aplication.listen(3000, ()=>{
        console.log('O servidor foi iniciado na porta 3000. Acesse http://localhost:3000')
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

module.exports = Server