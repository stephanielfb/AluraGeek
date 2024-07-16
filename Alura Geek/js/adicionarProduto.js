import { criarProduto } from './apiRequests.js';

const formAdicionarProduto = document.getElementById('form-adicionar-produto');

formAdicionarProduto.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const imagem = document.getElementById('imagem').value;

    const novoProduto = {
        nome: nome,
        preco: preco,
        imagem: imagem
    };

    try {
        const produtoAdicionado = await criarProduto(novoProduto);
        console.log('Produto adicionado:', produtoAdicionado);

        // Limpar formulário ou atualizar lista de produtos, conforme necessário
        formAdicionarProduto.reset();
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        // Tratar erro de forma adequada na sua aplicação
    }
});
