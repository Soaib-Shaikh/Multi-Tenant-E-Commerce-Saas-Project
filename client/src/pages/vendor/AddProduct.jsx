import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../redux/vendorProductSlice";

const blankProduct = { name: "", description: "", category: "Electronics", brand: "", price: "", stock: "", image: "" };

export default function AddProduct() {
  const { id } = useParams();
  const editing = Boolean(id);
  const products = useSelector((state) => state.vendorProducts.products);
  const existing = useMemo(() => products.find((item) => String(item.id) === id), [products, id]);
  const [product, setProduct] = useState(() => existing ? { ...blankProduct, ...existing } : blankProduct);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const change = (event) => setProduct({ ...product, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    if (!product.name.trim() || !product.description.trim() || !product.brand.trim() || Number(product.price) <= 0 || product.stock === "" || Number(product.stock) < 0) {
      setError("Enter a name, brand, description, valid price and non-negative stock quantity.");
      return;
    }
    const payload = { ...product, name: product.name.trim(), brand: product.brand.trim(), description: product.description.trim(), price: Number(product.price), stock: Number(product.stock) };
    if (editing) dispatch(updateProduct({ ...payload, id: existing.id })); else dispatch(addProduct(payload));
    navigate("/vendor/products");
  };
  if (editing && !existing) return <main className="mx-auto max-w-3xl px-6 py-20 text-center"><h1 className="text-3xl font-bold">Product not found</h1><Link to="/vendor/products" className="mt-5 inline-block text-orange-600">Back to products</Link></main>;
  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-4xl">
    <Link to="/vendor/products" className="text-sm font-semibold text-orange-600">← Back to products</Link><h1 className="mt-4 text-3xl font-bold">{editing ? "Edit product" : "Add product"}</h1><p className="mt-2 text-slate-600">Product changes are saved in this browser for the demo.</p>
    <form onSubmit={submit} className="mt-8 space-y-6 rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">Product name<input name="name" value={product.name} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
        <label className="text-sm font-medium">Brand<input name="brand" value={product.brand} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
        <label className="text-sm font-medium">Category<select name="category" value={product.category} onChange={change} className="mt-2 w-full rounded-lg border bg-white px-4 py-3">{["Electronics", "Fashion", "Sports", "Home & Living", "Beauty"].map((category) => <option key={category}>{category}</option>)}</select></label>
        <label className="text-sm font-medium">Price (₹)<input name="price" type="number" min="1" step="0.01" value={product.price} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
        <label className="text-sm font-medium">Stock<input name="stock" type="number" min="0" step="1" value={product.stock} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
        <label className="text-sm font-medium sm:col-span-2">Image URL<input name="image" type="url" value={product.image || ""} onChange={change} placeholder="https://…" className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
        <label className="text-sm font-medium sm:col-span-2">Description<textarea name="description" rows="5" value={product.description} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
      </div>
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Link to="/vendor/products" className="rounded-lg border px-5 py-3 text-center font-semibold">Cancel</Link><button className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600">{editing ? "Save changes" : "Add product"}</button></div>
    </form>
  </div></main>;
}
