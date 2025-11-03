const {clienteModel} = require('../models/clienteModel');
const clienteController = {
    selecionaTodosClientes: async (req, res) => {
        try {
            const resultado = await clienteModel.selecionaTodosClientes();
            if (!resultado || resultado.length === 0) {
                return res.status(200).json({ message: 'a lista de clientes está vazia' });
            }
            res.status(200).json({ message: 'resultado dos dados listados', resultado });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
        }
    },

    selecionarClientePorId: async (req, res) =>{
        try {
            const id = Number(req.params.id_cliente);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "ID inválido, forneça um id valido" });

            }
            const resultado = await clienteModel.SelectionaClientePorId(id);
            res.status(200).json({ message: "cliente encontrado", resultado });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "erro no servidor", messageError: error });
        }

    },

    selecionarClientePorCPF: async (req, res) => {
        try {
            const { CPF } = req.params;
            if (!CPF) {
                return res.status(400).json({ message: "CPF inválido, forneça um CPF valido" });
            }
            const resultado = await clienteModel.selecionarClientePorCPF(CPF);
            res.status(200).json({ message: "cliente encontrado", resultado });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ message: "erro no servidor", messageError: error });
        }
    },

    inserirNovoCliente: async (req,res) => {
        try {
            // Extrai os dados do corpo da requisição
            const {cliente_nome, CPF} = req.body;
            if (!cliente_nome || !CPF) {
                return res.status(400).json({message : "Dados incompletos, forneça nome e CPF do cliente"})
            }
            // Verifica se o cliente já existe pelo CPF
            const verificaCliente = await clienteModel.selecionarClientePorCPF(CPF);
            if (verificaCliente) {
                return res.status(409).json({message: "CPF já cadastrado no sistema"})
            }
            // Insere o novo cliente
            const resultado = await clienteModel.inserirNovoCliente(cliente_nome, CPF);
            res.status(201).json({message: "Cliente inserido com sucesso", resultado});

        } catch (error) {
            console.error(error);
            res.status(500).send({message: "erro no servidor", messageError: error});
        }
    }
};

module.exports = {clienteController};