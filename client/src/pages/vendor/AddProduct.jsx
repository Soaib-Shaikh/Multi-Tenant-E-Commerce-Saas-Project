import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/client";
import { setProducts, upsertProduct } from "../../redux/vendorProductSlice";

const empty = { name: "", description: "", categoryId: "", price: "", stock: "" };
export default function AddProduct() {
  const { id } = useParams();
  const editing = Boolean(id);
  const products = useSelector((state) => state.vendorProducts.products);
  const existing = useMemo(() => products.find((item) => String(item.id) === String(id)), [products, id]);
  const [product, setProduct] = useState(empty);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    Promise.all([api.categories.list(), editing ? api.products.get(id) : Promise.resolve(null)]).then(([loadedCategories, loadedProduct]) => {
      if (!active) return;
      setCategories(loadedCategories);
      if (loadedProduct) setProduct({ name: loadedProduct.name || "", description: loadedProduct.description || "", categoryId: loadedProduct.categoryId || "", price: loadedProduct.price ?? "", stock: loadedProduct.stock ?? "" });
    }).catch((requestError) => { if (active) setError(requestError.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, editing]);

  const change = (event) => setProduct((current) => ({ ...current, [event.target.name]: event.target.value }));
  const addCategory = async () => {
    const name = categoryName.trim();
    if (!name) return;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setError("");
    try {
      const result = await api.categories.create({ name, slug });
      const category = result.category;
      setCategories((current) => [category, ...current]);
      setProduct((current) => ({ ...current, categoryId: category._id }));
      setCategoryName("");
    } catch (requestError) { setError(requestError.message); }
  };
  const submit = async (event) => {
    event.preventDefault(); setError("");
    if (!product.categoryId) return setError("Choose a category before saving the product.");
    if (!product.name.trim() || !product.description.trim() || Number(product.price) <= 0 || product.stock === "" || Number(product.stock) < 0) return setError("Enter a product name, description, valid price and non-negative stock quantity.");
    setSaving(true);
    try {
      const saved = editing ? await api.products.update(id, { ...product, price: Number(product.price), stock: Number(product.stock), files }) : await api.products.create({ ...product, price: Number(product.price), stock: Number(product.stock), files });
      dispatch(upsertProduct(saved));
      dispatch(setProducts(await api.products.list()));
      navigate("/vendor/products");
    } catch (requestError) { setError(requestError.message); }
    finally { setSaving(false); }
  };

  if (loading) return <main className="mx-auto max-w-4xl px-6 py-20 text-center text-slate-500">Loading product details…</main>;
  if (editing && !existing && !product.name) return <main className="mx-auto max-w-3xl px-6 py-20 text-center"><h1 className="text-3xl font-bold">Product not found</h1><p className="mt-3 text-slate-600">{error}</p><Link to="/vendor/products" className="mt-5 inline-block text-orange-600">Back to products</Link></main>;

  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-4xl"><Link to="/vendor/products" className="text-sm font-semibold text-orange-600">← Back to products</Link><h1 className="mt-4 text-3xl font-bold">{editing ? "Edit product" : "Add product"}</h1><p className="mt-2 text-slate-600">Changes are saved to your store catalog.</p>
    <form onSubmit={submit} className="mt-8 space-y-6 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">{error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium">Product name<input name="name" required value={product.name} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label><label className="text-sm font-medium">Category<select name="categoryId" required value={product.categoryId} onChange={change} className="mt-2 w-full rounded-lg border bg-white px-4 py-3"><option value="">Choose a category</option>{categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)}</select></label><label className="text-sm font-medium">Price (₹)<input name="price" type="number" min="0.01" step="0.01" required value={product.price} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label><label className="text-sm font-medium">Stock<input name="stock" type="number" min="0" step="1" required value={product.stock} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label><label className="text-sm font-medium sm:col-span-2">Product images<input type="file" accept="image/*" multiple onChange={(event) => setFiles(Array.from(event.target.files || []))} className="mt-2 block w-full rounded-lg border px-4 py-3" />{existing?.image && <span className="mt-2 block text-xs text-slate-500">Current image is kept unless you select new image files.</span>}</label><label className="text-sm font-medium sm:col-span-2">Description<textarea name="description" rows="5" required value={product.description} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label></div>
      <div className="rounded-xl border bg-slate-50 p-4"><p className="text-sm font-semibold">Need a new category?</p><div className="mt-3 flex flex-col gap-3 sm:flex-row"><input aria-label="New category name" value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="Category name" className="flex-1 rounded-lg border px-4 py-2.5" /><button type="button" onClick={addCategory} className="rounded-lg border px-4 py-2.5 font-semibold">Add category</button></div></div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Link to="/vendor/products" className="rounded-lg border px-5 py-3 text-center font-semibold">Cancel</Link><button disabled={saving} className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60">{saving ? "Saving…" : editing ? "Save changes" : "Add product"}</button></div>
    </form></div></main>;
}
