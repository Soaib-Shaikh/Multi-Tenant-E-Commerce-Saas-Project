import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { api, RAZORPAY_KEY_ID, loadRazorpay } from "../../api/client";
import { setCart } from "../../redux/cartSlice";
import { addOrder } from "../../redux/orderSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const [cartLoading, setCartLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState({ name: user?.name || "", phone: "", address: "", city: "", state: "", pincode: "" });
  useEffect(() => {
    let active = true;
    api.cart.get().then((cart) => { if (active) dispatch(setCart(cart)); }).catch((requestError) => { if (active) setError(requestError.message); }).finally(() => { if (active) setCartLoading(false); });
    return () => { active = false; };
  }, [dispatch]);
  const total = cartItems.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  const change = (event) => setCustomer((current) => ({ ...current, [event.target.name]: event.target.value }));

  const handlePlaceOrder = async (event) => {
    event.preventDefault();
    if (!cartItems.length) return;
    setError(""); setBusy(true);
    try {
      const loaded = await api.cart.get();
      if (!loaded.items.length) throw new Error("Your cart is empty.");
      dispatch(setCart(loaded));
      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) throw new Error("Razorpay Checkout could not load. Check your internet connection and try again.");
      const order = await api.orders.create(customer);
      const payment = await api.payments.create(order.id);
      const key = payment.keyId || RAZORPAY_KEY_ID;
      if (!key) throw new Error("The backend did not provide a Razorpay key. Ask your backend teammate to configure RAZORPAY_KEY_ID.");
      const options = {
        key,
        amount: payment.razorpayOrder.amount,
        currency: payment.razorpayOrder.currency || "INR",
        name: "ShopSaaS",
        description: `Order ${order.id}`,
        order_id: payment.razorpayOrder.id,
        prefill: { name: customer.name, email: user?.email || "", contact: customer.phone },
        theme: { color: "#f97316" },
        handler: async (response) => {
          try {
            const verified = await api.payments.verify(response);
            const confirmed = { ...order, ...verified.order, id: verified.order?._id || order.id, total: Number(verified.order?.totalAmount ?? order.total), status: "Confirmed", paymentMethod: "Razorpay" };
            dispatch(addOrder(confirmed));
            dispatch(setCart(await api.cart.clear()));
            navigate("/order-success", { state: { order: confirmed } });
          } catch (verifyError) { setError(verifyError.message || "Payment verification failed. Contact support before retrying."); }
        },
        modal: { ondismiss: () => setError("Payment was not completed. The order remains pending; check My Orders before trying again.") },
      };
      const checkout = new window.Razorpay(options);
      checkout.on("payment.failed", (response) => setError(response.error?.description || "Payment failed. Your order remains pending."));
      checkout.open();
    } catch (requestError) { setError(requestError.message || "Could not start checkout."); }
    finally { setBusy(false); }
  };

  if (cartLoading) return <main className="mx-auto max-w-7xl px-6 py-24 text-center text-slate-500">Loading secure checkout…</main>;
  if (!cartItems.length) return <main className="mx-auto max-w-4xl px-6 py-24 text-center"><h1 className="text-3xl font-bold">Your cart is empty</h1><Link to="/products" className="mt-6 inline-block text-orange-600">Continue shopping</Link></main>;

  return <main className="min-h-screen bg-gray-50"><div className="mx-auto max-w-7xl px-6 py-12"><div className="mb-8"><p className="font-semibold text-orange-500">ShopSaaS</p><h1 className="mt-1 text-4xl font-bold">Secure Checkout</h1><p className="mt-2 text-slate-600">Payment is verified by the backend through Razorpay.</p></div><div className="grid gap-8 lg:grid-cols-3"><section className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2"><h2 className="text-xl font-bold">Shipping details</h2>{error && <div role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}<form onSubmit={handlePlaceOrder}><div className="mt-6 grid gap-5 md:grid-cols-2">
    <label className="text-sm font-medium md:col-span-2">Full name<input name="name" required value={customer.name} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
    <label className="text-sm font-medium">Phone<input name="phone" type="tel" required value={customer.phone} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
    <label className="text-sm font-medium">Postal code<input name="pincode" required value={customer.pincode} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
    <label className="text-sm font-medium md:col-span-2">Address<textarea name="address" required rows="3" value={customer.address} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
    <label className="text-sm font-medium">City<input name="city" required value={customer.city} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
    <label className="text-sm font-medium">State<input name="state" required value={customer.state} onChange={change} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
  </div><div className="mt-6 rounded-lg border border-orange-200 bg-orange-50 p-4"><p className="font-semibold">Razorpay secure payment</p><p className="mt-1 text-sm text-slate-600">Card, UPI and net banking options are provided by Razorpay. Your cart and order are tied to your signed-in store account.</p></div><button disabled={busy} className="mt-8 w-full rounded-xl bg-orange-500 px-6 py-3.5 font-semibold text-white disabled:opacity-60">{busy ? "Preparing payment…" : `Pay ₹${total.toLocaleString("en-IN")}`}</button></form></section><aside className="h-fit rounded-xl border bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">Order summary</h2><div className="mt-5 space-y-4">{cartItems.map((item) => <div key={item.id} className="flex justify-between gap-4 text-sm"><span>{item.name} × {item.quantity}</span><span className="font-semibold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span></div>)}</div><div className="mt-5 flex justify-between border-t pt-4 text-lg font-bold"><span>Total</span><span className="text-orange-600">₹{total.toLocaleString("en-IN")}</span></div></aside></div></div></main>;
}
export default Checkout;
