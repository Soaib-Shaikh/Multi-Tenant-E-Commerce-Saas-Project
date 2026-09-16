import { useState } from "react";
import ProductGrid from "../../components/product/ProductGrid";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1999,
    category: "Sports",
  },
  {
    id: 4,
    name: "Travel Backpack",
    price: 1299,
    category: "Fashion",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 3499,
    category: "Electronics",
  },
  {
    id: 6,
    name: "Cotton T-Shirt",
    price: 799,
    category: "Fashion",
  },
  {
    id: 7,
    name: "Water Bottle",
    price: 599,
    category: "Sports",
  },
  {
    id: 8,
    name: "Table Lamp",
    price: 1499,
    category: "Home & Living",
  },
];

function Products() {
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Living",
    "Sports",
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <p className="font-medium text-gray-500">ShopSaaS</p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            All Products
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Explore products from different stores and find everything you
            need in one place.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                category === item
                  ? "bg-black text-white"
                  : "border bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Result count */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {category === "All" ? "All Products" : category}
          </h2>

          <p className="text-sm text-gray-500">
            {filteredProducts.length} products
          </p>
        </div>

        <ProductGrid products={filteredProducts} />
      </section>
    </main>
  );
}

export default Products;