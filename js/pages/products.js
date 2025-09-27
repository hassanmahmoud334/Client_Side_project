import { renderProductCard } from "../components/productCard.js";

let allProducts = [];
export function setAllProducts(products) {
  allProducts = products;
}
export function renderProducts(products) {
  const productsContainer = document.getElementById("products");
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  products.forEach(product => {
    const card = renderProductCard(product);
    productsContainer.appendChild(card);
  });
}
export function renderCategories(products) {
  const categorySelect = document.getElementById("categorySelect");
  if (!categorySelect) return;

  const categories = ["all", ...new Set(products.map(p => p.category))];

  categorySelect.innerHTML = categories
    .map(cat => `<option value="${cat}">${cat}</option>`)
    .join("");

  categorySelect.addEventListener("change", (e) => {
    filterProductsByCategory(e.target.value);
  });
}

export function filterProductsByCategory(category) {
  if (category === "all") {
    renderProducts(allProducts);
  } else {
    const filtered = allProducts.filter(prod => prod.category === category);
    renderProducts(filtered);
  }
}
export function searchProducts(query) {
  const filtered = allProducts.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
  renderProducts(filtered);
}