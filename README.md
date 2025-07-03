1. How did you dynamically create and append new elements to the DOM?  

I used document.createElement('li') to create a new list item for each product that gets added to the cart. Then, I used innerHTML with template literals to insert the product name, unit price, quantity, and total price all in one go. I also added a data-price attribute using dataset.price to store the total price of the item so I could use it later when removing items. After that, I added the new product to the cart using appendChild() and attached an event listener to the “Remove” button so users could delete items from the cart.

2. What steps did you take to ensure accurate updates to the total price?

I created a separate function called updateTotalPrice(amount) to manage all price changes. This made it simple to either add or subtract values from the total. When an item is added, I pass the total cost of that product line (price × quantity) as a positive number. When an item is removed, I grab the stored data-price from that item and pass it as a negative number to subtract it from the total. I also used toFixed(2) to make sure the total always displays with two decimal places.

3. How did you handle invalid input for product name or price?

I used validation inside the addProductsToCart() function to check that all the fields were correctly filled out. I used trim() on the product name to make sure it wasn’t just empty spaces. Then I used parseFloat() for price and parseInt() for quantity to convert them into numbers. I checked if any values were missing, zero, or negative.

4. What challenges did you face when implementing the remove functionality?

One tricky part was figuring out how to target the entire <li> element when the remove button is clicked. I used event.target.closest('li') to find the parent list item that contains the product. I had already stored the product's total price using data-price, so I could subtract that from the total price when removing the item. It was also important to make sure the removeItem() function was attached to the remove button after creating the element, since the buttons are added dynamically.