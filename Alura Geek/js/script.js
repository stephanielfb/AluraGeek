document.addEventListener('DOMContentLoaded', function() {
    let products = [
        { id: 1, name: 'Mouse Gamer', description: 'Um mouse gamer com alta precisão.', price: 150.00 },
        { id: 2, name: 'Teclado Mecânico', description: 'Teclado mecânico com iluminação RGB.', price: 300.00 }
    ];

    const productList = document.getElementById('product-list');
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productDescriptionInput = document.getElementById('product-description');
    const productPriceInput = document.getElementById('product-price');
    const errorDisplay = document.getElementById('error-display');

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Preço: R$ ${product.price.toFixed(2)}</p>
                </div>
                <button class="delete-btn" data-id="${product.id}">Excluir</button>
            `;
            productList.appendChild(li);
        });
    }

    function validateForm() {
        const nameValue = productNameInput.value.trim();
        const descriptionValue = productDescriptionInput.value.trim();
        const priceValue = parseFloat(productPriceInput.value);

        if (nameValue === '' || descriptionValue === '' || isNaN(priceValue) || priceValue <= 0) {
            errorDisplay.textContent = 'Por favor, preencha todos os campos corretamente.';
            return false;
        }

        return true;
    }

    productForm.addEventListener('submit', function(event) {
        event.preventDefault();

        if (validateForm()) {
            const newProduct = {
                id: products.length ? products[products.length - 1].id + 1 : 1,
                name: productNameInput.value,
                description: productDescriptionInput.value,
                price: parseFloat(productPriceInput.value)
            };

            products.push(newProduct);
            renderProducts();
            productForm.reset();
            errorDisplay.textContent = '';
        }
    });

    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const productId = parseInt(event.target.dataset.id);
            products = products.filter(product => product.id !== productId);
            renderProducts();
        }
    });

    renderProducts();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productDetails = document.getElementById('product-details');

    if (productDetails && productId) {
        const product = products.find(p => p.id === parseInt(productId));
        if (product) {
            productDetails.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Preço: R$ ${product.price.toFixed(2)}</p>
            `;
        } else {
            productDetails.innerHTML = '<p>Produto não encontrado.</p>';
        }
    }
});
