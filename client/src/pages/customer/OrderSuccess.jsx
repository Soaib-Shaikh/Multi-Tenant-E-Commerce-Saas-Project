import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderSuccess() {
  const order = useSelector((state) => state.orders.orders[0]);
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-sm md:p-12">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Order Placed Successfully!
        </h1>

        <p className="mt-4 leading-7 text-gray-500">
          {order ? "Your order has been saved in this browser and is ready for processing." : "No recent order was found in this browser."}
        </p>

        {order && <div className="mt-6 space-y-3 rounded-xl bg-gray-50 p-4 text-left">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-bold">{order.id}</p>
          <p className="text-sm text-gray-500">{order.date} · {order.paymentMethod} · ₹{Number(order.total).toLocaleString("en-IN")}</p>
        </div>}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/products"
            className="flex-1 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Continue Shopping
          </Link>

          <Link
            to={order ? "/orders" : "/products"}
            className="flex-1 rounded-xl border px-6 py-3 font-semibold transition hover:bg-gray-100"
          >
            {order ? "View Orders" : "Browse Products"}
          </Link>
        </div>

      </div>
    </main>
  );
}

export default OrderSuccess;
