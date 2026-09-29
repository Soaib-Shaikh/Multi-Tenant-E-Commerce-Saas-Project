import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderDetails() {
  const { id } = useParams();

  const orders = useSelector((state) => state.orders.orders);

  const order = orders.find((item) => item.id === id);

  if (!order) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <div className="text-5xl">📦</div>

          <h1 className="mt-5 text-3xl font-bold">
            Order Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            This order could not be found.
          </p>

          <Link
            to="/orders"
            className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/orders"
            className="text-sm font-medium text-orange-500 hover:underline"
          >
            ← Back to Orders
          </Link>

          <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                {order.id}
              </h1>
            </div>

            <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
              ✓ {order.status}
            </span>
          </div>
        </div>

        {/* Order Information */}
        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Order Date
            </p>

            <p className="mt-2 font-semibold">
              {order.date}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Payment Method
            </p>

            <p className="mt-2 font-semibold">
              {order.paymentMethod}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Total Amount
            </p>

            <p className="mt-2 text-xl font-bold text-orange-500">
              ₹{order.total}
            </p>
          </div>

        </div>

        {/* Products */}
        <div className="mt-6 rounded-2xl border bg-white shadow-sm">

          <div className="border-b p-6">
            <h2 className="text-xl font-bold">
              Ordered Items
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {order.items.length} product
              {order.items.length !== 1 ? "s" : ""} in this order
            </p>
          </div>

          <div className="divide-y">

            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-xl object-cover"
                />

                <div className="flex flex-1 flex-col justify-center">

                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Category: {item.category}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>

                </div>

                <div className="flex items-center">
                  <p className="font-bold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* Delivery Information */}
        {order.customer && (
          <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Delivery Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">

              <div>
                <p className="text-sm text-gray-500">
                  Customer
                </p>

                <p className="mt-1 font-medium">
                  {order.customer.firstName}{" "}
                  {order.customer.lastName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="mt-1 font-medium">
                  {order.customer.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="mt-1 font-medium">
                  {order.customer.phone || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  City
                </p>

                <p className="mt-1 font-medium">
                  {order.customer.city || "Not provided"}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">
                  Delivery Address
                </p>

                <p className="mt-1 font-medium">
                  {order.customer.address || "Not provided"}
                </p>

                {order.customer.pincode && (
                  <p className="mt-1 text-sm text-gray-500">
                    Pincode: {order.customer.pincode}
                  </p>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Price Summary */}
        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold">
            Price Summary
          </h2>

          <div className="mt-5 space-y-4">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span>
                ₹{order.subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Shipping
              </span>

              <span>
                ₹{order.shipping}
              </span>
            </div>

            <div className="flex justify-between border-t pt-4 text-lg font-bold">
              <span>
                Total
              </span>

              <span className="text-orange-500">
                ₹{order.total}
              </span>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

export default OrderDetails;