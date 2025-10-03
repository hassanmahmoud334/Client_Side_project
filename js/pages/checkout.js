import { loadData, saveData } from "../utils/storage.js";
import { initNavbar } from '../components/navbar.js';

let cart = loadData("cart") || [];

document.addEventListener("DOMContentLoaded", ()=>{
initNavbar()
});

function renderCartSummary() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.name}" width="50">
      <span>${item.name} (x${item.qty})</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const message = document.getElementById("order-message");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !address) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";
    return;
  }
  if (!emailRegex.test(email)) {
    message.textContent = "Please enter a valid email address.";
    message.style.color = "red";
    return;
  }
  message.textContent = `Thank you ${name}! Your order has been placed successfully.`;
  message.style.color = "green";

  cart = [];
  saveData("cart", cart);
  renderCartSummary();

  e.target.reset();
});

renderCartSummary();
