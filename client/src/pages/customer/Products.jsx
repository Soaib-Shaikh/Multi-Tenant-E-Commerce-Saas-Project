import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/client";
import { setCart } from "../../redux/cartSlice";

function Products() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    api.products.list().then((data) => { if (active) setProducts(data); }).catch((requestError) => { if (active) setError(requestError.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => ["All", ...new Set(products.map((product) => product.category).filter(Boolean))], [products]);
  const filteredProducts = useMemo(() => products.filter((product) => {
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (selectedCategory === "All" || product.category === selectedCategory);
  }).sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "rating" ? b.rating - a.rating : 0), [products, search, selectedCategory, sort]);

  const addToCart = async (product) => {
    setBusyId(product.id); setError(""); setNotice("");
    try { dispatch(setCart(await api.cart.add(product.id))); setNotice(`${product.name} added to your cart.`); }
    catch (requestError) { setError(requestError.message); }
    finally { setBusyId(""); }
  };

  return <main className="min-h-screen bg-gray-50">
    <section className="border-b bg-white"><div className="mx-auto max-w-7xl px-6 py-12"><p className="font-medium text-orange-500">ShopSaaS Store</p><h1 className="mt-2 text-4xl font-bold md:text-5xl">Explore Products</h1><p className="mt-4 max-w-2xl text-gray-500">Live products from your store catalog.</p></div></section>
    <section className="mx-auto max-w-7xl px-6 pt-8"><div className="flex flex-col gap-4 md:flex-row"><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." aria-label="Search products" className="flex-1 rounded-xl border bg-white px-4 py-3 outline-none focus:border-orange-500" /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products" className="rounded-xl border bg-white px-4 py-3"><option value="default">Sort by</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option><option value="rating">Highest Rated</option></select></div><div className="mt-5 flex flex-wrap gap-3">{categories.map((category) => <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-full px-5 py-2 text-sm font-medium ${selectedCategory === category ? "bg-orange-500 text-white" : "border bg-white text-gray-700 hover:border-orange-500"}`}>{category}</button>)}</div></section>
    <section className="mx-auto max-w-7xl px-6 py-8"><div className="mb-5 flex items-center justify-between"><p className="text-sm text-gray-500">{loading ? "Loading catalog…" : `Showing ${filteredProducts.length} products`}</p>{user?.role === "vendor" && <Link to="/vendor/products" className="font-semibold text-orange-600">Manage your catalog →</Link>}</div>
      {error && <div role="alert" className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</div>}{notice && <div role="status" className="mb-5 rounded-xl bg-green-50 p-4 text-sm text-green-800">{notice}</div>}
      {loading ? <div className="rounded-2xl border bg-white p-16 text-center text-slate-500">Loading products from your store…</div> : filteredProducts.length === 0 ? <div className="rounded-2xl border bg-white p-16 text-center"><div className="text-5xl">🔍</div><h2 className="mt-5 text-2xl font-bold">{products.length ? "No Products Found" : "This store has no products yet"}</h2><p className="mt-2 text-gray-500">{products.length ? "Try another search or category." : "Ask the store owner to add products to this catalog."}</p></div> : <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">{filteredProducts.map((product) => <article key={product.id} className="overflow-hidden rounded-2xl border bg-white shadow-sm"><Link to={`/products/${product.id}`} className="block h-56 bg-gray-100"><img src={product.image} alt={product.name} className="h-full w-full object-cover" /></Link><div className="p-5"><p className="text-xs font-medium uppercase text-gray-400">{product.category}</p><Link to={`/products/${product.id}`} className="mt-2 block font-semibold hover:text-orange-600">{product.name}</Link><div className="mt-3 flex justify-between"><span className="font-bold">₹{Number(product.price).toLocaleString("en-IN")}</span><span className="text-yellow-600">{product.rating ? `★ ${product.rating}` : "No reviews"}</span></div><button disabled={user?.role !== "customer" || busyId === product.id || product.stock === 0} onClick={() => addToCart(product)} className="mt-4 w-full rounded-lg bg-orange-500 px-4 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{product.stock === 0 ? "Out of stock" : user?.role === "customer" ? busyId === product.id ? "Adding…" : "Add to cart" : "Customer account required"}</button></div></article>)}</div>}
    </section>
  </main>;
}

export default Products;
