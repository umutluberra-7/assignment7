import { Link } from "react-router";

function Home() {
  return (
    <div>
      <h2>Welcome to the Online Shop</h2>
      <p>Browse our catalogue, filter products and add them to your cart.</p>
      <Link to="/products">Go to products →</Link>
    </div>
  );
}

export default Home;