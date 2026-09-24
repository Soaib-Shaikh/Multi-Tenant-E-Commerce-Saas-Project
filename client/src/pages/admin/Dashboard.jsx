import { Link } from "react-router-dom";

function Dashboard() {
  const recentOrders = [
    {
      id: "#ORD-1024",
      customer: "Arun Kumar",
      product: "Wireless Headphones",
      amount: 2499,
      status: "Delivered",
      date: "19 Sep 2026",
    },
    {
      id: "#ORD-1023",
      customer: "Priya Sharma",
      product: "Smart Watch",
      amount: 3999,
      status: "Processing",
      date: "19 Sep 2026",
    },
    {
      id: "#ORD-1022",
      customer: "Rahul Kumar",
      product: "Running Shoes",
      amount: 1999,
      status: "Shipped",
      date: "18 Sep 2026",
    },
    {
      id: "#ORD-1021",
      customer: "Divya Raj",
      product: "Travel Backpack",
      amount: 1299,
      status: "Delivered",
      date: "18 Sep 2026",
    },
    {
      id: "#ORD-1020",
      customer: "Vijay Anand",
      product: "Smart Watch",
      amount: 3999,
      status: "Pending",
      date: "17 Sep 2026",
    },
  ];

  const topProducts = [
    {
      name: "Wireless Headphones",
      category: "Electronics",
      sold: 124,
      revenue: 309876,
    },
    {
      name: "Smart Watch",
      category: "Electronics",
      sold: 98,
      revenue: 391902,
    },
    {
      name: "Running Shoes",
      category: "Sports",
      sold: 86,
      revenue: 171914,
    },
    {
      name: "Travel Backpack",
      category: "Fashion",
      sold: 64,
      revenue: 83136,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <p className="mb-2 font-medium text-gray-600">
            ShopSaaS Admin
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <h1 className="text-4xl font-bold md:text-5xl">
                Dashboard
              </h1>

              <p className="mt-3 text-gray-600">
                Monitor your platform performance and manage your
                e-commerce business.
              </p>
            </div>

            {/* Management Buttons */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">

  <Link
    to="/admin/vendors"
    className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-400 hover:shadow-md"
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold">Vendors</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage registered vendors
        </p>
      </div>

      <span className="text-2xl">→</span>
    </div>
  </Link>

  <Link
            to="/admin/customers"
               className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-400 hover:shadow-md"
                >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold">Customers</h3>
        <p className="mt-1 text-sm text-gray-500">
          Manage customer accounts
        </p>
      </div>

      <span className="text-2xl">→</span>
    </div>
  </Link>

  <Link
    to="/admin/orders"
    className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-gray-400 hover:shadow-md"
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold">Orders</h3>
        <p className="mt-1 text-sm text-gray-500">
          View and manage orders
        </p>
      </div>

      <span className="text-2xl">→</span>
    </div>
  </Link>

</div>

          </div>

        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Total Revenue"
            value="₹8,42,590"
            change="+12.5%"
            description="from last month"
          />

          <DashboardCard
            title="Total Orders"
            value="1,248"
            change="+8.2%"
            description="from last month"
          />

          <DashboardCard
            title="Customers"
            value="1,084"
            change="+14.4%"
            description="from last month"
          />

          <DashboardCard
            title="Vendors"
            value="86"
            change="+6.8%"
            description="from last month"
          />

        </div>

        {/* Sales + Quick Actions */}
        <div className="mt-8 grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Sales Overview */}
          <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>
                <h2 className="text-xl font-bold">
                  Sales Overview
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Revenue performance over the last 7 days.
                </p>
              </div>

              <select className="rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:border-black">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
              </select>

            </div>

            {/* Chart */}
            <div className="mt-8">

              <div className="flex h-64 items-end gap-3 sm:gap-5">

                <SalesBar day="Mon" amount="₹72K" height="45%" />
                <SalesBar day="Tue" amount="₹95K" height="60%" />
                <SalesBar day="Wed" amount="₹68K" height="42%" />
                <SalesBar day="Thu" amount="₹112K" height="72%" />
                <SalesBar day="Fri" amount="₹89K" height="56%" />
                <SalesBar day="Sat" amount="₹134K" height="88%" />
                <SalesBar day="Sun" amount="₹118K" height="76%" />

              </div>

            </div>

          </div>

          {/* Quick Actions */}
          {/* <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your platform quickly.
            </p>

            <div className="mt-6 space-y-3">

              <QuickAction
                title="Manage Customers"
                description="View customer accounts"
                to="/admin/customers"
              />

              <QuickAction
                title="Manage Vendors"
                description="View registered vendors"
                to="/admin/vendors"
              />

              <QuickAction
                title="Manage Products"
                description="Add or edit products"
                to="/admin/products"
              />

              <QuickAction
                title="View Orders"
                description="Track customer orders"
                to="/admin/orders"
              />

            </div>

          </div> */}

        </div>

        {/* Recent Orders */}
        <div className="mt-8 rounded-xl border bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-3 border-b p-6 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-xl font-bold">
                Recent Orders
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Latest orders placed on your platform.
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="font-medium underline underline-offset-4"
            >
              View All
            </Link>

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
                    Product
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Amount
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

                {recentOrders.map((order) => (
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

                    <td className="px-6 py-5 text-gray-600">
                      {order.product}
                    </td>

                    <td className="px-6 py-5 font-medium">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-5">
                      <OrderStatus status={order.status} />
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-500">
                      {order.date}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          {/* Mobile Orders */}
          <div className="divide-y md:hidden">

            {recentOrders.map((order) => (
              <div key={order.id} className="p-6">

                <div className="flex items-start justify-between gap-3">

                  <div>
                    <p className="font-semibold">
                      {order.id}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.customer}
                    </p>
                  </div>

                  <OrderStatus status={order.status} />

                </div>

                <div className="mt-4 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Product
                    </p>

                    <p className="mt-1 font-medium">
                      {order.product}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Amount
                    </p>

                    <p className="mt-1 font-bold">
                      ₹{order.amount.toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

                <p className="mt-4 text-sm text-gray-500">
                  {order.date}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Top Products */}
          <div className="rounded-xl border bg-white shadow-sm">

            <div className="border-b p-6">

              <h2 className="text-xl font-bold">
                Top Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Best performing products on your platform.
              </p>

            </div>

            <div className="divide-y">

              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center gap-4 p-5"
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 font-bold">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate font-medium">
                      {product.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.category} · {product.sold} sold
                    </p>

                  </div>

                  <p className="font-semibold">
                    ₹{product.revenue.toLocaleString("en-IN")}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Platform Summary */}
          <div className="rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Platform Summary
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current ShopSaaS platform overview.
            </p>

            <div className="mt-6 space-y-6">

              <SummaryRow
                label="Active Vendors"
                value="78"
                total="86"
              />

              <SummaryRow
                label="Active Customers"
                value="1,084"
                total="1,248"
              />

              <SummaryRow
                label="Active Products"
                value="2,486"
                total="2,620"
              />

              <SummaryRow
                label="Completed Orders"
                value="1,062"
                total="1,248"
              />

            </div>

          </div>

        </div>

      </section>
    </main>
  );
}

/* Dashboard Statistic */

function DashboardCard({
  title,
  value,
  change,
  description,
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      <div className="mt-3 flex items-end justify-between gap-3">

        <h3 className="text-3xl font-bold">
          {value}
        </h3>

        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium">
          {change}
        </span>

      </div>

      <p className="mt-2 text-sm text-gray-500">
        {description}
      </p>

    </div>
  );
}

/* Sales Bar */

function SalesBar({ day, amount, height }) {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">

      <span className="hidden text-xs text-gray-500 sm:block">
        {amount}
      </span>

      <div
        className="w-full rounded-t-lg bg-black transition hover:bg-gray-700"
        style={{ height }}
      />

      <span className="text-xs font-medium text-gray-500">
        {day}
      </span>

    </div>
  );
}

/* Quick Action */

function QuickAction({
  title,
  description,
  to,
}) {
  return (
    <Link
      to={to}
      className="block rounded-lg border p-4 transition hover:-translate-y-0.5 hover:border-gray-400 hover:shadow-sm"
    >

      <div className="flex items-center justify-between">

        <div>
          <p className="font-medium">
            {title}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        </div>

        <span className="text-xl">
          →
        </span>

      </div>

    </Link>
  );
}

/* Order Status */

function OrderStatus({ status }) {
  return (
    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
      {status}
    </span>
  );
}

/* Summary Row */

function SummaryRow({
  label,
  value,
  total,
}) {
  const percentage =
    (parseInt(value.replace(",", "")) /
      parseInt(total.replace(",", ""))) *
    100;

  return (
    <div>

      <div className="flex justify-between text-sm">

        <span className="font-medium">
          {label}
        </span>

        <span className="text-gray-500">
          {value} / {total}
        </span>

      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">

        <div
          className="h-full rounded-full bg-black"
          style={{ width: `${percentage}%` }}
        />

      </div>

    </div>
  );
}

export default Dashboard;

