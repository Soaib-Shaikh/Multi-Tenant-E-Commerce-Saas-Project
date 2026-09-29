import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/cartSlice";
import Toast from "../../components/common/Toast";
import { products } from "../../data/products";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vendorProducts = useSelector((state) => state.vendorProducts.products);
  const catalog = [...products, ...vendorProducts.filter((product) => !products.some((item) => String(item.id) === String(product.id)))];

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Sports",
    "Home & Living",
  ];

  const filteredProducts = catalog
    .filter((product) => {
      const matchesSearch = `${product.name} ${product.category} ${product.brand || ""}`.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;

      return 0;
    });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    setToastMessage(`${product.name} added to your cart.`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">

          <p className="font-medium text-orange-500">
            ShopSaaS Store
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Explore Products
          </h1>

          <p className="mt-4 max-w-2xl text-gray-500">
            Discover quality products from different categories,
            all in one place.
          </p>

        </div>
      </section>

      {/* Search + Sort */}
      <section className="mx-auto max-w-7xl px-6 pt-8">

        <div className="flex flex-col gap-4 md:flex-row">

          {/* Search */}
          <div className="relative flex-1">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border bg-white py-3 pl-11 pr-4 outline-none focus:border-orange-500"
            />

          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border bg-white px-4 py-3 outline-none focus:border-orange-500"
          >
            <option value="default">
              Sort By
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="rating">
              Highest Rated
            </option>
          </select>

        </div>

        {/* Categories */}
        <div className="mt-5 flex flex-wrap gap-3">

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "border bg-white text-gray-700 hover:border-orange-500 hover:text-orange-500"
              }`}
            >
              {category}
            </button>
          ))}

        </div>

      </section>

      {/* Product Count */}
      <section className="mx-auto max-w-7xl px-6 pt-8">

        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-800">
            {filteredProducts.length}
          </span>{" "}
          products
        </p>

      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-8">

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border bg-white p-16 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No Products Found
            </h2>

            <p className="mt-2 text-gray-500">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Clear Filters
            </button>

          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <Link
                  to={`/product/${product.id}`}
                  className="relative block h-56 overflow-hidden bg-gray-100"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">
                    {product.category}
                  </span>
                </Link>

                <div className="p-5">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-yellow-500">
                      ★ {product.rating}
                    </span>

                    <span className="text-xs text-green-600">
                      In Stock
                    </span>

                  </div>

                  <Link to={`/product/${product.id}`}>
                    <h2 className="mt-3 text-lg font-semibold group-hover:text-orange-500">
                      {product.name}
                    </h2>
                  </Link>

                  <div className="mt-4 flex items-center justify-between">

                    <p className="text-xl font-bold">
                      ₹{product.price}
                    </p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                    >
                      🛒 Add
                    </button>

                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="mt-3 block text-center text-sm font-medium text-gray-500 hover:text-orange-500"
                  >
                    View Details →
                  </Link>
                  <button onClick={() => { dispatch(addToCart(product)); navigate("/checkout"); }} className="mt-2 w-full rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50">Buy Now</button>

                </div>

              </div>
            ))}

          </div>
        )}

      </section>

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

    </main>
  );
}

export default Products;
