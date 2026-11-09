const BASE_URL = "https://dummyjson.com/products";

export async function fetchProducts(signal) {
  const response = await fetch(`${BASE_URL}?limit=100`, { signal });

  if (!response.ok) {
    throw new Error(`Could not load products (status ${response.status})`);
  }

  const data = await response.json();
  return data.products;
}

export async function fetchProduct(id, signal) {
  const response = await fetch(`${BASE_URL}/${id}`, { signal });

  if (response.status === 404) {
    throw new Error("Product not found");
  }

  if (!response.ok) {
    throw new Error(`Could not load product (status ${response.status})`);
  }

  return response.json();
}