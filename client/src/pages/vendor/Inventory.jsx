import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, upsertProduct } from "../../redux/vendorProductSlice";
import { api } from "../../api/client";

function Inventory() {
  const products = useSelector((state) => state.vendorProducts.products);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [stockDrafts, setStockDrafts] = useState({});
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState("");
  const lowStock = products.filter((product) => Number(product.stock) > 0 && Number(product.stock) <= 10).length;
  const outOfStock = products.filter((product) => Number(product.stock) === 0).length;
  const visible = useMemo(() => products.filter((product) => {
    const matchesSearch = `${product.name} ${product.category} ${product.brand || ""}`.toLowerCase().includes(search.toLowerCase());
    const stock = Number(product.stock || 0);
    const matchesFilter = filter === "all" || (filter === "low" && stock > 0 && stock <= 10) || (filter === "out" && stock === 0);
    return matchesSearch && matchesFilter;
  }), [products, search, filter]);

  const saveStock = async (product) => {
    const value = Number(stockDrafts[product.id]);
    if (!Number.isInteger(value) || value < 0) { setNotice("Enter a whole number of zero or more."); return; }
    setBusyId(product.id); setError("");
    try {
      const saved = await api.products.update(product.id, { ...product, stock: value, files: [] });
      dispatch(upsertProduct(saved)); dispatch(setProducts(await api.products.list()));
      setStockDrafts((drafts) => { const next = { ...drafts }; delete next[product.id]; return next; });
      setNotice(`${product.name} stock updated on the server.`);
    } catch (requestError) { setError(requestError.message); }
    finally { setBusyId(""); }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link to="/vendor/dashboard" className="text-sm font-semibold text-orange-600">← Vendor dashboard</Link>
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><p className="font-semibold text-orange-600">Vendor workspace</p><h1 className="mt-1 text-4xl font-bold">Inventory</h1><p className="mt-2 text-slate-600">Search listings and update stock levels.</p></div>
          <Link to="/vendor/products/add" className="rounded-lg bg-orange-500 px-5 py-3 text-center font-semibold text-white hover:bg-orange-600">+ Add product</Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <InventoryStat label="Products" value={products.length} />
          <InventoryStat label="Low stock · 10 or fewer" value={lowStock} />
          <InventoryStat label="Out of stock" value={outOfStock} />
        </div>

        <section className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b p-5 md:flex-row md:items-center md:justify-between">
            <h2 className="text-lg font-semibold">Stock overview</h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input aria-label="Search inventory" placeholder="Search products" value={search} onChange={(event) => setSearch(event.target.value)} className="rounded-lg border px-4 py-2.5 outline-none focus:border-orange-500" />
              <select aria-label="Filter inventory" value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-lg border bg-white px-4 py-2.5">
                <option value="all">All stock levels</option><option value="low">Low stock</option><option value="out">Out of stock</option>
              </select>
            </div>
          </div>
          {notice && <p role="status" className="border-b bg-green-50 px-5 py-3 text-sm text-green-800">{notice}</p>}
          {error && <p role="alert" className="border-b bg-red-50 px-5 py-3 text-sm text-red-700">{error}</p>}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500"><tr><th className="px-5 py-3 font-medium">Product</th><th className="px-5 py-3 font-medium">Category</th><th className="px-5 py-3 font-medium">Current stock</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3 font-medium">Update stock</th></tr></thead>
              <tbody className="divide-y">
                {visible.map((product) => {
                  const stock = Number(product.stock || 0);
                  const status = stock === 0 ? "Out of stock" : stock <= 10 ? "Low stock" : "In stock";
                  const draft = stockDrafts[product.id] ?? String(stock);
                  return <tr key={product.id}>
                    <td className="px-5 py-4"><div className="flex items-center gap-3">{product.image ? <img src={product.image} alt="" className="h-11 w-11 rounded-lg object-cover" /> : <span className="grid h-11 w-11 place-items-center rounded-lg bg-orange-50">▧</span>}<div><p className="font-medium">{product.name}</p><p className="text-xs text-slate-500">{product.brand || ""}</p></div></div></td>
                    <td className="px-5 py-4 text-slate-600">{product.category}</td>
                    <td className="px-5 py-4 font-semibold">{stock}</td>
                    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${stock === 0 ? "bg-red-50 text-red-700" : stock <= 10 ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>{status}</span></td>
                    <td className="px-5 py-4"><div className="flex gap-2"><input aria-label={`New stock for ${product.name}`} type="number" min="0" step="1" value={draft} onChange={(event) => setStockDrafts((drafts) => ({ ...drafts, [product.id]: event.target.value }))} className="w-24 rounded-lg border px-3 py-2" /><button type="button" disabled={busyId === product.id || Number(draft) === stock || draft === ""} onClick={() => saveStock(product)} className="rounded-lg bg-slate-900 px-3 py-2 font-medium text-white enabled:hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Save</button></div></td>
                  </tr>;
                })}
                {visible.length === 0 && <tr><td colSpan="5" className="px-5 py-12 text-center text-slate-500">No inventory items match these filters.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
        <p className="mt-4 text-xs text-slate-500">Inventory changes are saved to your backend store catalog.</p>
      </div>
    </main>
  );
}

function InventoryStat({ label, value }) {
  return <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>;
}

export default Inventory;
