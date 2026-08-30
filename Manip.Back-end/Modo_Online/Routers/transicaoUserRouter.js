const TransicaoUserControllers = require('../Controllers/TransicaoUserControllers')
const mysql = require('mysql2/promise')
const express = require('express')
const transicaoRouter = express.Router()
require('dotenv').config({path: 'dados.env'})
const cron = require('node-cron')

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USUARIO,
  password: process.env.SENHA,
  database: process.env.BANCO
});

transicaoRouter.get('/', TransicaoUserControllers.getAllDatas)

transicaoRouter.get('/:id', TransicaoUserControllers.getOneData)

transicaoRouter.post('/', TransicaoUserControllers.criarTransicao)

transicaoRouter.delete('logout/:transicaoId', async (req, res) =>{
    const { transicaoId } = req.params

    try {
    const [result] = pool.query('DELETE FROM usuarios WHERE id = ?', [transicaoId])

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        message: 'Dados não encontrado.' 
    })
    }

    return res.status(200).json({ 
        message: 'Dados do usuário deletados com sucesso.' 
    })

  } catch (error) {
    console.error(error)
    
    return res.status(500).json({
         message: 'Erro interno ao deletar dados.' 
        })
  }
})


cron.schedule('*/5 * * * *', async () => {
  try {
    const [result] = pool.query(
      `DELETE FROM transicao WHERE ultima_atividade < NOW() - INTERVAL 10 MINUTE`
    );
    console.log(`Limpeza concluída. Usuários deletados: ${result.affectedRows}`);
  } catch (error) {
    console.error('Erro na rotina de limpeza:', error);
  }
});


module.exports = transicaoRouter