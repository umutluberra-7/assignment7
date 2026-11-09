import { Link } from "react-router";

function NotFound() {
  return (
    <div>
      <h2>Page not found</h2>
      <Link to="/">Go back home</Link>
    </div>
  );
}

export default NotFound;