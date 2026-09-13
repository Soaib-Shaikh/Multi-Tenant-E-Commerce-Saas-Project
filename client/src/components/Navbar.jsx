import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          ShopSaaS
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-gray-600">
            Home
          </Link>

          <Link to="/products" className="hover:text-gray-600">
            Products
          </Link>

          <Link to="/cart" className="hover:text-gray-600">
            Cart
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;