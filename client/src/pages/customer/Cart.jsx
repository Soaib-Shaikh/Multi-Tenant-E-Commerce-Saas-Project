import { Link } from "react-router-dom";

function Cart() {
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
            Your Shopping Cart
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Shopping Cart
          </h1>

          <p className="mt-3 text-gray-600">
            Review your selected products before checkout.
          </p>
        </div>
      </section>

      {/* Cart */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="border-b px-6 py-5">
                <h2 className="text-xl font-bold">
                  Cart Items
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {cartItems.length} products in your cart
                </p>
              </div>

              <div>
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="mt-6 inline-flex items-center font-medium text-gray-700 underline underline-offset-4 transition hover:text-black"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-6 rounded-xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
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

              {/* Checkout */}
              <button className="mt-6 w-full rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800">
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
                Secure and convenient shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CartItem({ item }) {
  return (
    <div className="flex flex-col gap-5 border-b p-6 last:border-b-0 sm:flex-row sm:items-center">
      {/* Product Image */}
      <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-lg bg-gray-100 sm:w-28">
        <span className="text-sm text-gray-400">
          Product Image
        </span>
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold">
          {item.name}
        </h3>

        <p className="mt-2 font-medium">
          ₹{item.price.toLocaleString("en-IN")}
        </p>

        <button className="mt-3 text-sm text-gray-500 underline underline-offset-4 hover:text-black">
          Remove
        </button>
      </div>

      {/* Quantity */}
      <div className="flex items-center rounded-lg border">
        <button className="flex h-9 w-9 items-center justify-center text-lg transition hover:bg-gray-100">
          −
        </button>

        <span className="flex h-9 w-10 items-center justify-center border-x text-sm font-medium">
          {item.quantity}
        </span>

        <button className="flex h-9 w-9 items-center justify-center text-lg transition hover:bg-gray-100">
          +
        </button>
      </div>

      {/* Item Total */}
      <div className="min-w-24 text-left sm:text-right">
        <p className="text-sm text-gray-500">
          Total
        </p>

        <p className="mt-1 font-bold">
          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}

export default Cart;