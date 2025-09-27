import { initNavbar } from './components/navbar.js';
import { fetchProducts } from "./api/productAPI.js";
import { renderProducts, renderCategories, searchProducts, setAllProducts } from "./pages/products.js";
import { renderFavorites } from "./pages/favorites.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
});

async function init() {
  const products = await fetchProducts();
  setAllProducts(products);
  renderCategories(products);
  renderProducts(products);
  renderFavorites();
  const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", (e) => {
      searchProducts(e.target.value);
    });
}
document.addEventListener("DOMContentLoaded", init);
