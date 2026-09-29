import { useState } from "react";

function Orders() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const orders = [
    {
      id: "#ORD-1024",
      customer: "Arun Kumar",
      email: "arun@example.com",
      vendor: "TechZone Store",
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
      email: "priya@example.com",
      vendor: "TechZone Store",
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
      email: "rahul@example.com",
      vendor: "Sportify",
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
      email: "divya@example.com",
      vendor: "Daily Needs",
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
      email: "vijay@example.com",
      vendor: "TechZone Store",
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
      email: "meena@example.com",
      vendor: "Fashion Hub",
      product: "Running Shoes",
      quantity: 2,
      amount: 3998,
      payment: "Paid",
      status: "Cancelled",
      date: "17 Sep 2026",
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.email.toLowerCase().includes(search.toLowerCase()) ||
      order.vendor.toLowerCase().includes(search.toLowerCase()) ||
      order.product.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || order.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="mb-2 font-medium text-gray-600">
            ShopSaaS Admin
          </p>

          <div>
            <h1 className="text-4xl font-bold md:text-5xl">
              Orders
            </h1>

            <p className="mt-3 text-gray-600">
              Manage and monitor all customer orders across your
              marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="mb-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">Order rows and summary figures below are sample data for the frontend demo.</p>
        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Orders"
            value="1,248"
            description="All customer orders"
          />

          <StatCard
            title="Pending Orders"
            value="42"
            description="Awaiting processing"
          />

          <StatCard
            title="Completed Orders"
            value="1,062"
            description="Successfully delivered"
          />

          <StatCard
            title="Order Revenue"
            value="₹8,42,590"
            description="Total order value"
          />
        </div>

        {/* Orders Table */}
        <div className="mt-8 rounded-xl border bg-white shadow-sm">
          {/* Table Header */}
          <div className="border-b p-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-xl font-bold">
                  All Orders
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View and manage customer orders.
                </p>
              </div>

              {/* Search + Filter */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search orders..."
                  className="w-full rounded-lg border px-4 py-2.5 outline-none transition focus:border-black sm:w-72"
                />

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-black"
                >
                  <option value="All">
                    All Status
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
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
                    Vendor
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

                  <th className="px-6 py-4 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <OrderRow
                      key={order.id}
                      order={order}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y md:hidden">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <MobileOrderCard
                  key={order.id}
                  order={order}
                />
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                No orders found.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col justify-between gap-4 border-t px-6 py-4 text-sm text-gray-500 sm:flex-row sm:items-center">
            <p>
              Showing {filteredOrders.length} of{" "}
              {orders.length} orders
            </p>

            <div className="flex items-center gap-2">
              <button className="rounded-lg border px-3 py-2 transition hover:bg-gray-100">
                Previous
              </button>

              <button className="rounded-lg bg-black px-3 py-2 text-white">
                1
              </button>

              <button className="rounded-lg border px-3 py-2 transition hover:bg-gray-100">
                2
              </button>

              <button className="rounded-lg border px-3 py-2 transition hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Statistics Card */

function StatCard({
  title,
  value,
  description,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-bold">
        {value}
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}

/* Desktop Order Row */

function OrderRow({ order }) {
  return (
    <tr className="border-b last:border-b-0 transition hover:bg-gray-50">
      {/* Order ID */}
      <td className="px-6 py-5">
        <p className="font-semibold">
          {order.id}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          Qty: {order.quantity}
        </p>
      </td>

      {/* Customer */}
      <td className="px-6 py-5">
        <p className="font-medium">
          {order.customer}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {order.email}
        </p>
      </td>

      {/* Vendor */}
      <td className="px-6 py-5 text-sm">
        {order.vendor}
      </td>

      {/* Product */}
      <td className="px-6 py-5 text-sm text-gray-600">
        {order.product}
      </td>

      {/* Amount */}
      <td className="px-6 py-5 font-medium">
        ₹{order.amount.toLocaleString("en-IN")}
      </td>

      {/* Payment */}
      <td className="px-6 py-5">
        <PaymentBadge status={order.payment} />
      </td>

      {/* Order Status */}
      <td className="px-6 py-5">
        <OrderStatus status={order.status} />
      </td>

      {/* Date */}
      <td className="px-6 py-5 text-sm text-gray-500">
        {order.date}
      </td>

      {/* Action */}
      <td className="px-6 py-5 text-right">
        <button className="font-medium underline underline-offset-4">
          View
        </button>
      </td>
    </tr>
  );
}

/* Mobile Order Card */

function MobileOrderCard({ order }) {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold">
            {order.id}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {order.date}
          </p>
        </div>

        <OrderStatus status={order.status} />
      </div>

      {/* Customer */}
      <div className="mt-5">
        <p className="text-sm text-gray-500">
          Customer
        </p>

        <p className="mt-1 font-medium">
          {order.customer}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {order.email}
        </p>
      </div>

      {/* Product */}
      <div className="mt-5 grid grid-cols-2 gap-5">
        <div>
          <p className="text-sm text-gray-500">
            Product
          </p>

          <p className="mt-1 font-medium">
            {order.product}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Vendor
          </p>

          <p className="mt-1 font-medium">
            {order.vendor}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Amount
          </p>

          <p className="mt-1 font-semibold">
            ₹{order.amount.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Payment
          </p>

          <div className="mt-1">
            <PaymentBadge status={order.payment} />
          </div>
        </div>
      </div>

      {/* Action */}
      <button className="mt-6 w-full rounded-lg border px-4 py-2.5 font-medium transition hover:bg-gray-100">
        View Order
      </button>
    </div>
  );
}

/* Payment Badge */

function PaymentBadge({ status }) {
  return (
    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
      {status}
    </span>
  );
}

/* Order Status Badge */

function OrderStatus({ status }) {
  return (
    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
      {status}
    </span>
  );
}

export default Orders;
