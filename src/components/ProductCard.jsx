import { Link } from "react-router";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <Link to={`/products/${product.id}`}>View details</Link>
    </div>
  );
}

export default ProductCard;