// Importa o controller das transições.
const TransicaoUserControllers = require('../Controllers/TransicaoUserControllers')
// Importa o cliente MySQL com suporte a promises.
const mysql = require('mysql2/promise')
// Importa o Express.
const express = require('express')
// Cria o roteador de transições.
const transicaoRouter = express.Router()
// Carrega as credenciais do ambiente.
require('dotenv').config({path: '../../.env'})
// Importa o agendador de tarefas.
const cron = require('node-cron')

// Cria um pool para operações diretas no banco.
const pool = mysql.createPool({
  // Define o servidor do banco.
  host: process.env.HOST,
  // Define o usuário do banco.
  user: process.env.USUARIO,
  // Define a senha do banco.
  password: process.env.SENHA,
  // Define o banco de dados usado.
  database: process.env.BANCO
});

// Lista todas as transições.
transicaoRouter.get('/', TransicaoUserControllers.getAllDatas)

// Busca uma transição pelo id.
transicaoRouter.get('/:id', TransicaoUserControllers.getOneData)

// Cria uma nova transição.
transicaoRouter.post('/', TransicaoUserControllers.criarTransicao)

// Exclui dados associados ao identificador informado.
transicaoRouter.delete('logout/:transicaoId', async (req, res) =>{
    // Extrai o id dos parâmetros da rota.
    const { transicaoId } = req.params

    try {
    // Executa a exclusão parametrizada para evitar inserir o id diretamente na query.
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [transicaoId])

    // Informa quando nenhum registro correspondeu ao id.
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: 'Dados não encontrado.' 
    })
    }

    // Confirma a exclusão dos dados.
    return res.status(200).json({ 
        message: 'Dados do usuário deletados com sucesso.' 
    })

  } catch (error) {
    // Registra o erro para diagnóstico no servidor.
    console.error(error)
    
    // Retorna uma falha genérica ao cliente.
    return res.status(500).json({
         message: 'Erro interno ao deletar dados.' 
        })
  }
})


// Executa a limpeza automática a cada cinco minutos.
cron.schedule('*/5 * * * *', async () => {
  try {
    // Remove transições sem atividade há pelo menos dez minutos.
    const [result] = await pool.query(
      `DELETE FROM transicao WHERE ultima_atividade < NOW() - INTERVAL 10 MINUTE`
    );
    // Informa quantos registros foram removidos.
    console.log(`Limpeza concluída. Usuários deletados: ${result.affectedRows}`);
  } catch (error) {
    // Registra falhas na rotina agendada.
    console.error('Erro na rotina de limpeza:', error);
  }
});


// Exporta o roteador de transições.
module.exports = transicaoRouter