function Orders() {
  const orders = [
    {
      id: "#ORD-1024",
      customer: "Arun Kumar",
      product: "Wireless Headphones",
      quantity: 1,
      amount: 2499,
      payment: "Paid",
      status: "Delivered",
      date: "19 Sep 2026",
    },
    {
      id: "#ORD-1023",
      customer: "Priya Sharma",
      product: "Smart Watch",
      quantity: 1,
      amount: 3999,
      payment: "Paid",
      status: "Processing",
      date: "19 Sep 2026",
    },
    {
      id: "#ORD-1022",
      customer: "Rahul Kumar",
      product: "Running Shoes",
      quantity: 1,
      amount: 1999,
      payment: "Paid",
      status: "Shipped",
      date: "18 Sep 2026",
    },
    {
      id: "#ORD-1021",
      customer: "Divya Raj",
      product: "Travel Backpack",
      quantity: 1,
      amount: 1299,
      payment: "Paid",
      status: "Delivered",
      date: "18 Sep 2026",
    },
    {
      id: "#ORD-1020",
      customer: "Vijay Anand",
      product: "Smart Watch",
      quantity: 1,
      amount: 3999,
      payment: "Pending",
      status: "Pending",
      date: "17 Sep 2026",
    },
    {
      id: "#ORD-1019",
      customer: "Meena Devi",
      product: "Wireless Headphones",
      quantity: 2,
      amount: 4998,
      payment: "Paid",
      status: "Cancelled",
      date: "17 Sep 2026",
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
            Orders
          </h1>

          <p className="mt-3 text-gray-600">
            Track and manage orders from your store.
          </p>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Orders"
            value="342"
          />

          <StatCard
            title="Pending"
            value="12"
          />

          <StatCard
            title="Processing"
            value="18"
          />

          <StatCard
            title="Completed"
            value="286"
          />

        </div>

        {/* Filters */}
        <div className="mt-8 rounded-xl border bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row">

            <input
              type="text"
              placeholder="Search order or customer..."
              className="flex-1 rounded-lg border px-4 py-3 outline-none focus:border-black"
            />

            <select className="rounded-lg border bg-white px-4 py-3 outline-none focus:border-black">
              <option>All Orders</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

          </div>

        </div>

        {/* Orders */}
        <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-sm">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">

                <tr className="border-b text-left text-sm text-gray-500">

                  <th className="px-6 py-4 font-medium">
                    Order
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Customer
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Product
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Amount
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Payment
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >

                    <td className="px-6 py-5 font-medium">
                      {order.id}
                    </td>

                    <td className="px-6 py-5">
                      {order.customer}
                    </td>

                    <td className="px-6 py-5">

                      <p className="font-medium">
                        {order.product}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Qty: {order.quantity}
                      </p>

                    </td>

                    <td className="px-6 py-5 font-medium">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                        {order.payment}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">
                      {order.date}
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

export default Orders;