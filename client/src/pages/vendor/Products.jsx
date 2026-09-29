import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { deleteProduct } from "../../redux/vendorProductSlice";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector(
    (state) => state.vendorProducts.products
  );

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const productStatus = (product) => {
    if (Number(product.stock) === 0) return "Out of Stock";
    if (Number(product.stock) < 10) return "Low Stock";
    return product.status || "Active";
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.brand || ""} ${product.category}`.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All Categories" ||
      product.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All Status" ||
      productStatus(product) === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      dispatch(deleteProduct(id));
    }
  };

  const totalProducts = products.length;

  const activeProducts = products.filter(
    (product) => product.status === "Active"
  ).length;

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock < 10
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.stock === 0
  ).length;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="mb-2 font-medium text-orange-500">
                Vendor Panel
              </p>

              <h1 className="text-4xl font-bold">
                Products
              </h1>

              <p className="mt-3 text-gray-600">
                Manage your store products and pricing.
              </p>
            </div>

            <Link
              to="/vendor/products/add"
              className="rounded-lg bg-orange-500 px-5 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
            >
              + Add Product
            </Link>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Products"
            value={totalProducts}
          />

          <StatCard
            title="Active Products"
            value={activeProducts}
          />

          <StatCard
            title="Low Stock"
            value={lowStockProducts}
          />

          <StatCard
            title="Out of Stock"
            value={outOfStockProducts}
          />
        </div>

        {/* Search & Filters */}
        <div className="mt-8 rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-orange-500"
            >
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Sports</option>
              <option>Home & Living</option>
              <option>Beauty</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-orange-500"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-sm">
          <div className="border-b p-6">
            <h2 className="text-xl font-bold">
              Your Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage products available in your store.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50">
                <tr className="border-b text-left text-sm text-gray-500">
                  <th className="px-6 py-4 font-medium">
                    Product
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Category
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Price
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Stock
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Sold
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    {/* Product */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        {product.image ? <img src={product.image} alt="" className="h-12 w-12 rounded-lg object-cover" /> : <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">Image</div>}

                        <div>
                          <p className="font-medium">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            ID: #{product.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-5 text-gray-600">
                      {product.category}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5 font-semibold">
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </td>

                    {/* Stock */}
                    <td className="px-6 py-5">
                      <span
                        className={
                          product.stock === 0
                            ? "font-semibold text-red-500"
                            : product.stock < 10
                            ? "font-semibold text-orange-500"
                            : "text-gray-700"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>

                    {/* Sold */}
                    <td className="px-6 py-5">
                      {product.sold || 0}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <ProductStatus
                        status={productStatus(product)}
                      />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/vendor/products/edit/${product.id}`
                            )
                          }
                          className="rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(product.id)
                          }
                          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-4xl">
                🔍
              </div>

              <h3 className="mt-3 text-lg font-semibold">
                No products found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Try searching for another product.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* Stat Card */

function StatCard({ title, value }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}

/* Product Status */

function ProductStatus({ status }) {
  const statusStyles = {
    Active: "bg-green-100 text-green-700",
    "Low Stock": "bg-orange-100 text-orange-700",
    "Out of Stock": "bg-red-100 text-red-700",
    Draft: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        statusStyles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default Products;
