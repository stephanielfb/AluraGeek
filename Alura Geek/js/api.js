document.addEventListener('DOMContentLoaded'), function() {
    let products = [];

    const productList = document.getElementById('product-list');
    const productForm = document.getElementById('product-form');
    const productNameInput = document.getElementById('product-name');
    const productDescriptionInput = document.getElementById('product-description');
    const productPriceInput = document.getElementById('product-price');
    const errorDisplay = document.getElementById('error-display');
}

    function fetchProducts() {
        fetch('https://api.example.com/products')
    }