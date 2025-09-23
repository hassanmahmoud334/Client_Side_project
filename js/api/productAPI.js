const API_URL = "https://fakestoreapi.com/products";

const categoryMap = {
  "men's clothing": "Men",
  "women's clothing": "Women",
  "jewelery": "Accessories",
  "electronics": "Other"
};

export async function fetchProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.map(product => ({
    ...product,
    mappedCategory: categoryMap[product.category] || "Other"
  }));
}