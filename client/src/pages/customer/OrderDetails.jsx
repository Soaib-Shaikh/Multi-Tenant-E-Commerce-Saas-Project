import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../api/client";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadOrder = useCallback(async () => {
    setOrder(await api.orders.get(id));
  }, [id]);

  useEffect(() => {
    let active = true;
    api.orders.get(id).then((data) => { if (active) setOrder(data); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  const submitRequest = async (type) => {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const result = type === "cancel"
        ? await api.orders.requestCancellation(id, reason.trim())
        : await api.orders.requestReturn(id, reason.trim());
      setOrder(result);
      setNotice(type === "cancel" ? "Cancellation request sent to the store." : "Return request sent to the store.");
      setReason("");
      await loadOrder();
    } catch (requestError) {
      setError(requestError.message || `Could not submit the ${type} request.`);
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <main className="mx-auto max-w-5xl px-6 py-20 text-center text-slate-500">Loading order…</main>;
  if (!order) return <main className="mx-auto max-w-3xl px-6 py-20 text-center"><h1 className="text-3xl font-bold">Order unavailable</h1><p role="alert" className="mt-3 text-slate-600">{error}</p><Link to="/orders" className="mt-6 inline-block text-orange-600">Back to orders</Link></main>;

  const address = order.customer || {};
  const requestPending = order.refundStatus === "requested" || order.refundStatus === "approved";
  const canCancel = ["Confirmed", "Processing"].includes(order.status) && !order.cancelRequested && !requestPending;
  const canReturn = order.status === "Delivered" && !order.returnRequested && !requestPending && order.refundStatus !== "refunded";

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link to="/orders" className="text-sm font-medium text-orange-600">← Back to orders</Link>
        <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-sm text-slate-500">Order ID</p><h1 className="mt-1 text-3xl font-bold">{order.id}</h1></div><span className="w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">{order.status}</span></div>
        {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {notice && <p role="status" className="mt-5 rounded-lg bg-green-50 p-4 text-sm text-green-800">{notice}</p>}
        <div className="mt-7 grid gap-4 sm:grid-cols-3">{[["Placed", order.date], ["Payment", order.paymentMethod], ["Total", `₹${order.total.toLocaleString("en-IN")}`]].map(([label, value]) => <div key={label} className="rounded-xl border bg-white p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 font-semibold">{value}</p></div>)}</div>
        <section className="mt-7 rounded-2xl border bg-white"><h2 className="border-b p-5 text-xl font-bold">Items</h2>{order.items.map((item) => <div key={item.id} className="flex items-center gap-4 border-b p-5"><div className="h-20 w-20 overflow-hidden rounded-xl bg-slate-100">{item.image && <img src={item.image} alt={item.name} className="h-full w-full object-cover" />}</div><div className="flex-1"><p className="font-semibold">{item.name}</p><p className="mt-1 text-sm text-slate-500">₹{item.price} × {item.quantity}</p></div><p className="font-bold">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p></div>)}<div className="grid gap-6 p-5 sm:grid-cols-2"><div><h3 className="font-semibold">Delivery address</h3><p className="mt-2 text-sm leading-6 text-slate-600">{address.name}<br />{address.address}<br />{[address.city, address.state, address.pincode].filter(Boolean).join(", ")}<br />{address.phone}</p></div><div className="sm:text-right"><p className="text-sm text-slate-500">Order total</p><p className="mt-2 text-2xl font-bold text-orange-600">₹{order.total.toLocaleString("en-IN")}</p></div></div></section>

        {(canCancel || canReturn || order.cancelRequested || order.returnRequested || order.refundStatus === "refunded") && <section className="mt-7 rounded-2xl border bg-white p-5">
          <h2 className="text-xl font-bold">Cancellation and returns</h2>
          {order.cancelRequested && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Cancellation requested · refund status: {order.refundStatus || "requested"}</p>}
          {order.returnRequested && <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">Return requested · refund status: {order.refundStatus || "requested"}</p>}
          {order.refundStatus === "refunded" && <p className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-800">Refund completed for this order.</p>}
          {(canCancel || canReturn) && <>
            <label className="mt-4 block text-sm font-medium">Reason (optional)<textarea rows="3" value={reason} onChange={(event) => setReason(event.target.value)} className="mt-2 w-full rounded-lg border px-4 py-3" placeholder="Tell the store why you are requesting this." /></label>
            <div className="mt-4 flex flex-wrap gap-3">{canCancel && <button type="button" disabled={busy} onClick={() => submitRequest("cancel")} className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-700 disabled:opacity-60">{busy ? "Sending…" : "Request cancellation"}</button>}{canReturn && <button type="button" disabled={busy} onClick={() => submitRequest("return")} className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white disabled:opacity-60">{busy ? "Sending…" : "Request return"}</button>}</div>
          </>}
          {order.status === "Shipped" && <p className="mt-3 text-sm text-slate-600">This order has shipped. Contact the store for help with cancellation.</p>}
        </section>}
      </div>
    </main>
  );
}
