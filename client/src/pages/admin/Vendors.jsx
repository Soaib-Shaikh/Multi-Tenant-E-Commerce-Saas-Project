import { useState } from "react";

function Vendors() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const vendors = [
    {
      id: 1,
      store: "TechZone Store",
      owner: "Arun Kumar",
      email: "arun@techzone.com",
      products: 124,
      orders: 342,
      revenue: 584900,
      status: "Active",
      joined: "12 Sep 2026",
    },
    {
      id: 2,
      store: "Fashion Hub",
      owner: "Priya Sharma",
      email: "priya@fashionhub.com",
      products: 86,
      orders: 218,
      revenue: 392450,
      status: "Active",
      joined: "08 Sep 2026",
    },
    {
      id: 3,
      store: "Home Essentials",
      owner: "Rahul Kumar",
      email: "rahul@homeessentials.com",
      products: 54,
      orders: 126,
      revenue: 184990,
      status: "Pending",
      joined: "05 Sep 2026",
    },
    {
      id: 4,
      store: "Sportify",
      owner: "Divya Raj",
      email: "divya@sportify.com",
      products: 96,
      orders: 287,
      revenue: 467800,
      status: "Active",
      joined: "28 Aug 2026",
    },
    {
      id: 5,
      store: "Daily Needs",
      owner: "Vijay Anand",
      email: "vijay@dailyneeds.com",
      products: 72,
      orders: 164,
      revenue: 235600,
      status: "Inactive",
      joined: "21 Aug 2026",
    },
    {
      id: 6,
      store: "Style Studio",
      owner: "Meena Devi",
      email: "meena@stylestudio.com",
      products: 45,
      orders: 98,
      revenue: 142300,
      status: "Pending",
      joined: "15 Aug 2026",
    },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.store.toLowerCase().includes(search.toLowerCase()) ||
      vendor.owner.toLowerCase().includes(search.toLowerCase()) ||
      vendor.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "All" || vendor.status === status;

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

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <h1 className="text-4xl font-bold md:text-5xl">
                Vendors
              </h1>

              <p className="mt-3 text-gray-600">
                Manage stores, vendors and their business activity.
              </p>
            </div>

            <button className="rounded-lg bg-black px-5 py-3 font-medium text-white transition hover:bg-gray-800">
              + Add Vendor
            </button>

          </div>

        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Total Vendors"
            value="86"
            description="Registered vendors"
          />

          <StatCard
            title="Active Vendors"
            value="78"
            description="90.7% of total"
          />

          <StatCard
            title="Pending Approval"
            value="5"
            description="Requires review"
          />

          <StatCard
            title="Vendor Revenue"
            value="₹20,08,040"
            description="Total platform sales"
          />

        </div>

        {/* Vendor Table */}
        <div className="mt-8 rounded-xl border bg-white shadow-sm">

          {/* Table Header */}
          <div className="border-b p-6">

            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

              <div>
                <h2 className="text-xl font-bold">
                  All Vendors
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View and manage all stores registered on ShopSaaS.
                </p>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col gap-3 sm:flex-row">

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search vendors..."
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

                  <option value="Active">
                    Active
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Inactive">
                    Inactive
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
                    Vendor / Store
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Products
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Orders
                  </th>

                  <th className="px-6 py-4 font-medium">
                    Revenue
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

                {filteredVendors.length > 0 ? (
                  filteredVendors.map((vendor) => (
                    <VendorRow
                      key={vendor.id}
                      vendor={vendor}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No vendors found.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          {/* Mobile Cards */}
          <div className="divide-y md:hidden">

            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <MobileVendorCard
                  key={vendor.id}
                  vendor={vendor}
                />
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                No vendors found.
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="flex flex-col justify-between gap-4 border-t px-6 py-4 text-sm text-gray-500 sm:flex-row sm:items-center">

            <p>
              Showing {filteredVendors.length} of{" "}
              {vendors.length} vendors
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


/* Desktop Vendor Row */

function VendorRow({ vendor }) {
  return (
    <tr className="border-b last:border-b-0 transition hover:bg-gray-50">

      {/* Vendor */}
      <td className="px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 font-bold">
            {vendor.store.charAt(0)}
          </div>

          <div>

            <p className="font-semibold">
              {vendor.store}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {vendor.owner}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              {vendor.email}
            </p>

          </div>

        </div>

      </td>

      {/* Products */}
      <td className="px-6 py-5 font-medium">
        {vendor.products}
      </td>

      {/* Orders */}
      <td className="px-6 py-5 font-medium">
        {vendor.orders}
      </td>

      {/* Revenue */}
      <td className="px-6 py-5 font-medium">
        ₹{vendor.revenue.toLocaleString("en-IN")}
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <StatusBadge status={vendor.status} />
      </td>

      {/* Joined */}
      <td className="px-6 py-5 text-sm text-gray-500">
        {vendor.joined}
      </td>

      {/* Actions */}
      <td className="px-6 py-5 text-right">

        <button className="mr-3 font-medium underline underline-offset-4">
          View
        </button>

        {vendor.status === "Pending" && (
          <button className="mr-3 font-medium underline underline-offset-4">
            Approve
          </button>
        )}

        <button className="font-medium text-gray-500 underline underline-offset-4 hover:text-black">
          Delete
        </button>

      </td>

    </tr>
  );
}


/* Mobile Vendor Card */

function MobileVendorCard({ vendor }) {
  return (
    <div className="p-6">

      {/* Vendor Header */}
      <div className="flex items-start gap-3">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 font-bold">
          {vendor.store.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center justify-between gap-2">

            <p className="font-semibold">
              {vendor.store}
            </p>

            <StatusBadge status={vendor.status} />

          </div>

          <p className="mt-1 text-sm text-gray-500">
            {vendor.owner}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {vendor.email}
          </p>

        </div>

      </div>

      {/* Details */}
      <div className="mt-6 grid grid-cols-2 gap-5">

        <div>
          <p className="text-sm text-gray-500">
            Products
          </p>

          <p className="mt-1 font-semibold">
            {vendor.products}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Orders
          </p>

          <p className="mt-1 font-semibold">
            {vendor.orders}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Revenue
          </p>

          <p className="mt-1 font-semibold">
            ₹{vendor.revenue.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Joined
          </p>

          <p className="mt-1 font-semibold">
            {vendor.joined}
          </p>
        </div>

      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">

        <button className="flex-1 rounded-lg border px-4 py-2.5 font-medium transition hover:bg-gray-100">
          View Vendor
        </button>

        {vendor.status === "Pending" && (
          <button className="rounded-lg bg-black px-4 py-2.5 font-medium text-white transition hover:bg-gray-800">
            Approve
          </button>
        )}

        <button className="rounded-lg border px-4 py-2.5 font-medium text-gray-500 transition hover:bg-gray-100 hover:text-black">
          Delete
        </button>

      </div>

    </div>
  );
}


/* Status Badge */

function StatusBadge({ status }) {
  const statusStyle = {
    Active: "bg-gray-100 text-gray-900",
    Pending: "bg-gray-200 text-gray-700",
    Inactive: "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
        statusStyle[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default Vendors;
