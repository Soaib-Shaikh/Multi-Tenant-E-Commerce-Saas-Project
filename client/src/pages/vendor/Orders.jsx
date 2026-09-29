import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderStatus } from "../../redux/orderSlice";

const statuses = ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"];

function Orders() {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Orders");
  const rows = useMemo(() => orders.map((order) => ({
    ...order,
    customerName: `${order.customer?.firstName || ""} ${order.customer?.lastName || ""}`.trim() || order.customer?.name || "Customer",
    productNames: order.items?.map((item) => item.name).join(", ") || "Order items",
    quantity: order.items?.reduce((sum, item) => sum + Number(item.quantity || 1), 0) || 0,
  })).filter((order) => {
    const matchesQuery = `${order.id} ${order.customerName} ${order.customer?.email || ""} ${order.productNames}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (statusFilter === "All Orders" || order.status === statusFilter);
  }), [orders, query, statusFilter]);
  const pending = orders.filter((order) => ["Order Placed", "Pending"].includes(order.status)).length;
  const processing = orders.filter((order) => ["Processing", "Shipped"].includes(order.status)).length;
  const completed = orders.filter((order) => order.status === "Delivered").length;

  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-7xl">
    <Link to="/vendor/dashboard" className="text-sm font-semibold text-orange-600">← Vendor dashboard</Link>
    <div className="mt-4"><p className="font-semibold text-orange-600">Vendor workspace</p><h1 className="mt-1 text-4xl font-bold">Orders</h1><p className="mt-2 text-slate-600">Review locally saved customer orders and update their status.</p></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><OrderStat label="Total orders" value={orders.length} /><OrderStat label="Needs action" value={pending} /><OrderStat label="In progress" value={processing} /><OrderStat label="Delivered" value={completed} /></div>
    <section className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b p-5 md:flex-row md:items-center md:justify-between"><h2 className="font-semibold">Store orders</h2><div className="flex flex-col gap-3 sm:flex-row"><input aria-label="Search orders" placeholder="Search order, customer, product" value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-lg border px-4 py-2.5 outline-none focus:border-orange-500" /><select aria-label="Filter orders by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-lg border bg-white px-4 py-2.5"><option>All Orders</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></div></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{["Order", "Customer", "Items", "Total", "Payment", "Date", "Status"].map((label) => <th key={label} className="px-5 py-3 font-medium">{label}</th>)}</tr></thead><tbody className="divide-y">
        {rows.map((order) => <tr key={order.id}><td className="px-5 py-4 font-semibold">{order.id}</td><td className="px-5 py-4"><p className="font-medium">{order.customerName}</p><p className="text-xs text-slate-500">{order.customer?.email || ""}</p></td><td className="max-w-64 px-5 py-4"><p className="truncate">{order.productNames}</p><p className="text-xs text-slate-500">{order.quantity} items</p></td><td className="px-5 py-4 font-semibold">₹{Number(order.total || 0).toLocaleString("en-IN")}</td><td className="px-5 py-4">{order.paymentMethod || "—"}</td><td className="px-5 py-4 text-slate-500">{order.date || "—"}</td><td className="px-5 py-4"><select aria-label={`Update status for ${order.id}`} value={order.status} onChange={(event) => dispatch(updateOrderStatus({ id: order.id, status: event.target.value }))} className="rounded-lg border bg-white px-2 py-2">{statuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>)}
        {rows.length === 0 && <tr><td colSpan="7" className="px-5 py-14 text-center text-slate-500">{orders.length ? "No orders match your filters." : "No orders yet. Orders placed through checkout will appear here."}</td></tr>}
      </tbody></table></div>
    </section><p className="mt-4 text-xs text-slate-500">This vendor workspace uses orders saved in this browser; no server order API is connected here.</p>
  </div></main>;
}

function OrderStat({ label, value }) { return <div className="rounded-2xl border bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>; }

export default Orders;
