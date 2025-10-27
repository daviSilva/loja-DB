const express = require('express');
const router = express.Router();
const { produtoRoutes } = require('./produtosRoutes');

router.use('/', produtoRoutes);

module.exports = { router };