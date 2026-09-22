function Inventory() {
  const inventory = [
    {
      id: 1,
      product: "Wireless Headphones",
      category: "Electronics",
      stock: 32,
      minimum: 10,
      status: "In Stock",
    },
    {
      id: 2,
      product: "Smart Watch",
      category: "Electronics",
      stock: 18,
      minimum: 10,
      status: "In Stock",
    },
    {
      id: 3,
      product: "Running Shoes",
      category: "Sports",
      stock: 9,
      minimum: 15,
      status: "Low Stock",
    },
    {
      id: 4,
      product: "Travel Backpack",
      category: "Fashion",
      stock: 25,
      minimum: 10,
      status: "In Stock",
    },
    {
      id: 5,
      product: "Bluetooth Speaker",
      category: "Electronics",
      stock: 0,
      minimum: 10,
      status: "Out of Stock",
    },
    {
      id: 6,
      product: "Cotton T-Shirt",
      category: "Fashion",
      stock: 6,
      minimum: 15,
      status: "Low Stock",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <p className="mb-2 font-medium text-gray-600">
            Vendor Panel
          </p>

          <h1 className="text-4xl font-bold">
            Inventory
          </h1>

          <p className="mt-3 text-gray-600">
            Monitor your product stock and inventory levels.
          </p>

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
            title="Total Stock"
            value="2,486"
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

        {/* Inventory Table */}
        <div className="mt-8 overflow-hidden rounded-xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold">
              Stock Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Monitor stock levels for all your products.
            </p>

          </div>

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
                    Current Stock
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Minimum Stock
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

                {inventory.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                          Image
                        </div>

                        <span className="font-medium">
                          {item.product}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {item.category}
                    </td>

                    <td className="px-6 py-5">

                      <span className="font-semibold">
                        {item.stock}
                      </span>

                      <span className="ml-1 text-sm text-gray-500">
                        units
                      </span>

                    </td>

                    <td className="px-6 py-5 text-gray-600">
                      {item.minimum}
                    </td>

                    <td className="px-6 py-5">

                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                        {item.status}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <button className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                        Update Stock
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

export default Inventory;