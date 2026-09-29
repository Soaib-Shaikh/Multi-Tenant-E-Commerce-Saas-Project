import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 50 : 0;

  const total = subtotal + shipping;

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">

        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">

          <div className="text-center">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100 text-5xl">
              🛒
            </div>

            <h1 className="mt-6 text-3xl font-bold">
              Your Cart is Empty
            </h1>

            <p className="mt-3 text-gray-500">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-block rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Start Shopping →
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">

          <p className="font-medium text-orange-500">
            ShopSaaS
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Shopping Cart
          </h1>

          <p className="mt-3 text-gray-500">
            Review your items before checkout.
          </p>

        </div>
      </section>

      {/* Cart Content */}
      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Cart Items */}
          <div className="space-y-4">

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl border bg-white p-5 shadow-sm sm:flex-row"
              >

                {/* Product Image */}
                <Link
                  to={`/products/${item.id}`}
                  className="h-32 w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-32"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl">
                      🛍️
                    </div>
                  )}
                </Link>

                {/* Product Details */}
                <div className="flex flex-1 flex-col">

                  <div className="flex justify-between gap-4">

                    <div>

                      <p className="text-xs font-medium uppercase text-gray-400">
                        {item.category}
                      </p>

                      <Link
                        to={`/products/${item.id}`}
                        className="mt-1 block text-lg font-semibold hover:text-orange-500"
                      >
                        {item.name}
                      </Link>

                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        dispatch(removeFromCart(item.id))
                      }
                      className="text-sm text-gray-400 transition hover:text-red-500"
                    >
                      Remove
                    </button>

                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">

                    {/* Quantity */}
                    <div className="flex items-center overflow-hidden rounded-lg border">

                      <button
                        onClick={() =>
                          dispatch(decreaseQuantity(item.id))
                        }
                        className="px-4 py-2 text-lg transition hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="min-w-12 border-x px-4 py-2 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          dispatch(increaseQuantity(item.id))
                        }
                        className="px-4 py-2 text-lg transition hover:bg-gray-100"
                      >
                        +
                      </button>

                    </div>

                    {/* Price */}
                    <div className="text-right">

                      <p className="text-lg font-bold">
                        ₹
                        {(item.price * item.quantity).toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      {item.quantity > 1 && (
                        <p className="text-xs text-gray-400">
                          ₹{item.price.toLocaleString("en-IN")} ×{" "}
                          {item.quantity}
                        </p>
                      )}

                    </div>

                  </div>

                </div>

              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              to="/products"
              className="inline-block pt-3 font-medium text-gray-600 transition hover:text-orange-500"
            >
              ← Continue Shopping
            </Link>

          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>

                <span>
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>

                <span>
                  ₹{shipping.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="border-t pt-4">

                <div className="flex items-center justify-between">

                  <span className="text-lg font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-orange-500">
                    ₹{total.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

            </div>

            {/* Checkout */}
            <Link
              to="/checkout"
              className="mt-7 block rounded-xl bg-orange-500 px-6 py-3.5 text-center font-semibold text-white transition hover:bg-orange-600"
            >
              Proceed to Checkout →
            </Link>

            {/* Security */}
            <div className="mt-5 rounded-xl bg-gray-50 p-4">

              <div className="flex gap-3">

                <span className="text-xl">
                  🔒
                </span>

                <div>

                  <p className="text-sm font-semibold">
                    Secure Checkout
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Your payment and personal information are protected.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Cart;