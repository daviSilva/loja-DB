const pool = require('../config/db');

const clienteModel = {
    /**
     * Função que seleciona todos os clientes da tabela clientes
     * retorna o resultado com um array de objetos, cada objeto representa um registro da tabela
     * @returns {Promise<Array<object>>} Retorna um array de objetos com os dados dos clientes cadastrados. 
     * @example
     * const clientes = await clienteModel.selecionaTodosClientes();
     * console.log(clientes);
     * //saida:
     * [
     *   { id_cliente: 1, cliente_nome: 'João Silva', CPF: '123.456.789-00'}
     * ]
     * 
     */
    selecionaTodosClientes :async () => {
        const sql = 'SELECT * FROM clientes';
        const [rows] = await pool.query(sql);
        return rows;

    },
    /**
     * Função que seleciona um cliente pelo ID
     * Seleciona um cliente pelo ID fornecido.
     * @param {Number} id parametro para o ID do cliente
     * @returns {Promise<object>} Retorna um objeto com os dados do cliente correspondente ao ID fornecido.
     * 
     * @example
     * const cliente = await clienteModel.SelectionaClientePorId(1);
     * console.log(cliente);
     * //saida:
     * { id_cliente: 1, cliente_nome: 'João Silva', CPF: '123.456.789-00'}
     */
    SelectionaClientePorId: async (id) => {
        const sql = 'SELECT * FROM clientes WHERE id_cliente = ?';
        const values = [id];
        const [rows] = await pool.query(sql, values);
        return rows[0];
    },
    /**
     * função para inserir um novo cliente na tabela
     * serve para adicionar um novo cliente ao banco de dados.
     * @param {String} nome parametro para nome do cliente
     * @param {Number} CPF parametro para CPF do cliente
     * @returns <Promise<object>} Retorna um objeto contendo o resultado da inserção do cliente.
     * 
     *  @example
     * const novoCliente = await clienteModel.inserirNovoCliente('Maria Souza', '987.654.321-00');
     * console.log(novoCliente);
     * //saida:
     * { 
     *  fieldCount: 0,
     * affectedRows: 1,
     * insertId: 2,
     * info: '',
     * serverStatus: 2,
     * warningStatus: 0,
     * "ChangedRows": 0 }
     * 
     */
    inserirNovoCliente: async (cliente_nome, CPF) => {
        const sql = 'INSERT INTO clientes (cliente_nome, CPF) VALUES (?, ?)';
        const values = [cliente_nome, CPF];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    /**
     * função para selecionar um cliente pelo CPF
     * Seleciona um cliente pelo CPF fornecido.
     * @function selecionarClientePorCPF função para selecionar um cliente pelo CPF
     * @param {Number} CPF parametro para CPF do cliente 
     * @returns promise<object>} Retorna um objeto com os dados do cliente correspondente ao CPF fornecido.
     * 
     * @example
     * const cliente = await clienteModel.selecionarClientePorCPF('123.456.789-00');
     * console.log(cliente);
     * //saida:
     * { id_cliente: 1, cliente_nome: 'João Silva', CPF: '123.456.789-00'}
     * 
     */
    selecionarClientePorCPF: async (CPF) => {
        const sql = 'SELECT * FROM clientes WHERE CPF = ?';
        const values = [CPF];
        const [rows] = await pool.query(sql, values);
        return rows[0];
    },

    atualizaCliente: async (id, cliente_nome, CPF) => {
        const sql = 'UPDATE clientes SET cliente_nome = ?, CPF = ? WHERE id_cliente = ?';
        const values = [cliente_nome, CPF, id];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    /**
     * Função que deleta o clienten pelo id
     * @param {Number} id 
     * @returns 
     */
    deletarCliente: async (id) => {
        const sql = 'DELETE FROM clientes WHERE id_cliente = ?';
        const values = [id];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    /**
     * função para atualizar/ alterar um cliente do banco de dados.
     * @param {Number} id 
     * @param {String} cliente_nome 
     * @param {Number} CPF 
     * @returns promise<object>} Retor
     * 
     */
    alteraCliente: async (id, cliente_nome, CPF) => {
        const sql = 'UPDATE clientes SET cliente_nome = ?, CPF = ? WHERE id_cliente = ?';
        const values = [cliente_nome, CPF, id];
        const [rows] = await pool.query(sql, values);
        return rows;
    }


};

module.exports = { clienteModel };