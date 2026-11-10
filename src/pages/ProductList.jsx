import useFetch from "../hooks/useFetch";
import { fetchProducts } from "../api/productsApi";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const { loading, error, data: products } = useFetch(fetchProducts, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  if (products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div>
      <h2>Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;