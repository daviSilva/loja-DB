const { produtoModel } = require('../models/produtoModel');
const produtoController = {
    /**
     * Retorna todos os produtos cadastrados no banco de dados.
     * rota: GET /produtos
     * @async
     * @function buscarTodos
     * @param {Request} req objeto de requisição HTTP
     * @param {Response} res objeto de resposta HTTP
     * @returns {Promise<Array<object>>} conteúdo com os dados da requisição
     */
    buscarTodos: async (req, res) => {

        try {
            const resultado = await produtoModel.selecionaTodos();
            console.log(resultado);
            if (!resultado || resultado.length === 0) {
                return res.status(200).json({ message: 'a lista de produtos está vazia' });
            }
            res.status(200).json({ message: 'resultado dos dados listados', resultado });
        } catch (error) {
            console.error(`Erro ao buscar produtos: ${error}`);
            res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
        }
    },
    /**
     * Retorna o produto referente ao ID fornecido na requisição.
     * rota: GET /produtos/:id_produto
     * @async
     * @function bucarPorId
     * @param {Request} reqv objeto de requisição HTTP 
     * @param {Response} res objeto de resposta HTTP
     * @returns {Promise<object>} retorna o produto correspondente ao ID fornecido
     * 
     * @example
     * // Requisição HTTP
     * 
     * GET /produtos/1
     * 
     * // Resposta HTTP
     * {
     *   "message": "produto encontrado",
     *   "resultado": { "id_produto": 1, "descricao": "teclado", "preco": 10.0 },
     *   "result": "resultado dos dados."
     * }
     */

    bucarPorId: async (req, res) => {
        try {
            const id = Number(req.params.id_produto);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "ID inválido, forneça um indicador válido" })
            }
            resultado = await produtoModel.selecaoPorId(id);
            res.status(200).json({ message: "produto encontrado", resultado, result: "resultado dos dados." });


        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "erro no servidor", messageError: error })
        }

    },
    /**
     * Cria um novo produto no banco de dados.
     * @async
     * @function incluirProduto
     * @param {Request} req Objeto de requisição HTTP
     * @param {Response} res Objeto de resposta HTTP
     * @returns {Promise<object>} Retorna um objeto contendo o resultado da inserção do produto.
     * 
     * @example
     * // Requisição HTTP
     * POST /produtos
     * {
     *   "descricao": "mouse",
     *   "valor": 20.0
     * }
     * // Resposta HTTP
     * {
     *   "message": "produto inserido com sucesso",
     *   "id_produto": 2
     * }
     * 
     */

    incluirProduto: async (req, res) => {
        try {
            const { descricao, valor } = req.body;
            console.log(req.body);
            const resultado = await produtoModel.inserirProduto(descricao, valor)
            if (!String(descricao) || !Number(valor) || descricao.length <= 3 || valor <= 0) {
                return res.status(400).json({ message: "dados inválidos, forneça uma descrição e um valor para o produto." })
            };


            if (resultado.affectedRows === 1 && resultado.insertId != 0) {
                return res.status(201).json({ message: "produto inserido com sucesso", id_produto: resultado.insertId });
            } else {
                throw new Error("Ocorreu um erro ao inserir o produto.");
            };

        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "erro no servidor", messageError: error });
        };
    },

    deleteProduto: async (req, res) => {
        try {
            const id = Number(req.params.id_produto);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "ID inválido, forneça um indicador válido" })
            }
            resultado = await produtoModel.deletarProdutoporId(id);
            res.status(200).json({ message: "produto deletado com sucesso", resultado });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "erro no servidor", messageError: error });
        }
    },

    /**
     * Função para atualizar um produto pelo ID.
     * Rota: PUT /produtos/:id_produto
     * @async
     * @function AtualizarProduto Função para atualizar um produto pelo ID.
     * Altera a descrição e o valor do produto correspondente ao ID fornecido.
     * @param {Request} req 
     * @param {Response} res 
     * @returns <promise<object>>} Retorna o resultado da alteração do produto.
     * 
     * @example
     * // Requisição para alterar o produto com ID 2
     * PUT /produtos/2
     * { "descricao": "monitor", "valor": 500.0 }
     * 
     * // Resposta HTTP
     * {
     *   "message": "produto alterado com sucesso",
     *   "resultado": {
     *    fieldCount: 0,
     *    affectedRows: 1,
     *    insertId: 0,
     *    info: '',
     *    serverStatus: 2,
     *    warningStatus: 0,
     *    ChangedRows: 1
     * }
     */
    AtualizarProduto: async (req, res) => {
        try {
            const id = Number(req.params.id_produto);
            const { descricao, valor } = req.body;
            // validacao de entrada
            if (!id || !Number.isInteger(id) || isNaN(valor) || !String(descricao) || descricao.trim().length < 3 || valor <= 0) {
                throw new Error("Dados inválidos. Forneça um ID válido, descrição com ao menos 3 caracteres e valor positivo.");
            }
            // verifica se o produto existe
            const produtoAtual = await produtoModel.selecaoPorId(id);
            if (!produtoAtual || produtoAtual.length === 0) {
                throw new Error("Produto não encontrado.");
            }
            // mantem valores antigos se novos nao forem fornecidos
            const novaDescricao = descricao.trim() ?? produtoAtual[0].descricao;
            
            const novoValor = valor ?? produtoAtual[0].valor;
            // executa a alteracao
            const resultado = await produtoModel.alterarProdutoPorId(id, novaDescricao, novoValor);
            console.log("Resultado da atualização:", resultado);
            // verifica se algum registro foi encontrado
            if (resultado.affectedRows === 0) {
                throw new Error("Produto não encontrado para atualização.");
            }
            // verifica se algo realmente mudou
            if (resultado.changedRows === 0) {
                throw new Error("Nenhuma alteração foi realizada — os dados enviados são iguais aos atuais.");
            }
            return res.status(200).json({ message: "Produto alterado com sucesso!", resultado });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro no servidor", messageError: error.message });
        }
    }

};

module.exports = { produtoController };