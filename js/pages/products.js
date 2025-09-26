import { renderProductCard } from "../components/productCard.js";

export function renderProducts(products) {
  const productsContainer = document.getElementById("products");
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  products.forEach(product => {
    const card = renderProductCard(product);
    productsContainer.appendChild(card);
  });
}
