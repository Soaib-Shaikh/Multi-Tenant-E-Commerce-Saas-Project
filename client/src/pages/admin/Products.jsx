import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function AdminProducts() {
  const products = useSelector((state) => state.vendorProducts.products);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase())), [products, query]);
  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-7xl">
    <p className="font-semibold text-orange-600">Platform administration</p><h1 className="mt-2 text-4xl font-bold">Products</h1><p className="mt-2 text-slate-600">Review products currently stored in this frontend demo.</p>
    <section className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between"><h2 className="text-lg font-semibold">All products <span className="text-slate-400">({products.length})</span></h2><input aria-label="Search products" placeholder="Search products" value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-lg border px-4 py-2.5 outline-none focus:border-orange-500" /></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{["Product", "Category", "Price", "Stock", "Status"].map((label) => <th key={label} className="px-5 py-3 font-medium">{label}</th>)}</tr></thead><tbody className="divide-y">{visible.map((product) => <tr key={product.id}><td className="px-5 py-4 font-medium">{product.name}</td><td className="px-5 py-4">{product.category}</td><td className="px-5 py-4">₹{Number(product.price || 0).toLocaleString("en-IN")}</td><td className="px-5 py-4">{product.stock ?? "—"}</td><td className="px-5 py-4"><span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">{product.status || "Active"}</span></td></tr>)}{visible.length === 0 && <tr><td colSpan="5" className="px-5 py-12 text-center text-slate-500">No products match your search.</td></tr>}</tbody></table></div>
    </section><p className="mt-4 text-xs text-slate-500">This list reflects the local vendor product store, not server data.</p>
  </div></main>;
}
