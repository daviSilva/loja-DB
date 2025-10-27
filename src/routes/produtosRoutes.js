const express = require('express');
const produtoRoutes = express.Router();
const { produtoController } = require('../controllers/produtoController');

// Rota para obter todos os produtos
produtoRoutes.get('/produtos', produtoController.buscarTodos);
// Rota para obter um produto por ID
produtoRoutes.get('/produtos/:id_produto', produtoController.bucarPorId);

produtoRoutes.post('/produtos', produtoController.incluirProduto);

produtoRoutes.post('/deletar', produtoController.deleteProduto)

produtoRoutes.put('/atualizar/:id_produto', produtoController.AtualizarProduto);


module.exports = { produtoRoutes };