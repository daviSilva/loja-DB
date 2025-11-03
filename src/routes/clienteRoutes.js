const express = require('express');
const clienteRoutes = express.Router();
const { clienteController } = require('../controllers/clienteController');


// Rota para obter todos os clientes
clienteRoutes.get('/clientes', clienteController.selecionaTodosClientes);
// Rota para obter um cliente por ID
clienteRoutes.get('/clientes/:id_cliente', clienteController.selecionarClientePorId);

// Rota para incluir um novo cliente
clienteRoutes.post('/clientes', clienteController.inserirNovoCliente);


module.exports = { clienteRoutes };