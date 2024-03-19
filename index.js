const express = require('express');
const server = express();
const fs = require('fs');
const dados = require('./dados.json');

server.use(express.json());

server.get('/', (req, res) => {
return res.json({mensagem: 'Nossa API está funcionando'});
});

server.listen(3000, () =>{
console.log("Servidor está funcionando!");
});

server.get('/medicamento', (req, res) => {
    return res.json(dados.Medicamento);
});

server.get('/cliente', (req, res) => {
    return res.json(dados.Cliente);
});

server.get('/fornecedor', (req, res) => {
    return res.json(dados.Fornecedor);
});

server.get('/venda', (req, res) => {
    return res.json(dados.Venda);
});

//Adicionar
server.post("/medicamento", (req, res) => {
    const novoMedicamento = req.body;

    if (!novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente."});
    } else {
        dados.Medicamento.push(novoMedicamento);
        salvarDados(dados);

        return res.status(201).json({mensagem: "Dados completos, cadastro feito com sucesso."})
    }
});

server.post("/cliente", (req, res) => {
    const novoCliente = req.body;

    if (!novoCliente.nome || !novoCliente.endereco || !novoCliente.email || !novoCliente.telefone) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente."});
    } else {
        dados.Cliente.push(novoCliente);
        salvarDados(dados);

        return res.status(201).json({mensagem: "Dados completos, cadastro feito com sucesso."})
    }
});

server.post("/fornecedor", (req, res) => {
    const novoFornecedor = req.body;

    if (!novoFornecedor.nome || !novoFornecedor.endereco || !novoFornecedor.telefone) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente."});
    } else {
        dados.Fornecedor.push(novoFornecedor);
        salvarDados(dados);

        return res.status(201).json({mensagem: "Dados completos, cadastro feito com sucesso."})
    }
});

server.post("/venda", (req, res) => {
    const novaVenda = req.body;

    if (!novaVenda.data || !novaVenda.id_medicamento || !novaVenda.id_cliente) {
        return res.status(400).json({mensagem: "Dados incompletos, tente novamente."});
    } else {
        dados.Venda.push(novaVenda);
        salvarDados(dados);

        return res.status(201).json({mensagem: "Dados completos, cadastro feito com sucesso."})
    }
});

//Alterar Informações
server.put('/medicamento/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id)
    const atualizarMed = req.body

    const indiceMedicamento = dados.Medicamento.findIndex(m => m.id === medicamentoId)

    if(indiceMedicamento === -1){
        return res.status(404).json({mensagem: "Medicamento não encontrado"})
    }else{
        dados.Medicamento[indiceMedicamento].nome = atualizarMed.nome || dados.Medicamento[indiceMedicamento].nome
        dados.Medicamento[indiceMedicamento].fabricante = atualizarMed.fabricante || dados.Medicamento[indiceMedicamento].fabricante
        dados.Medicamento[indiceMedicamento].preco = atualizarMed.preco || dados.Medicamento[indiceMedicamento].preco
        dados.Medicamento[indiceMedicamento].quantidade = atualizarMed.quantidade || dados.Medicamento[indiceMedicamento].quantidade
        salvarDados(dados)
        return res.status(201).json({mensagem: "Dados completos, cadastro feito com sucesso."})
    }
})

server.put('/cliente/:id', (req, res) => {
    const clienteId = parseInt(req.params.id)
    const atualizarCliente = req.body

    const indiceCliente = dados.Cliente.findIndex(c => c.id === clienteId)

    if(indiceCliente === -1){
        return res.status(404).json({mensagem: "Cliente não encontrado"})
    }else{
        dados.Cliente[indiceCliente].nome = atualizarCliente.nome || dados.Cliente[indiceCliente].nome
        dados.Cliente[indiceCliente].endereco = atualizarCliente.endereco || dados.Cliente[indiceCliente].endereco
        dados.Cliente[indiceCliente].email = atualizarCliente.email || dados.Cliente[indiceCliente].email
        dados.Cliente[indiceCliente].telefone = atualizarCliente.telefone || dados.Cliente[indiceCliente].telefone
        salvarDados(dados)
        return res.status(201).json({mensagem: "Dados completos, cadastro feito com sucesso."})
    }
})

server.put('/fornecedor/:id', (req, res) => {
    const fornecedorId = parseInt(req.params.id)
    const atualizarFor = req.body

    const indiceFornecedor = dados.Fornecedor.findIndex(f => f.id === fornecedorId)

    if(indiceFornecedor === -1){
        return res.status(404).json({mensagem: "Fornecedor não encontrado"})
    }else{
        dados.Fornecedor[indiceFornecedor].nome = atualizarFor.nome || dados.Cliente[indiceFornecedor].nome
        dados.Fornecedor[indiceFornecedor].endereco = atualizarFor.endereco || dados.Cliente[indiceFornecedor].endereco
        dados.Fornecedor[indiceFornecedor].telefone = atualizarFor.telefone || dados.Cliente[indiceFornecedor].telefone
        salvarDados(dados)
        return res.status(201).json({mensagem: "Dados completos, cadastro feito com sucesso."})
    }
})

server.put('/venda/:id', (req, res) => {
    const vendaId = parseInt(req.params.id)
    const atualizarVenda = req.body

    const indiceVenda = dados.Venda.findIndex(v => v.id === vendaId)

    if(indiceVenda === -1){
        return res.status(404).json({mensagem: "Venda não encontrada"})
    }else{
        dados.Venda[indiceVenda].data = atualizarVenda.data || dados.Venda[indiceVenda].data
        dados.Venda[indiceVenda].id_medicamento = atualizarVenda.id_medicamento || dados.Venda[indiceVenda].id_medicamento
        dados.Venda[indiceVenda].id_cliente = atualizarVenda.id_cliente || dados.Venda[indiceVenda].id_cliente
        salvarDados(dados)
        return res.status(201).json({mensagem: "Dados completos, cadastro feito com sucesso."})
    }
})

//DELETE
server.delete('/medicamento/:id', (req, res) => {
    const id = parseInt(req.params.id);

    //filtrar os Medicamento, removendo pelo id 

    dados.Medicamento = dados.Medicamento.filter(m => m.id !== id)

    salvarDados(dados);

    return res.status(200).json({mensagem: "Medicamento excluido com sucesso."})
});

server.delete('/cliente/:id', (req, res) => {
    const id = parseInt(req.params.id);

    //filtrar os Cliente, removendo pelo id 

    dados.Cliente = dados.Cliente.filter(c => c.id !== id)

    salvarDados(dados);

    return res.status(200).json({mensagem: "Cliente excluido com sucesso."})
});

server.delete('/fornecedor/:id', (req, res) => {
    const id = parseInt(req.params.id);

    //filtrar os fornecedor, removendo pelo id 

    dados.Fornecedor = dados.Fornecedor.filter(f => f.id !== id)

    salvarDados(dados);

    return res.status(200).json({mensagem: "Fornecedor excluido com sucesso."})
});

server.delete('/venda/:id', (req, res) => {
    const id = parseInt(req.params.id);

    //filtrar os venda, removendo pelo id 

    dados.Venda = dados.Venda.filter(v => v.id !== id)

    salvarDados(dados);

    return res.status(200).json({mensagem: "Venda excluido com sucesso."})
});

function salvarDados(){
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dados, null, 2));
};