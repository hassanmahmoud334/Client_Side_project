import { saveData, loadData } from "../utils/storage.js";
import { initNavbar } from '../components/navbar.js';

let cart = loadData("cart") || [];
let cartItemsContainer, subtotalEl, taxEl, totalEl;

function initCartElements() {
  cartItemsContainer = document.getElementById("cartItems");
  subtotalEl = document.getElementById("subtotal");
  taxEl = document.getElementById("tax");
  totalEl = document.getElementById("total");
}

function renderCart() {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty">Cart is empty</p>';
    updateSummary();
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.setAttribute("data-index", index);
    div.innerHTML = `
      <div class="cart-item-details">
        <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-info">
          <span>${item.name}</span>
          <small>$${item.price}</small>
        </div>
      </div>
      <div class="cart-actions">
        <input type="number" min="1" value="${item.qty}" class="qty-input">
        <button class="remove-btn">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);

    div.querySelector(".qty-input").addEventListener("change", e => {
      updateQty(index, e.target.value);
    });
    div.querySelector(".remove-btn").addEventListener("click", () => {
      removeItem(index);
    });
  });

  updateSummary();
  updateCartCount();
}

export function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  renderCart();
  updateCartCount()
}

function updateQty(index, newQty) {
  cart[index].qty = parseInt(newQty) || 1;
  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
  updateCartCount()
}

function updateSummary() {
  if (!subtotalEl || !taxEl || !totalEl) return;
  let subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  let tax = subtotal * 0.1;
  let total = subtotal + tax;
  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

function saveCart() {
  saveData("cart", cart);
}

export function updateCartCount() {
  const cartIcon = document.querySelector("#cart-count");
  if (!cartIcon) return;
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  cartIcon.textContent = count;
}

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initCartElements();
  updateCartCount();
  renderCart();

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) checkoutBtn.addEventListener("click", ()=>{
    window.location.href = "checkout.html";
});
});
