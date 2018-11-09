/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var tableEl = document.getElementById('cart').childNodes[3];
  while (tableEl.firstChild) {
    tableEl.removeChild(tableEl.firstChild);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // TODO: Find the table body
  var tbodyEl = document.getElementById('cart').childNodes[3];

  // TODO: Iterate over the items in the cart
  for (var count = 0; count<cart.items.length; count++) {
    // TODO: Create a TR
    var tbrEl = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    var deleteLink = document.createElement('td');
    deleteLink.textContent = 'x';
    deleteLink.name = cart.items[count][0];
    tbrEl.appendChild(deleteLink);
    var quanityEl = document.createElement('td');
    var productEl = document.createElement('td');
    quanityEl.textContent = cart.items[count].quantity;
    productEl.textContent = cart.items[count].product;
    tbrEl.appendChild(quanityEl);
    tbrEl.appendChild(productEl);
    tbodyEl.appendChild(tbrEl);
  }
  // TODO: Add the TR to the TBODY and each of the TD's to the TR
}

function removeItemFromCart(event) {
  event.preventDefault();
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  console.log('inside removeItemFromCart');
  var whichDelete = event.target.name;
  console.log('whichDelete',whichDelete);
  for (var whichOne in cart.items) {
    if (event.target.name === cart.items[whichOne][0]) {
      cart.items.splice(whichOne, 1);
    }
  }
  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();