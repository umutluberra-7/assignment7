import { Link } from "react-router";
import { useCartStore, selectTotalPrice } from "../store/cartStore";

function Cart() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore(selectTotalPrice);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  if (items.length === 0) {
    return (
      <div>
        <h2>Your cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse products</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Your cart</h2>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <span className="cart-title">{item.title}</span>
            <span>${item.price}</span>
            <div className="quantity">
              <button onClick={() => setQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => setQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: ${totalPrice.toFixed(2)}</p>
      <button onClick={clear}>Clear cart</button>
    </div>
  );
}

export default Cart;