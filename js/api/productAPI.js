const API_URL = "https://fakestoreapi.com/products";

export async function fetchProducts(limit = 20) {
  try {
    const res = await fetch(`${API_URL}?limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}
