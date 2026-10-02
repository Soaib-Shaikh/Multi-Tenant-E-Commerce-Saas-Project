import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/client";
import { setCart } from "../../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    api.cart.get().then((cart) => { if (active) dispatch(setCart(cart)); }).catch((requestError) => { if (active) setError(requestError.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [dispatch]);

  const update = async (productId, action) => {
    const item = cartItems.find((entry) => String(entry.id) === String(productId));
    if (!item) return;
    setBusyId(productId); setError("");
    try {
      const cart = action === "remove" ? await api.cart.remove(productId) : await api.cart.setQuantity(productId, action === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1));
      dispatch(setCart(cart));
    } catch (requestError) { setError(requestError.message); }
    finally { setBusyId(""); }
  };
  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

  if (loading) return <main className="mx-auto max-w-7xl px-6 py-24 text-center text-slate-500">Loading your server cart…</main>;
  if (!cartItems.length) return <main className="min-h-[70vh] bg-gray-50"><div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6"><div className="text-center"><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-5xl">🛒</div><h1 className="mt-6 text-3xl font-bold">Your Cart is Empty</h1><p className="mt-3 text-gray-500">Add products from your store to get started.</p>{error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}<Link to="/products" className="mt-7 inline-block rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white">Start Shopping →</Link></div></div></main>;

  return <main className="min-h-screen bg-gray-50"><section className="border-b bg-white"><div className="mx-auto max-w-7xl px-6 py-10"><p className="font-medium text-orange-500">ShopSaaS</p><h1 className="mt-2 text-4xl font-bold">Shopping Cart</h1><p className="mt-3 text-gray-500">Your cart can include items from multiple approved stores.</p></div></section><section className="mx-auto max-w-7xl px-6 py-10">{error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}<div className="grid gap-8 lg:grid-cols-[1fr_380px]"><div className="space-y-4">{cartItems.map((item) => <article key={item.id} className="flex flex-col gap-5 rounded-2xl border bg-white p-5 sm:flex-row"><Link to={`/products/${item.id}`} className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-32">{item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" />}</Link><div className="flex flex-1 flex-col"><div className="flex justify-between gap-4"><div><p className="text-xs uppercase text-gray-400">{item.category}</p><p className="mt-1 text-xs text-slate-500">Sold by {item.storeName || "Store"}</p><Link to={`/products/${item.id}`} className="mt-1 block text-lg font-semibold">{item.name}</Link></div><button disabled={busyId === item.id} onClick={() => update(item.id, "remove")} className="text-sm text-red-600 disabled:opacity-50">Remove</button></div><div className="mt-auto flex items-center justify-between pt-5"><div className="flex items-center overflow-hidden rounded-lg border"><button aria-label={`Decrease ${item.name}`} disabled={busyId === item.id || item.quantity <= 1} onClick={() => update(item.id, "dec")} className="px-4 py-2 disabled:opacity-40">−</button><span className="min-w-12 border-x px-4 py-2 text-center">{item.quantity}</span><button aria-label={`Increase ${item.name}`} disabled={busyId === item.id || item.quantity >= item.stock} onClick={() => update(item.id, "inc")} className="px-4 py-2 disabled:opacity-40">+</button></div><p className="text-lg font-bold">₹{(Number(item.price) * item.quantity).toLocaleString("en-IN")}</p></div></div></article>)}<Link to="/products" className="inline-block pt-3 font-medium text-gray-600 hover:text-orange-500">← Continue Shopping</Link></div><aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Order Summary</h2><div className="mt-6 flex justify-between border-b pb-4 text-gray-600"><span>Items subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div><div className="mt-4 flex items-center justify-between"><span className="text-lg font-bold">Total</span><span className="text-2xl font-bold text-orange-500">₹{subtotal.toLocaleString("en-IN")}</span></div><p className="mt-3 text-xs text-slate-500">Final total is calculated from current server prices at checkout.</p><Link to="/checkout" className="mt-7 block rounded-xl bg-orange-500 px-6 py-3.5 text-center font-semibold text-white">Continue to secure checkout</Link></aside></div></section></main>;
}
export default Cart;
