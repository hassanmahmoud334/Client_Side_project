import { initNavbar } from './components/navbar.js';
import { fetchProducts} from "./api/productAPI.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
});

const productGrid = document.querySelector(".products-grid");
const categoryFilter = document.querySelector("#category-filter");
const searchInput = document.querySelector("#search");
let allProducts = [];

function renderProducts(products) {
  productGrid.innerHTML = "";

  if (products.length === 0) {
    productGrid.innerHTML = "<p>No products found</p>";
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p class="price">$${product.price.toFixed(2)}</p>
      <p class="category">${product.mappedCategory}</p>
      <button>Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}
function filterProducts() {
  const selectedCategory = categoryFilter.value;
  const searchQuery = searchInput.value.toLowerCase();

  let filtered = allProducts;

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.mappedCategory === selectedCategory);
  }

  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchQuery)
    );
  }

  renderProducts(filtered);
}

// Init
async function init() {
  allProducts = await fetchProducts();
  renderProducts(allProducts);

  categoryFilter.addEventListener("change", filterProducts);
  searchInput.addEventListener("input", filterProducts);
}

init();