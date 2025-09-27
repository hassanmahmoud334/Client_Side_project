import { saveData, loadData } from "../utils/storage.js";

let favorites = loadData("favorites") || [];

export function isFavorite(id) {
  return favorites.some(f => f.id === id);
}

export function toggleFavorite(product) {
  if (isFavorite(product.id)) {
    favorites = favorites.filter(f => f.id !== product.id);
  } else {
    favorites.push(product);
  }
  saveData("favorites", favorites);
  renderFavorites();
}

export function renderFavorites() {
  const favItems = document.getElementById("favItems");
  favItems.innerHTML = "";

  favorites.forEach(f => {
    const item = document.createElement("div");
    item.classList.add("fav-item");
    item.innerHTML = `
      <img src="${f.img}" alt="${f.name}">
      <p>${f.name}</p>
      <span>$${f.price}</span>
    `;
    favItems.appendChild(item);
  });
}

export function toggleFavSidebar() {
  document.getElementById("favSidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", () => {

  const favIconHeader = document.querySelector("header .favorites");
  if (favIconHeader) {
    favIconHeader.addEventListener("click", toggleFavSidebar);
  }

  const closeBtn = document.querySelector(".close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", toggleFavSidebar);
  }

  const overlay = document.getElementById("overlay");
  if (overlay) {
    overlay.addEventListener("click", toggleFavSidebar);
  }
});