import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    api.dashboards.admin().then((result) => { if (active) setStats(result.stats); }).catch((requestError) => { if (active) setError(requestError.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const cards = [["Stores", stats?.totalTenants], ["Active stores", stats?.activeTenants], ["Pending stores", stats?.pendingTenants], ["Vendors", stats?.totalSellers], ["Customers", stats?.totalCustomers], ["Products", stats?.totalProducts], ["Orders", stats?.totalOrders], ["Paid sales", `₹${Number(stats?.totalSales || 0).toLocaleString("en-IN")}`]];
  return <main className="min-h-screen bg-gray-50"><section className="border-b bg-white"><div className="mx-auto max-w-7xl px-6 py-8"><p className="font-medium text-gray-600">ShopSaaS Admin</p><h1 className="mt-2 text-4xl font-bold">Platform dashboard</h1><p className="mt-3 text-gray-600">Live platform totals from the admin reporting API.</p><div className="mt-6 flex flex-wrap gap-3">{[["Manage stores", "/admin/vendors"], ["Manage users", "/admin/users"], ["Customers", "/admin/customers"], ["Orders", "/admin/orders"]].map(([label, href]) => <Link key={href} to={href} className="rounded-lg border px-4 py-2.5 font-semibold hover:border-orange-400">{label} →</Link>)}</div></div></section><section className="mx-auto max-w-7xl px-6 py-10">{error && <p role="alert" className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}{loading ? <p className="rounded-xl border bg-white p-8 text-slate-500">Loading platform metrics…</p> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([title, value]) => <div key={title} className="rounded-xl border bg-white p-6 shadow-sm"><p className="text-sm font-medium text-gray-500">{title}</p><h2 className="mt-3 text-3xl font-bold">{value ?? "—"}</h2></div>)}</div>}<p className="mt-5 text-xs text-slate-500">The backend currently provides summary totals only; sales history charts and admin-wide order lists are not available.</p></section></main>;
}
export default Dashboard;
