import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, normalizeOrder } from "../../api/client";

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    api.dashboards.seller().then((data) => { if (active) setDashboard(data); }).catch((requestError) => { if (active) setError(requestError.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const stats = dashboard?.stats || {};
  const orders = (dashboard?.recentOrders || []).map(normalizeOrder);
  const cards = [["Products", stats.totalProducts], ["Active products", stats.activeProducts], ["Low stock", stats.lowStockProducts], ["Pending orders", stats.pendingOrders], ["Total orders", stats.totalOrders], ["Out of stock", stats.outOfStockProducts], ["Sales", `₹${Number(stats.totalSales || 0).toLocaleString("en-IN")}`]];
  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-7xl"><p className="font-semibold text-orange-600">Store workspace</p><h1 className="mt-2 text-4xl font-bold">Vendor dashboard</h1><p className="mt-2 text-slate-600">Live, tenant-scoped statistics from your backend.</p>{error && <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}{loading ? <p className="mt-8 rounded-xl border bg-white p-8 text-slate-500">Loading store metrics…</p> : <><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(([label, value]) => <div key={label} className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value ?? "—"}</p></div>)}</div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["Products", "/vendor/products"], ["Categories", "/vendor/categories"], ["Inventory", "/vendor/inventory"], ["Recent orders", "/vendor/orders"], ["Store profile", "/vendor/settings"]].map(([label, href]) => <Link key={href} to={href} className="rounded-xl border bg-white p-5 font-semibold shadow-sm hover:border-orange-300">{label} <span className="float-right text-orange-600">→</span></Link>)}</div><section className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="border-b p-5"><h2 className="text-lg font-bold">Recent orders</h2><p className="mt-1 text-sm text-slate-500">Latest orders returned by the seller dashboard API.</p></div><div className="divide-y">{orders.map((order) => <div key={order.id} className="flex flex-col justify-between gap-2 p-5 sm:flex-row sm:items-center"><div><p className="font-semibold">Order {String(order.id).slice(-8)}</p><p className="text-sm text-slate-500">{order.date} · {order.items.length} items</p></div><div className="sm:text-right"><p className="font-bold">₹{order.total.toLocaleString("en-IN")}</p><p className="text-sm text-slate-500">{order.status}</p></div></div>)}{!orders.length && <p className="p-8 text-center text-slate-500">No recent orders.</p>}</div></section><p className="mt-4 text-xs text-slate-500">The backend provides recent orders and statistics; it does not currently expose seller order status updates.</p></>}</div></main>;
}
export default Dashboard;
