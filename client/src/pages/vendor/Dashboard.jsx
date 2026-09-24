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

  const products = [
    {
      name: "Wireless Headphones",
      category: "Electronics",
      sold: 124,
      stock: 32,
      revenue: 309876,
    },
    {
      name: "Smart Watch",
      category: "Electronics",
      sold: 98,
      stock: 18,
      revenue: 391902,
    },
    {
      name: "Running Shoes",
      category: "Sports",
      sold: 86,
      stock: 9,
      revenue: 171914,
    },
    {
      name: "Travel Backpack",
      category: "Fashion",
      sold: 64,
      stock: 25,
      revenue: 83136,
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <p className="mb-2 font-medium text-gray-600">
            ShopSaaS Vendor Panel
          </p>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <h1 className="text-4xl font-bold md:text-5xl">
                Vendor Dashboard
              </h1>

              <p className="mt-3 text-gray-600">
                Manage your store, products, inventory and orders.
              </p>
            </div>

            {/* <Link
              to="/vendor/products"
              className="rounded-lg bg-black px-5 py-3 text-center font-medium text-white transition hover:bg-gray-800"
            >
              + Add Product
            </Link> */}
            {/* Quick Actions */}
        <div className="mt-8">

          <h2 className="text-xl font-bold">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your store quickly.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <QuickAction
              title="Products"
              description="Add and manage products"
              to="/vendor/products"
            />

            <QuickAction
              title="Orders"
              description="View customer orders"
              to="/vendor/orders"
            />

            <QuickAction
              title="Inventory"
              description="Manage product stock"
              to="/vendor/inventory"
            />

            <QuickAction
              title="Store Settings"
              description="Manage your store"
              to="/vendor/settings"
            />

          </div>

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
            value="₹5,84,900"
            change="+12.5%"
            description="from last month"
          />

          <DashboardCard
            title="Total Orders"
            value="342"
            change="+8.2%"
            description="from last month"
          />

          <DashboardCard
            title="Products"
            value="124"
            change="+6"
            description="products in your store"
          />

          <DashboardCard
            title="Customers"
            value="286"
            change="+14.4%"
            description="customers purchased"
          />

        </div>

        {/* Quick Actions */}
        {/* <div className="mt-8">

          <h2 className="text-xl font-bold">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your store quickly.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <QuickAction
              title="Products"
              description="Add and manage products"
              to="/vendor/products"
            />

            <QuickAction
              title="Orders"
              description="View customer orders"
              to="/vendor/orders"
            />

            <QuickAction
              title="Inventory"
              description="Manage product stock"
              to="/vendor/inventory"
            />

            <QuickAction
              title="Store Settings"
              description="Manage your store"
              to="/vendor/settings"
            />

          </div>

        </div> */}

        {/* Sales Overview */}
        <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">

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

              <SalesBar
                day="Mon"
                amount="₹42K"
                height="45%"
              />

              <SalesBar
                day="Tue"
                amount="₹58K"
                height="62%"
              />

              <SalesBar
                day="Wed"
                amount="₹46K"
                height="50%"
              />

              <SalesBar
                day="Thu"
                amount="₹72K"
                height="75%"
              />

              <SalesBar
                day="Fri"
                amount="₹64K"
                height="67%"
              />

              <SalesBar
                day="Sat"
                amount="₹89K"
                height="92%"
              />

              <SalesBar
                day="Sun"
                amount="₹76K"
                height="80%"
              />

            </div>

          </div>

        </div>

        {/* Orders + Inventory */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Recent Orders */}
          <div className="rounded-xl border bg-white shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between border-b p-6">

              <div>
                <h2 className="text-xl font-bold">
                  Recent Orders
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Latest orders from your store.
                </p>
              </div>

              <Link
                to="/vendor/orders"
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

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {/* Mobile Orders */}
            <div className="divide-y md:hidden">

              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-6"
                >

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

                  <div className="mt-4 flex justify-between">

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

          {/* Inventory */}
          <div className="rounded-xl border bg-white shadow-sm">

            <div className="border-b p-6">

              <h2 className="text-xl font-bold">
                Inventory Status
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Products that need attention.
              </p>

            </div>

            <div className="divide-y">

              <InventoryItem
                name="Running Shoes"
                stock="9"
                status="Low Stock"
              />

              <InventoryItem
                name="Smart Watch"
                stock="18"
                status="In Stock"
              />

              <InventoryItem
                name="Wireless Headphones"
                stock="32"
                status="In Stock"
              />

              <InventoryItem
                name="Travel Backpack"
                stock="25"
                status="In Stock"
              />

            </div>

            <div className="p-6">

              <Link
                to="/vendor/inventory"
                className="block rounded-lg border px-4 py-3 text-center font-medium transition hover:bg-gray-50"
              >
                Manage Inventory
              </Link>

            </div>

          </div>

        </div>

        {/* Top Products */}
        <div className="mt-8 rounded-xl border bg-white shadow-sm">

          <div className="flex items-center justify-between border-b p-6">

            <div>
              <h2 className="text-xl font-bold">
                Top Products
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Best performing products in your store.
              </p>
            </div>

            <Link
              to="/vendor/products"
              className="font-medium underline underline-offset-4"
            >
              View Products
            </Link>

          </div>

          <div className="divide-y">

            {products.map((product, index) => (
              <div
                key={product.name}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 font-bold">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">

                  <p className="font-medium">
                    {product.name}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.category} · {product.sold} sold
                  </p>

                </div>

                <div className="flex gap-8">

                  <div>
                    <p className="text-xs text-gray-500">
                      Stock
                    </p>

                    <p className="mt-1 font-semibold">
                      {product.stock}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Revenue
                    </p>

                    <p className="mt-1 font-semibold">
                      ₹{product.revenue.toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}


/* Dashboard Card */

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


/* Quick Action */

function QuickAction({
  title,
  description,
  to,
}) {
  return (
    <Link
      to={to}
      className="block rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-gray-400 hover:shadow-md"
    >

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-semibold">
            {title}
          </h3>

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


/* Sales Bar */

function SalesBar({
  day,
  amount,
  height,
}) {
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


/* Order Status */

function OrderStatus({ status }) {
  return (
    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
      {status}
    </span>
  );
}


/* Inventory Item */

function InventoryItem({
  name,
  stock,
  status,
}) {
  return (
    <div className="flex items-center justify-between p-5">

      <div>
        <p className="font-medium">
          {name}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {stock} units available
        </p>
      </div>

      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
        {status}
      </span>

    </div>
  );
}

export default Dashboard;