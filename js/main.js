import { initNavbar } from './components/navbar.js';
import { fetchProducts } from "./api/productAPI.js";
import { renderProducts } from "./pages/products.js";
import { renderFavorites } from "./pages/favorites.js";
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
});

async function init() {
  const products = await fetchProducts(6);
  renderProducts(products);
  renderFavorites();
}

document.addEventListener("DOMContentLoaded", init);                              
