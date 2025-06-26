const productNameInput = document.getElementById('product-name');
const productPriceInput = document.getElementById('product-price');
const productQuantityInput  = document.getElementById('product-quantity');
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


addProductButton.addEventListener("click", () => {
    const name = productNameInput.value.trim();
    const price = parseFloat(productPriceInput.value);
    let quantity = parseInt(productQuantityInput.value);

    if (!name || isNaN(price) || price <= 0 || isNaN(quantity) || quantity < 1) {
        alert('Please check your product details!');
        return;
    }

    const item = document.createElement('li');
    const totalItemPrice = price * quantity;


    item.dataset.price = totalItemPrice;
    item.innerHTML = `
        <strong>${name}</strong> - $${price.toFixed(2)} x 
        <input type="number" value="${quantity}" min="1" class="quantity-input"> = 
        $<span class="item-total">${totalItemPrice.toFixed(2)}</span>
        <button class="remove-button">Remove</button>
    `;

    cart.appendChild(item);
    updateTotalPrice(totalItemPrice);

    productNameInput.value = '';
    productPriceInput.value = '';
    productQuantityInput.value = '';

    const quantityInput = item.querySelector('.quantity-input');
    quantityInput.addEventListener('change', (e) => updateQuantity(e, price, item));

    const removeButton = item.querySelector('.remove-button');
    removeButton.addEventListener('click', removeItem);
});


function updateQuantity(changeEvent, unitPrice, cartItemElement) {
    let updatedQuantity = parseInt(changeEvent.target.value);
    if (isNaN(updatedQuantity) || updatedQuantity < 1) {
        updatedQuantity = 1;
        changeEvent.target.value = 1;
    }

    const previousItemTotal = parseFloat(cartItemElement.dataset.price);
    const calculatedItemTotal = unitPrice * updatedQuantity;

    cartItemElement.dataset.price = calculatedItemTotal;
    cartItemElement.querySelector('.item-total').textContent = calculatedItemTotal.toFixed(2);

    updateTotalPrice(calculatedItemTotal - previousItemTotal);
}