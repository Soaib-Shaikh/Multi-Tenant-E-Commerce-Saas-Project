import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Settings() {
  const user = useSelector((state) => state.auth.user);
  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-4xl"><Link to="/vendor/dashboard" className="text-sm font-semibold text-orange-600">← Vendor dashboard</Link><p className="mt-5 font-semibold text-orange-600">Vendor workspace</p><h1 className="mt-1 text-4xl font-bold">Store settings</h1><p className="mt-2 text-slate-600">Store data returned by your backend account.</p><section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm"><dl className="grid gap-5 sm:grid-cols-2">{[["Owner", user?.name], ["Email", user?.email], ["Store ID", user?.tenantId], ["Store name", user?.tenant?.name], ["Store slug", user?.tenant?.slug], ["Status", user?.tenant?.isActive ? "Active" : "Pending approval"]].map(([label, value]) => <div key={label}><dt className="text-sm text-slate-500">{label}</dt><dd className="mt-1 font-semibold">{value || "—"}</dd></div>)}</dl><p className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">The backend currently has no store-settings update endpoint; these fields are read-only.</p></section></div></main>;
}
