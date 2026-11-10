import { useParams, useNavigate, Link } from "react-router";
import useFetch from "../hooks/useFetch";
import { fetchProduct } from "../api/productsApi";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data: product } = useFetch(
    (signal) => fetchProduct(id, signal),
    [id]
  );

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="error">{error}</p>
        <button onClick={() => navigate("/products")}>Back to products</button>
      </div>
    );
  }

  const nextId = Number(id) + 1;

  return (
    <div className="product-detail">
      <button onClick={() => navigate("/products")}>← Back to products</button>
      <img src={product.thumbnail} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <button>Add to cart</button>
      <Link to={`/products/${nextId}`}>Next product →</Link>
    </div>
  );
}

export default ProductDetail;