import { Link } from "react-router-dom";

function Checkout() {
  const cartItems = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2499,
      quantity: 1,
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 3999,
      quantity: 1,
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 1999,
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal >= 5000 ? 0 : 99;
  const total = subtotal + delivery;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="mb-2 font-medium text-gray-600">
            ShopSaaS Checkout
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Checkout
          </h1>

          <p className="mt-3 text-gray-600">
            Complete your order with a simple and secure checkout.
          </p>
        </div>
      </section>

      {/* Checkout Content */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Left Side */}
          <div className="space-y-8 lg:col-span-2">

            {/* Contact Information */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Contact Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter your contact details for order updates.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    First Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Last Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Shipping Address
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Where should we deliver your order?
              </p>

              <div className="mt-6 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Address
                  </label>

                  <textarea
                    rows="3"
                    placeholder="Enter your full address"
                    className="w-full resize-none rounded-lg border px-4 py-3 outline-none transition focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      City
                    </label>

                    <input
                      type="text"
                      placeholder="City"
                      className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      State
                    </label>

                    <input
                      type="text"
                      placeholder="State"
                      className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      PIN Code
                    </label>

                    <input
                      type="text"
                      placeholder="PIN Code"
                      className="w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
                    />
                  </div>

                </div>

              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Payment Method
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select your preferred payment method.
              </p>

              <div className="mt-6 space-y-4">

                {/* Card */}
                <label className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-medium">
                      Credit / Debit Card
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Pay securely using your card.
                    </p>
                  </div>
                </label>

                {/* UPI */}
                <label className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-medium">
                      UPI
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Pay using your preferred UPI app.
                    </p>
                  </div>
                </label>

                {/* COD */}
                <label className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-medium">
                      Cash on Delivery
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Pay when your order arrives.
                    </p>
                  </div>
                </label>

              </div>
            </div>

          </div>

          {/* Right Side - Order Summary */}
          <div>
            <div className="sticky top-6 rounded-xl border bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              {/* Products */}
              <div className="mt-6 space-y-5">

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      <span className="text-xs text-gray-400">
                        Image
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="text-sm font-medium">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}

              </div>

              {/* Price Details */}
              <div className="mt-6 space-y-4 border-t pt-6">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span>
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>

                  <span>
                    {delivery === 0
                      ? "Free"
                      : `₹${delivery}`}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>

                    <span>
                      ₹{total.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

              </div>

              {/* Place Order */}
              <button className="mt-6 w-full rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800">
                Place Order
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
                Your payment information is secure.
              </p>

              <Link
                to="/cart"
                className="mt-4 block text-center text-sm font-medium underline underline-offset-4"
              >
                ← Back to Cart
              </Link>

            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Checkout;