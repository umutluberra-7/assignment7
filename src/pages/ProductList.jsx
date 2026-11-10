import { useSearchParams } from "react-router";
import useFetch from "../hooks/useFetch";
import { fetchProducts } from "../api/productsApi";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const { loading, error, data: products } = useFetch(fetchProducts, []);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "";

  function updateParam(key, value) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value) {
          next.set(key, value);
        } else {
          next.delete(key);
        }
        return next;
      },
      { replace: true }
    );
  }

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  const categories = [...new Set(products.map((p) => p.category))].sort();

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesCategory = category === "" || product.category === category;
    return matchesTitle && matchesCategory;
  });

  return (
    <div>
      <h2>Products</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={query}
          onChange={(e) => updateParam("q", e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products match your filters.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;