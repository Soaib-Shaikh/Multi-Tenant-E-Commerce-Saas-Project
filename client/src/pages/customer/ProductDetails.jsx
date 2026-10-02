import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/client";
import { setCart } from "../../redux/cartSlice";
import { demoProducts } from "../../data/demoCatalog";
import LoginRequiredModal from "../../components/common/LoginRequiredModal";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const demoProduct = demoProducts.find((entry) => String(entry.id) === String(id));
    const productRequest = demoProduct ? Promise.resolve(demoProduct) : user ? api.products.get(id) : api.products.publicGet(id);
    Promise.all([productRequest, user && !demoProduct ? api.reviews.list(id).catch(() => []) : Promise.resolve([])]).then(([item, productReviews]) => {
      if (active) { setProduct(item); setReviews(productReviews); }
    }).catch((requestError) => { if (active) setError(requestError.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, user]);

  const addToCart = async (goToCheckout = false) => {
    if (!product) return;
    setBusy(true); setError("");
    try {
      dispatch(setCart(await api.cart.add(product.id, quantity)));
      if (goToCheckout) navigate("/checkout"); else setNotice(`${product.name} added to your cart.`);
    } catch (requestError) { setError(requestError.message); }
    finally { setBusy(false); }
  };

  const ownReview = reviews.find((review) => String(review.customerId?._id || review.customerId) === String(user?.id));
  const startReviewEdit = () => { setEditingReview(ownReview); setRating(ownReview.rating); setComment(ownReview.comment || ""); };
  const deleteReview = async () => {
    if (!ownReview || !window.confirm("Delete your review?")) return;
    setError(""); setNotice("");
    try { await api.reviews.remove(ownReview._id); setReviews(await api.reviews.list(product.id)); setNotice("Your review was deleted."); setRating(5); setComment(""); setEditingReview(null); }
    catch (requestError) { setError(requestError.message); }
  };

  const submitReview = async (event) => {
    event.preventDefault(); setError(""); setNotice("");
    try {
      if (editingReview) {
        await api.reviews.update(editingReview._id, { rating: Number(rating), comment });
        setNotice("Your review was updated.");
      } else {
        await api.reviews.create({ productId: product.id, rating: Number(rating), comment });
        setNotice("Your review was submitted.");
      }
      setReviews(await api.reviews.list(product.id)); setComment(""); setEditingReview(null);
    } catch (requestError) { setError(requestError.message); }
  };

  if (loading) return <main className="mx-auto max-w-7xl px-6 py-20 text-center text-slate-500">Loading product…</main>;
  if (!product) return <main className="mx-auto max-w-3xl px-6 py-20 text-center"><h1 className="text-3xl font-bold">Product unavailable</h1><p role="alert" className="mt-3 text-slate-600">{error || "This product could not be found in your store."}</p><Link to="/products" className="mt-6 inline-block rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white">Back to products</Link></main>;

  return <main className="min-h-screen bg-gray-50"><div className="mx-auto max-w-7xl px-6 py-12"><div className="mb-8 text-sm text-gray-500"><Link to="/" className="hover:text-orange-500">Home</Link><span className="mx-2">/</span><Link to="/products" className="hover:text-orange-500">Products</Link><span className="mx-2">/</span><span className="text-gray-700">{product.name}</span></div>
    {error && <p role="alert" className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}{notice && <p role="status" className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-800">{notice}</p>}
    <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10"><div className="overflow-hidden rounded-xl bg-gray-100"><img src={product.image} alt={product.name} className="h-full min-h-[350px] w-full object-cover" /></div><div><p className="text-sm font-semibold uppercase text-orange-600">{product.category}</p><h1 className="mt-2 text-3xl font-bold md:text-4xl">{product.name}</h1><p className="mt-4 text-2xl font-bold text-orange-600">₹{Number(product.price).toLocaleString("en-IN")}</p><p className="mt-5 leading-7 text-gray-600">{product.description || "No description provided."}</p><p className="mt-4 text-sm text-slate-600">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</p>
      {product.isDemo && <p className="mt-5 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">Sample product for the team preview. Live ordering will use the connected store catalog.</p>}
      {user?.role === "customer" && !product.isDemo && <><div className="mt-6 flex items-center gap-3"><span>Quantity</span><button aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="rounded border px-3 py-1">−</button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(Number(product.stock || 1), value + 1))} className="rounded border px-3 py-1">+</button></div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><button disabled={busy || product.stock < 1} onClick={() => addToCart()} className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white disabled:opacity-50">{busy ? "Adding…" : "Add to cart"}</button><button disabled={busy || product.stock < 1} onClick={() => addToCart(true)} className="rounded-lg border border-orange-500 px-6 py-3 font-semibold text-orange-700 disabled:opacity-50">Buy now</button></div></>}
      {!user && <div className="mt-8 flex flex-col gap-3 sm:flex-row"><button disabled={product.stock < 1} onClick={() => setLoginModalOpen(true)} className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white disabled:opacity-50">Add to cart</button><button disabled={product.stock < 1} onClick={() => setLoginModalOpen(true)} className="rounded-lg border border-orange-500 px-6 py-3 font-semibold text-orange-700 disabled:opacity-50">Buy now</button></div>}
      {user && product.isDemo && <p className="mt-5 text-sm text-slate-600">This sample item is for browsing only. It isn’t part of an active store order.</p>}
      {user?.role === "vendor" && <Link to="/vendor/products" className="mt-8 inline-block rounded-lg border px-6 py-3 font-semibold">Manage your products</Link>}
    </div></div>
    <section className="mt-10 grid gap-8 lg:grid-cols-2"><div className="rounded-2xl border bg-white p-6"><h2 className="text-xl font-bold">Customer reviews</h2>{reviews.length ? <div className="mt-5 space-y-4">{reviews.map((review) => <article key={review._id || review.id} className="border-b pb-4"><p className="font-semibold">★ {review.rating}/5 <span className="ml-2 font-normal text-slate-500">{review.customerId?.name || "Customer"}</span></p><p className="mt-2 text-slate-700">{review.comment}</p></article>)}</div> : <p className="mt-3 text-sm text-slate-500">No reviews yet.</p>}</div>
    {user?.role === "customer" && <div className="rounded-2xl border bg-white p-6">{ownReview && !editingReview ? <><h2 className="text-xl font-bold">Your review</h2><p className="mt-2 text-sm text-slate-600">You rated this product {ownReview.rating}/5.</p><div className="mt-4 flex gap-3"><button onClick={startReviewEdit} className="rounded-lg border px-4 py-2.5 font-semibold">Edit review</button><button onClick={deleteReview} className="rounded-lg border border-red-200 px-4 py-2.5 font-semibold text-red-600">Delete review</button></div></> : <form onSubmit={submitReview}><h2 className="text-xl font-bold">{editingReview ? "Edit your review" : "Write a review"}</h2><p className="mt-1 text-sm text-slate-500">Only customers who purchased this product can submit a review.</p><label className="mt-5 block text-sm font-medium">Rating<select value={rating} onChange={(event) => setRating(event.target.value)} className="mt-2 w-full rounded-lg border bg-white px-4 py-3">{[5, 4, 3, 2, 1].map((value) => <option key={value} value={value}>{value} stars</option>)}</select></label><label className="mt-4 block text-sm font-medium">Comment<textarea value={comment} onChange={(event) => setComment(event.target.value)} rows="4" className="mt-2 w-full rounded-lg border px-4 py-3" /></label><div className="mt-4 flex gap-3"><button className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white">{editingReview ? "Save review" : "Submit review"}</button>{editingReview && <button type="button" onClick={() => setEditingReview(null)} className="rounded-lg border px-5 py-3 font-semibold">Cancel</button>}</div></form>}</div>}</section>
    <Link to="/products" className="mt-8 inline-block font-medium text-gray-700 underline hover:text-orange-500">← Continue Shopping</Link></div>{loginModalOpen && <LoginRequiredModal productName={product.name} returnTo={`/products/${product.id}`} isDemo={product.isDemo} onClose={() => setLoginModalOpen(false)} />}</main>;
}
export default ProductDetails;
