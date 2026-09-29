import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Orders() {
  const orders = useSelector((state) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-4xl">
            📦
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            No Orders Yet
          </h1>

          <p className="mt-3 text-gray-500">
            You haven't placed any orders yet.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="font-semibold text-orange-500">
            Account
          </p>

          <h1 className="mt-1 text-4xl font-bold">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            View your previous orders and order details.
          </p>
        </div>

        {/* Orders */}
        <div className="space-y-6">

          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
            >

              {/* Order Header */}
              <div className="flex flex-col justify-between gap-4 border-b bg-gray-50 p-5 sm:flex-row sm:items-center">

                <div>
                  <p className="text-sm text-gray-500">
                    Order ID
                  </p>

                  <p className="mt-1 font-bold">
                    {order.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Order Date
                  </p>

                  <p className="mt-1 font-medium">
                    {order.date}
                  </p>
                </div>

                <div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                    {order.status}
                  </span>
                </div>

              </div>

              {/* Products */}
              <div className="divide-y">

                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-xl object-cover"
                    />

                    <div className="flex flex-1 items-center justify-between gap-4">

                      <div>
                        <h2 className="font-semibold">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold">
                        ₹{item.price * item.quantity}
                      </p>

                    </div>
                  </div>
                ))}

              </div>

              {/* Order Footer */}
              <div className="flex flex-col gap-3 border-t p-5 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    Payment
                  </p>

                  <p className="font-medium">
                    {order.paymentMethod}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Total Amount
                  </p>

                  <p className="text-2xl font-bold text-orange-500">
                    ₹{order.total}
                  </p>
                </div>

              </div>

              {/* View Details */}
              <div className="border-t bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-orange-500">
                View Order Details →
              </div>

            </Link>
          ))}

        </div>
      </div>
    </main>
  );
}

export default Orders;