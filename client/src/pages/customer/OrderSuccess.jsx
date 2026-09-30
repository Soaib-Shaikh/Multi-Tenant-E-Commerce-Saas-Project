import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { api } from "../../api/client";

function OrderSuccess() {
  const location = useLocation();
  const savedOrder = useSelector((state) => state.orders.orders[0]);
  const [order, setOrder] = useState(location.state?.order || savedOrder || null);
  useEffect(() => {
    if (order) return;
    let active = true;
    api.orders.list().then((orders) => { if (active) setOrder(orders[0] || null); }).catch(() => {});
    return () => { active = false; };
  }, [order]);
  return <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6"><div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm md:p-12"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">✓</div><h1 className="mt-6 text-3xl font-bold">{order?.status === "Confirmed" ? "Payment confirmed" : "Order status"}</h1><p className="mt-4 leading-7 text-gray-500">{order?.status === "Confirmed" ? "Your payment was verified by the server and your order has been saved." : "Your latest server order status is shown below."}</p>{order && <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left"><p className="text-sm text-gray-500">Order ID</p><p className="font-bold">{order.id}</p><p className="mt-2 text-sm text-gray-500">{order.date} · ₹{Number(order.total).toLocaleString("en-IN")}</p></div>}<div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link to="/products" className="flex-1 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white">Continue shopping</Link><Link to="/orders" className="flex-1 rounded-xl border px-6 py-3 font-semibold">View orders</Link></div></div></main>;
}
export default OrderSuccess;
