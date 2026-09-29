import { useState } from "react";

function Customers() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const customers = [
    {
      id: 1,
      name: "Arun Kumar",
      email: "arun@example.com",
      orders: 12,
      spent: 24590,
      status: "Active",
      joined: "12 Sep 2026",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      orders: 8,
      spent: 16450,
      status: "Active",
      joined: "08 Sep 2026",
    },
    {
      id: 3,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      orders: 3,
      spent: 5999,
      status: "Inactive",
      joined: "02 Sep 2026",
    },
    {
      id: 4,
      name: "Divya Raj",
      email: "divya@example.com",
      orders: 15,
      spent: 32780,
      status: "Active",
      joined: "28 Aug 2026",
    },
    {
      id: 5,
      name: "Vijay Anand",
      email: "vijay@example.com",
      orders: 5,
      spent: 8990,
      status: "Active",
      joined: "21 Aug 2026",
    },
    {
      id: 6,
      name: "Meena Devi",
      email: "meena@example.com",
      orders: 2,
      spent: 3299,
      status: "Inactive",
      joined: "15 Aug 2026",
    },
  ];

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || customer.status === status;

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

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-4xl font-bold md:text-5xl">
                Customers
              </h1>

              <p className="mt-3 text-gray-600">
                Manage and monitor your customers from one place.
              </p>
            </div>

            <button className="rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800">
              + Add Customer
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="mb-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">Customer rows and summary figures below are sample data for the frontend demo.</p>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Customers"
            value="1,248"
            description="+12% this month"
          />

          <StatCard
            title="Active Customers"
            value="1,084"
            description="86.9% of total"
          />

          <StatCard
            title="New Customers"
            value="124"
            description="This month"
          />

          <StatCard
            title="Total Revenue"
            value="₹8,42,590"
            description="From customers"
          />

        </div>

        {/* Customer Table */}
        <div className="mt-8 rounded-xl border bg-white shadow-sm">

          {/* Table Header */}
          <div className="border-b p-6">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

              <div>
                <h2 className="text-xl font-bold">
                  All Customers
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View and manage registered customers.
                </p>
              </div>

              {/* Search & Filter */}
              <div className="flex flex-col gap-3 sm:flex-row">

                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search customers..."
                    className="w-full rounded-lg border px-4 py-2.5 outline-none transition focus:border-black sm:w-64"
                  />
                </div>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-black"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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
                    Customer
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Orders
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Total Spent
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Status
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <CustomerRow
                      key={customer.id}
                      customer={customer}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y md:hidden">

            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <MobileCustomerCard
                  key={customer.id}
                  customer={customer}
                />
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                No customers found.
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="flex flex-col justify-between gap-4 border-t px-6 py-4 text-sm text-gray-500 sm:flex-row sm:items-center">
            <p>
              Showing {filteredCustomers.length} of{" "}
              {customers.length} customers
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

function StatCard({ title, value, description }) {
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

/* Desktop Customer Row */

function CustomerRow({ customer }) {
  return (
    <tr className="border-b last:border-b-0 transition hover:bg-gray-50">

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-semibold">
            {customer.name.charAt(0)}
          </div>

          <div>
            <p className="font-medium">
              {customer.name}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {customer.email}
            </p>
          </div>

        </div>
      </td>

      <td className="px-6 py-5 font-medium">
        {customer.orders}
      </td>

      <td className="px-6 py-5 font-medium">
        ₹{customer.spent.toLocaleString("en-IN")}
      </td>

      <td className="px-6 py-5">
        <StatusBadge status={customer.status} />
      </td>

      <td className="px-6 py-5 text-sm text-gray-500">
        {customer.joined}
      </td>

      <td className="px-6 py-5 text-right">
        <button className="mr-3 font-medium underline underline-offset-4">
          View
        </button>

        <button className="font-medium text-gray-500 underline underline-offset-4 hover:text-black">
          Delete
        </button>
      </td>

    </tr>
  );
}

/* Mobile Customer Card */

function MobileCustomerCard({ customer }) {
  return (
    <div className="p-6">

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 font-semibold">
          {customer.name.charAt(0)}
        </div>

        <div className="flex-1">
          <p className="font-semibold">
            {customer.name}
          </p>

          <p className="text-sm text-gray-500">
            {customer.email}
          </p>
        </div>

        <StatusBadge status={customer.status} />

      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

        <div>
          <p className="text-gray-500">
            Orders
          </p>

          <p className="mt-1 font-semibold">
            {customer.orders}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Total Spent
          </p>

          <p className="mt-1 font-semibold">
            ₹{customer.spent.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-gray-500">
            Joined
          </p>

          <p className="mt-1 font-semibold">
            {customer.joined}
          </p>
        </div>

      </div>

      <div className="mt-5 flex gap-3">

        <button className="flex-1 rounded-lg border px-4 py-2.5 font-medium transition hover:bg-gray-100">
          View Customer
        </button>

        <button className="rounded-lg border px-4 py-2.5 font-medium text-gray-500 transition hover:bg-gray-100 hover:text-black">
          Delete
        </button>

      </div>

    </div>
  );
}

/* Status Badge */

function StatusBadge({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        isActive
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-200 text-gray-500"
      }`}
    >
      {status}
    </span>
  );
}

export default Customers;
