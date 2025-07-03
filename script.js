const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productQuantityInput = document.getElementById('product-quantity');
const addProductButton = document.getElementById('add-product');
const cart = document.getElementById('cart');
const totalPriceSpan = document.getElementById('total-price');

let totalPrice = 0;

// Function to update the total price
function updateTotalPrice(amount) {
    totalPrice += amount;
    totalPriceSpan.textContent = totalPrice.toFixed(2);
}

// Function to remove an item
function removeItem(event) {
    const item = event.target.closest('li');
    const price = parseFloat(item.dataset.price);
    updateTotalPrice(-price);
    item.remove();
}

//Function to add products to cart
function addProductsToCart() {
    const productName = productNameInput.value.trim();
    const productPrice = parseFloat(productPriceInput.value);
    const productQuantity = parseInt(productQuantityInput.value);

    //Validate product details
    if (productName === '') {
        alert('Please enter a product name!');
        return;
    }

    if (productPriceInput.value === '' || productPrice <= 0) {
        alert('Please enter a price greater than 0!');
        return;
    }

    if (productQuantityInput.value === '' || productQuantity < 1) {
        alert('Please enter a quantity of at least 1!');
        return;
    }

    const productsTotalPrice = productPrice * productQuantity;

    const newProduct = document.createElement('li');
    newProduct.classList.add('cart-item');
    newProduct.dataset.price = productsTotalPrice;

    newProduct.innerHTML = `
    <span>${productName}:  $${productPrice.toFixed(2)} × ${productQuantity} = $${productsTotalPrice.toFixed(2)}</span>
    <button class="remove"> Remove </button>
    `;


    const removeButton = newProduct.querySelector('.remove');
    removeButton.addEventListener('click', removeItem);

    cart.appendChild(newProduct);

    updateTotalPrice(productsTotalPrice);

    //Clear input fields
    productNameInput.value = '';
    productPriceInput.value = '';
    productQuantityInput.value = '';

}


addProductButton.addEventListener('click', addProductsToCart);
