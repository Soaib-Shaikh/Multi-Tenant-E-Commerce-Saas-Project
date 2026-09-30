import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, normalizeOrder } from "../../api/client";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    api.dashboards.seller().then((data) => { if (active) setOrders((data.recentOrders || []).map(normalizeOrder)); }).catch((requestError) => { if (active) setError(requestError.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-7xl"><Link to="/vendor/dashboard" className="text-sm font-semibold text-orange-600">← Vendor dashboard</Link><div className="mt-4"><p className="font-semibold text-orange-600">Vendor workspace</p><h1 className="mt-1 text-4xl font-bold">Recent orders</h1><p className="mt-2 text-slate-600">These orders are loaded from your tenant-scoped seller dashboard.</p></div>{error && <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}<section className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{["Order", "Date", "Items", "Total", "Status"].map((title) => <th key={title} className="px-5 py-3 font-medium">{title}</th>)}</tr></thead><tbody className="divide-y">{!loading && orders.map((order) => <tr key={order.id}><td className="px-5 py-4 font-semibold">{order.id}</td><td className="px-5 py-4">{order.date}</td><td className="px-5 py-4">{order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ")}</td><td className="px-5 py-4 font-semibold">₹{order.total.toLocaleString("en-IN")}</td><td className="px-5 py-4">{order.status}</td></tr>)}{loading && <tr><td colSpan="5" className="px-5 py-12 text-center text-slate-500">Loading recent orders…</td></tr>}{!loading && !orders.length && <tr><td colSpan="5" className="px-5 py-12 text-center text-slate-500">No recent orders found.</td></tr>}</tbody></table></div></section><p className="mt-4 text-xs text-slate-500">The current backend supports viewing recent seller orders; it has no endpoint for changing order status or listing every order.</p></div></main>;
}
export default Orders;
