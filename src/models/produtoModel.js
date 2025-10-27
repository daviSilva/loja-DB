const pool = require('../config/db');

const produtoModel = {
    /**
     * Seleciona todos os produtos cadastrados na tabela.
     * @function selecionaTodos
     * @async
     * @returns retorna o resultado com um array de objetos, cada objeto representa um registro da tabela 
     * 
     * @example
     * const produtos = await produtoModel.selecionaTodos();
     * console.log(produtos);
     * //saida:
     * [
     *   { id_produto: 1, descricao: 'teclado', valor: 10.0}
     * ]
     */

    selecionaTodos: async () => {
        sql = 'SELECT * FROM produtos';
        const [rows] = await pool.query(sql);
        return rows;
    },
    /**
     * Seleciona um produto pelo ID.
     * @function selecaoPorId
     * @async
     * @param {Number} id Identificador do produto
     * @returns {Promise<Array<object>>} Retorna um objeto com os dados do produto correspondente ao ID fornecido.
     * 
     * @example
     * const produto = await produtoModel.selecaoPorId(1);
     * console.log(produto);
     * //saida:
     * { id_produto: 1, descricao: 'teclado', valor: 10.0}
     */
    selecaoPorId: async (id) => {
        sql = 'SELECT * FROM produtos WHERE id_profduto = ?';
        const [rows] = await pool.query(sql, [id]);
        return rows[0];
    },
    /**
     * Função para inserir um novo produto na tabela.
     * @param {String} descricao parametro para descrição do produto
     * @param {Number} valor parametro para preço do produto
     * @returns {Promise<object>} Retorna um objeto contendo o resultado da inserção do produto.
     * 
     *  @example
     * const novoProduto = await produtoModel.inserirProduto('mouse', 20.0);
     * console.log(novoProduto);
     * //saida:
     * { 
     *  fieldCount: 0,
     *  affectedRows: 1,
     *  insertId: 2,
     *  info: '',
     *  serverStatus: 2,
     *  warningStatus: 0,
     *  "ChangedRows": 0 }
     * 
    **/
    inserirProduto: async (descricao, valor) => {
        const sql = 'INSERT INTO produtos (descricao, valor) VALUES (?, ?)';
        values = [descricao, valor];
        const [rows] = await pool.query(sql, values);
        console.log(rows);
        return rows;
    },
    
    /**
     * Função para alterar um produto pelo ID.
     * Altera a descrição e o valor do produto correspondente ao ID fornecido.
     * @async
     * @param {Number} id parametro para o ID do produto a ser alterado
     * @param {String} descricao parametro para a nova descrição do produto
     * @param {Number} valor parametro para o novo valor do produto
     * @returns <Promise<object>} Retorna o resultado da alteração do produto.
     * 
     * @example
     * // Requisição para alterar o produto com ID 2
     * const resultadoAlteracao = await produtoModel.alterarProdutoPorId(2, 'monitor', 500.0);
     * console.log(resultadoAlteracao);
     * //saida:
     * { fieldCount: 0,
     *  affectedRows: 1,
     *  insertId: 0,
     *  info: '',
     *  serverStatus: 2,
     *  warningStatus: 0,
     *  ChangedRows: 1 
     * }
     * 
     */
    alterarProdutoPorId: async (id, descricao, valor) => {
        const sql = 'UPDATE produtos SET descricao = ?, valor = ? WHERE id_profduto = ?';
        const values = [descricao, valor, id];
        const [rows] = await pool.query(sql, values);
        return rows;
    },
    /**
     * Função para deletar um produto pelo ID.
     * Deleta o produto correspondente ao ID fornecido.
     * @async
     * @function DeletarProduto Função para deletar um produto pelo ID.
     * @param {Number} pId parametro para o ID do produto a ser deletado 
     * @returns <Promise<object>} Retorna o resultado da deleção do produto.
     * 
     * @example
     * const resultadoDelecao = await produtoModel.DeletarProduto(2);
     * console.log(resultadoDelecao);
     * //saida:
     * { 
     *      fieldCount: 0,
     *      affectedRows: 1,
     *      insertId: 0,
     *      info: '',
     *      serverStatus: 2,
     *      warningStatus: 0,
     *      ChangedRows: 0 }
     * >
     */
    DeletarProduto: async(pId) =>{
        const sql = "DELETE DROM produtos WHERE id_produto = ?";
        const values = [pId];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
};

module.exports = { produtoModel };