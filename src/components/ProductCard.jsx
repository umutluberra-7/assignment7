import { Link } from "react-router";
import { useCartStore } from "../store/cartStore";

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <Link to={`/products/${product.id}`}>View details</Link>
      <button onClick={() => addItem(product)}>Add to cart</button>
    </div>
  );
}

export default ProductCard;