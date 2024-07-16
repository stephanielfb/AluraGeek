function buscarProdutos() {
    fetch('http://localhost:3000/produtos')
      .then(response => response.json())
      .then(data => {
        const listaProdutos = document.getElementById('lista-produtos');
        listaProdutos.innerHTML = '';
        data.forEach(produto => {
          const itemProduto = document.createElement('li');
          itemProduto.textContent = `${produto.nome} - R$ ${produto.preco}`;
          listaProdutos.appendChild(itemProduto);
        });
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }
  
  function adicionarProduto() {
    const novoProduto = {
      nome: 'Monitor Gamer',
      preco: 899.99,
      descricao: 'Monitor widescreen com taxa de atualização de 144Hz'
    };
  
    fetch('http://localhost:3000/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoProduto)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Produto adicionado:', data);

      buscarProdutos();
    })
    .catch(error => {
      console.error('Erro ao adicionar produto:', error);
    });
  }
  
function validarFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const preco = document.getElementById('preco').value.trim();
    const descricao = document.getElementById('descricao').value.trim();
  
    if (nome === '' || preco === '' || descricao === '') {
      alert('Por favor, preencha todos os campos.');
      return false;
    }
  
    if (isNaN(parseFloat(preco))) {
      alert('O campo preço deve ser um número válido.');
      return false;
    }
  
    return true;
  }
  
  const formulario = document.getElementById('form-novo-produto');
  formulario.addEventListener('submit', function(event) {
    event.preventDefault();
  
    if (validarFormulario()) {
      adicionarProduto();
    }
  });
  
function renderizarProdutos(produtos) {
    const listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = '';

    produtos.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('card');

        const imagem = document.createElement('img');
        imagem.src = produto.imagem; 
        imagem.alt = 'Imagem do produto';
        card.appendChild(imagem);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('card-container--info');

        const nomeProduto = document.createElement('p');
        nomeProduto.textContent = produto.nome;
        infoContainer.appendChild(nomeProduto);

        const valueContainer = document.createElement('div');
        valueContainer.classList.add('card-container--value');

        const precoProduto = document.createElement('p');
        precoProduto.textContent = `Preço: $${produto.preco.toFixed(2)}`; 
        valueContainer.appendChild(precoProduto);

        const iconeExclusao = document.createElement('img');
        iconeExclusao.src = 'caminho/para/icono-de-eliminacao';
        iconeExclusao.alt = 'Ícone de exclusão';
        valueContainer.appendChild(iconeExclusao);

        infoContainer.appendChild(valueContainer);
        card.appendChild(infoContainer);

        listaProdutos.appendChild(card);
    });
}

import { getProdutos } from './js/apiRequests.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const produtos = await getProdutos();
        console.log('Produtos obtidos:', produtos);

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
});
