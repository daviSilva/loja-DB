const { query } = require('../config/db');
const {clienteModel} = require('../models/clienteModel');
const clienteController = {
    selecionaTodosClienteseID: async (req, res) => {
    try {
        const id_cliente = req.query.id_cliente; // vem da query string
        // Se não tiver ID → busca todos os clientes
        if (!id_cliente) {
            const resultado = await clienteModel.selecionaTodosClientes();

            if (!resultado || resultado.length === 0) {
                return res.status(200).json({ message: 'A lista de clientes está vazia' });
            }

            return res.status(200).json({ message: 'Resultado dos dados listados', resultado });
        }
        // Se tiver ID → valida e busca cliente específico
        const id = Number(id_cliente);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ message: 'Parâmetro id_cliente inválido' });
        }
        const resultado = await clienteModel.SelectionaClientePorId(id);
        if (!resultado) {
            return res.status(404).json({ message: 'Cliente não encontrado' });
        }
        return res.status(200).json({ message: 'Cliente encontrado', resultado });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro no servidor', messageError: error });
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
    },

    deletarClientePorId: async (req, res) => {
        try {
            const id = Number(req.body.id_cliente);
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "ID inválido, forneça um id valido" });
            }   
            const resultado = await clienteModel.deletarCliente(id);
            res.status(200).json({ message: "cliente deletado com sucesso", resultado });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "erro no servidor", messageError: error });
        }
    },

    alterarClientePorId: async (req, res) => {
        try {
            const id = Number(req.params.id_cliente);
            const { cliente_nome, CPF } = req.body;
            if (!id || !Number.isInteger(id)) {
                return res.status(400).json({ message: "ID inválido, forneça um id valido" });
            }
            const resultado = await clienteModel.alteraCliente(id, cliente_nome, CPF);
            res.status(200).json({ message: "cliente alterado com sucesso", resultado });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "erro no servidor", messageError: error });
        }
    }
};

module.exports = {clienteController};