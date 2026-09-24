import { Link } from "react-router-dom";

function Products() {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 2499,
      stock: 32,
      sold: 124,
      status: "Active",
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: 3999,
      stock: 18,
      sold: 98,
      status: "Active",
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Sports",
      price: 1999,
      stock: 9,
      sold: 86,
      status: "Low Stock",
    },
    {
      id: 4,
      name: "Travel Backpack",
      category: "Fashion",
      price: 1299,
      stock: 25,
      sold: 64,
      status: "Active",
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 1799,
      stock: 0,
      sold: 45,
      status: "Out of Stock",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <p className="mb-2 font-medium text-gray-600">
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
  className="rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800"
>
  + Add Product
</Link>

          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Products"
            value="124"
          />

          <StatCard
            title="Active Products"
            value="118"
          />

          <StatCard
            title="Low Stock"
            value="9"
          />

          <StatCard
            title="Out of Stock"
            value="3"
          />

        </div>

        {/* Search */}
        <div className="mt-8 rounded-xl border bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row">

            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-black"
            />

            <select className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-black">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Sports</option>
              <option>Home & Living</option>
            </select>

            <select className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-black">
              <option>All Status</option>
              <option>Active</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>

          </div>

        </div>

        {/* Product Table */}
        <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full">

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

                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                          Image
                        </div>

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

                    <td className="px-6 py-5 text-gray-600">
                      {product.category}
                    </td>

                    <td className="px-6 py-5 font-medium">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-5">
                      {product.stock}
                    </td>

                    <td className="px-6 py-5">
                      {product.sold}
                    </td>

                    <td className="px-6 py-5">
                      <ProductStatus status={product.status} />
                    </td>

                    <td className="px-6 py-5">

                      <button className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50">
                        Edit
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </main>
  );
}

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

function ProductStatus({ status }) {
  return (
    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
      {status}
    </span>
  );
}

export default Products;