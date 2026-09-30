import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import { logout, updateProfile } from "../../redux/authSlice";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders.orders);
  const products = useSelector((state) => state.vendorProducts.products);
  const [error, setError] = useState("");
  useEffect(() => { let active = true; api.auth.me().then((result) => { if (active) dispatch(updateProfile(result.user)); }).catch((requestError) => { if (active) setError(requestError.message); }); return () => { active = false; }; }, [dispatch]);
  const handleLogout = () => { dispatch(logout()); navigate("/"); };
  if (!user) return <main className="flex min-h-[70vh] items-center justify-center"><Link to="/login" className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white">Sign in</Link></main>;
  const tenant = user.tenant || {};
  return <main className="min-h-screen bg-gray-50 px-6 py-12"><div className="mx-auto max-w-5xl"><div className="mb-8"><p className="font-semibold text-orange-500">Account</p><h1 className="mt-1 text-4xl font-bold">My Profile</h1></div>{error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}<div className="grid gap-6 md:grid-cols-3"><section className="rounded-2xl border bg-white p-6 text-center shadow-sm"><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-4xl font-bold text-orange-500">{user.name?.charAt(0).toUpperCase()}</div><h2 className="mt-5 text-xl font-bold">{user.name}</h2><p className="mt-1 text-sm text-gray-500">{user.email}</p><button onClick={handleLogout} className="mt-6 w-full rounded-lg border border-red-200 px-4 py-3 font-medium text-red-600">Log out</button></section><section className="rounded-2xl border bg-white p-6 shadow-sm md:col-span-2"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Account details</h2><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Server account</span></div><dl className="mt-6 grid gap-5 sm:grid-cols-2">{[["Name", user.name], ["Email", user.email], ["Role", user.role], ["Store", tenant.name || user.tenantId || "—"], ["Store slug", tenant.slug || "—"], ["Account status", user.isActive === false ? "Inactive" : "Active"]].map(([label, value]) => <div key={label}><dt className="text-sm text-slate-500">{label}</dt><dd className="mt-1 font-semibold capitalize">{value || "—"}</dd></div>)}</dl><p className="mt-6 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">Profile editing isn’t exposed by the current backend API, so these details are read-only.</p></section></div>{user.role === "customer" && <div className="mt-6 grid gap-4 sm:grid-cols-3"><Summary label="Orders" value={orders.length} /><Summary label="Account type" value="Customer" /><Link to="/orders" className="rounded-2xl border bg-white p-5 hover:border-orange-300"><p className="text-sm text-gray-500">Order history</p><p className="mt-2 font-bold text-orange-500">View orders →</p></Link></div>}{user.role === "vendor" && <section className="mt-6 rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">Store workspace</h2><p className="mt-2 text-sm text-slate-600">Your store has {products.length} products in its backend catalog.</p><Link to="/vendor/dashboard" className="mt-5 inline-block rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white">Open vendor dashboard</Link></section>}</div></main>;
}
function Summary({ label, value }) { return <div className="rounded-2xl border bg-white p-5"><p className="text-sm text-gray-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>; }
export default Profile;
