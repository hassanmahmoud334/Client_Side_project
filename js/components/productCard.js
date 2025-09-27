import { addToCart, updateCartCount } from "../pages/cart.js";
import { toggleFavorite, isFavorite } from "../pages/favorites.js";

export function renderProductCard(product) {
  const div = document.createElement("div");
  div.classList.add("product");
  const productData = {
    id: product.id,
    name: product.title,
    price: product.price,
    img: product.image
  };
  div.innerHTML = `
    <i class="fav-icon fa-heart ${isFavorite(product.id) ? "fa-solid active" : "fa-regular"}" 
       data-id="${product.id}"></i>
    <img src="${product.image}" alt="${product.title}">
    <h3>${product.title}</h3>
    <p>$${product.price}</p>
    <button class="cart-btn">QUICK ADD +</button>
  `;
  const cartBtn = div.querySelector(".cart-btn");
  cartBtn.addEventListener("click", () => {
    addToCart(productData);
    updateCartCount();
  });

  div.querySelector(".fav-icon").addEventListener("click", e => {
    toggleFavorite(productData);
    e.target.classList.toggle("fa-regular");
    e.target.classList.toggle("fa-solid");
    e.target.classList.toggle("active");
  });

  return div;
}
