export async function getProdutos() {
    try {
        const response = await fetch('http://localhost:3000/produtos');
        if (!response.ok) {
            throw new Error('Não foi possível obter os produtos');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
}

export async function criarProduto(novoProduto) {
    try {
        const response = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoProduto)
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar produto');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        throw error;
    }
}

export async function excluirProduto(id) {
    try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir produto');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        throw error;
    }
}
