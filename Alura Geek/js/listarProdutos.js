// js/listaProdutos.js

import { excluirProduto } from './apiRequests.js';

// Função para criar um card de produto
function criarCardProduto(produto) {
    const cardProduto = document.createElement('div');
    cardProduto.classList.add('card');
    cardProduto.dataset.id = produto.id; // Define o ID do produto como um data attribute

    const imagem = document.createElement('img');
    imagem.src = produto.imagem;
    imagem.alt = `Imagem do produto ${produto.nome}`;

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('card-container--info');

    const nomeProduto = document.createElement('p');
    nomeProduto.textContent = produto.nome;

    const valorContainer = document.createElement('div');
    valorContainer.classList.add('card-container--value');

    const precoProduto = document.createElement('p');
    precoProduto.textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;

    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btn-excluir');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', async () => {
        try {
            await excluirProduto(produto.id);
            cardProduto.remove();
            console.log(`Produto com ID ${produto.id} excluído com sucesso.`);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            // Tratar erro de forma adequada na sua aplicação
        }
    });

    valorContainer.appendChild(precoProduto);
    valorContainer.appendChild(btnExcluir);

    infoContainer.appendChild(nomeProduto);
    infoContainer.appendChild(valorContainer);

    cardProduto.appendChild(imagem);
    cardProduto.appendChild(infoContainer);

    return cardProduto;
}

// Supondo que você tenha uma função para buscar e listar os produtos
async function listarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/produtos');
        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }
        const produtos = await response.json();
        const listaProdutosElement = document.getElementById('lista-produtos');
        listaProdutosElement.innerHTML = ''; // Limpa a lista atual de produtos
        produtos.forEach(produto => {
            const cardProduto = criarCardProduto(produto);
            listaProdutosElement.appendChild(cardProduto);
        });
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        // Tratar erro de forma adequada na sua aplicação
    }
}

listarProdutos(); // Chama a função para listar os produtos ao carregar a página
