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
            const resultado = await clienteModel.selecionarClientePorId(id);
            res.status(200).json({ message: "cliente encontrado", resultado });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "erro no servidor", messageError: error });
        }

    },

    inserirNovoCliente: async (req,res) => {
        try {
            const {cliente_nome, CPF} = req.body;
            if (!cliente_nome || !CPF) {
                return res.status(400).json({message : "Dados incompletos, forneça nome e CPF do cliente"})
            }
        } catch (error) {
            
        }
    }
};

module.exports = {clienteController};