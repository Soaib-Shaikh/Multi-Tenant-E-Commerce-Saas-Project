import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout, updateProfile } from "../../redux/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders.orders);
  const vendorProducts = useSelector((state) => state.vendorProducts.products);
  const isVendor = user?.role === "vendor";

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [message, setMessage] = useState("");

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Please Login
          </h1>

          <Link
            to="/login"
            className="mt-5 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();

    dispatch(
      updateProfile({
        name,
        email,
        phone,
      })
    );

    setMessage("Profile updated successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <div className="mb-8">
          <p className="font-semibold text-orange-500">
            Account
          </p>

          <h1 className="mt-1 text-4xl font-bold">
            My Profile
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {/* Profile Card */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-4xl font-bold text-orange-500">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-5 text-xl font-bold">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>

              <button
                onClick={handleLogout}
                className="mt-6 w-full rounded-lg border border-red-200 px-4 py-3 font-medium text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Information */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm md:col-span-2">

            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Personal Information
              </h2>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                Account Active
              </span>
            </div>

            {message && (
              <div className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-600">
                ✓ {message}
              </div>
            )}

            <form
              onSubmit={handleSave}
              className="mt-6 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Phone</label>
                <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* Account Summary */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Total Orders
            </p>

            <p className="mt-2 text-3xl font-bold">
              {orders.length}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5">
            <p className="text-sm text-gray-500">
              Account Type
            </p>

            <p className="mt-2 text-xl font-bold">
              {(user.role || "customer").replace(/^./, (letter) => letter.toUpperCase())}
            </p>
          </div>

          <Link
            to="/orders"
            className="rounded-2xl border bg-white p-5 transition hover:border-orange-300"
          >
            <p className="text-sm text-gray-500">
              Order History
            </p>

            <p className="mt-2 font-bold text-orange-500">
              View Orders →
            </p>
          </Link>

        </div>

        {isVendor && (
          <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-sm font-semibold text-orange-600">Vendor workspace</p>
                <h2 className="mt-1 text-2xl font-bold">Manage your store</h2>
                <p className="mt-2 text-sm text-gray-500">Create listings, update inventory, and review store activity.</p>
              </div>
              <Link to="/vendor/dashboard" className="rounded-lg border px-4 py-2.5 text-center text-sm font-semibold hover:bg-gray-50">Open dashboard</Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <VendorSummary label="Products" value={vendorProducts.length} />
              <VendorSummary label="Low stock" value={vendorProducts.filter((product) => Number(product.stock) > 0 && Number(product.stock) <= 10).length} />
              <VendorSummary label="Out of stock" value={vendorProducts.filter((product) => Number(product.stock) === 0).length} />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link to="/vendor/products" className="rounded-xl bg-slate-900 px-4 py-3 text-center font-semibold text-white hover:bg-slate-700">Manage products</Link>
              <Link to="/vendor/products/add" className="rounded-xl bg-orange-500 px-4 py-3 text-center font-semibold text-white hover:bg-orange-600">+ Add product</Link>
              <Link to="/vendor/inventory" className="rounded-xl border px-4 py-3 text-center font-semibold hover:bg-gray-50">Update inventory</Link>
            </div>
            <Link to="/vendor/orders" className="mt-4 inline-block text-sm font-semibold text-orange-600 hover:underline">View vendor orders →</Link>
          </section>
        )}
      </div>
    </main>
  );
}

function VendorSummary({ label, value }) {
  return <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>;
}

export default Profile;
