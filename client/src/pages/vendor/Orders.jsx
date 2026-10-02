import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, normalizeOrder } from "../../api/client";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");

  const loadOrders = useCallback(async () => {
    const data = await api.dashboards.seller();
    setOrders((data.recentOrders || []).map(normalizeOrder));
  }, []);

  useEffect(() => {
    let active = true;
    api.dashboards.seller().then((data) => { if (active) setOrders((data.recentOrders || []).map(normalizeOrder)); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const updateStatus = async (order, status) => {
    setBusyId(order.id);
    setError("");
    setNotice("");
    try {
      const updated = await api.orders.updateStatus(order.id, status);
      setOrders((current) => current.map((item) => item.id === order.id ? updated : item));
      setNotice(`Order status updated to ${status}.`);
    } catch (requestError) {
      setError(requestError.message || "Could not update the order.");
    } finally {
      setBusyId("");
    }
  };

  const refund = async (order) => {
    if (!window.confirm("Approve this request and issue a refund through the Razorpay account configured on the backend?")) return;
    setBusyId(order.id);
    setError("");
    setNotice("");
    try {
      const result = await api.payments.refund(order.id);
      setNotice(result.message || "Refund processed successfully.");
      if (result.order) setOrders((current) => current.map((item) => item.id === order.id ? normalizeOrder(result.order) : item));
      else await loadOrders();
    } catch (requestError) {
      setError(requestError.message || "Could not process the refund.");
    } finally {
      setBusyId("");
    }
  };

  const nextStatus = (status) => ({ Confirmed: "processing", Processing: "shipped", Shipped: "delivered" })[status];

  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-7xl"><Link to="/vendor/dashboard" className="text-sm font-semibold text-orange-600">← Vendor dashboard</Link><div className="mt-4"><p className="font-semibold text-orange-600">Vendor workspace</p><h1 className="mt-1 text-4xl font-bold">Recent orders</h1><p className="mt-2 text-slate-600">Update fulfillment and handle customer cancellation or return requests.</p></div>{error && <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}{notice && <p role="status" className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-800">{notice}</p>}
    <section className="mt-8 space-y-4">{loading && <p className="rounded-xl border bg-white p-8 text-center text-slate-500">Loading recent orders…</p>}{!loading && !orders.length && <p className="rounded-xl border bg-white p-8 text-center text-slate-500">No recent orders found.</p>}{orders.map((order) => {
      const requestedRefund = order.cancelRequested || order.returnRequested;
      const canRefund = requestedRefund && order.refundStatus !== "refunded";
      const transition = nextStatus(order.status);
      return <article key={order.id} className="rounded-2xl border bg-white p-5 shadow-sm"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><p className="text-xs font-medium uppercase tracking-wide text-slate-500">Order</p><h2 className="mt-1 font-bold">{order.id}</h2><p className="mt-1 text-sm text-slate-500">{order.date} · {order.customerId?.name || "Customer"}{order.customerId?.email ? ` · ${order.customerId.email}` : ""}</p></div><div className="sm:text-right"><span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">{order.status}</span><p className="mt-2 font-bold">₹{order.total.toLocaleString("en-IN")}</p></div></div><p className="mt-4 text-sm text-slate-600">{order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ")}</p>{requestedRefund && <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900"><strong>{order.returnRequested ? "Return" : "Cancellation"} requested</strong>{order.returnReason && <p className="mt-1">Reason: {order.returnReason}</p>}<p className="mt-1">Refund status: {order.refundStatus || "requested"}</p></div>}
        <div className="mt-5 flex flex-wrap gap-3">{transition && !requestedRefund && <button type="button" disabled={busyId === order.id} onClick={() => updateStatus(order, transition)} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{busyId === order.id ? "Updating…" : `Mark ${transition}`}</button>}{canRefund && <button type="button" disabled={busyId === order.id} onClick={() => refund(order)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 disabled:opacity-60">{busyId === order.id ? "Processing…" : "Approve and refund"}</button>}{order.refundStatus === "refunded" && <span className="rounded-lg bg-green-50 px-4 py-2 text-sm font-semibold text-green-800">Refund completed</span>}</div>
      </article>;
    })}</section><p className="mt-4 text-xs text-slate-500">Changing status sends an email when backend email settings are configured. Refund approval uses the backend’s configured Razorpay account.</p></div></main>;
}

export default Orders;
