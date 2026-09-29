import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearCart } from "../../redux/cartSlice";
import { addOrder } from "../../redux/orderSlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [customer, setCustomer] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    if (cartItems.length === 0) {
      return;
    }

    const order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,

      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      items: cartItems.map((item) => ({ ...item })),

      customer,

      subtotal,

      shipping,

      total,

      paymentMethod,

      status: "Order Placed",
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-4xl">
            🛒
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Your Cart is Empty
          </h1>

          <p className="mt-3 text-gray-500">
            Add some products before checking out.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-8">
          <p className="font-semibold text-orange-500">
            ShopSaaS
          </p>

          <h1 className="mt-1 text-4xl font-bold">
            Checkout
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Customer Details */}
          <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-2">

            <h2 className="text-xl font-bold">
              Customer Information
            </h2>

            <form onSubmit={handlePlaceOrder}>
            <div className="mt-6 grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  required
                  value={customer.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  required
                  value={customer.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={customer.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  value={customer.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">
                  Address
                </label>

                <textarea
                  rows="3"
                  name="address"
                  required
                  value={customer.address}
                  onChange={handleChange}
                  placeholder="Enter delivery address"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  required
                  value={customer.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  required
                  value={customer.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="mt-10 border-t pt-8">

              <h2 className="text-xl font-bold">
                Payment Method
              </h2>

              <div className="mt-5 space-y-3">

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:border-orange-400">
                  <input
                    type="radio"
                    name="payment"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>Cash on Delivery</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:border-orange-400">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>UPI</span>
                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:border-orange-400">
                  <input
                    type="radio"
                    name="payment"
                    value="Credit / Debit Card"
                    checked={paymentMethod === "Credit / Debit Card"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <span>Credit / Debit Card</span>
                </label>

              </div>
            </div>

            {/* Place Order */}
            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Place Order • ₹{total}
            </button>
            <p className="mt-3 text-xs leading-5 text-gray-500">Demo checkout: choosing UPI or card records your selected method only. No payment is charged or processed.</p>
            </form>

          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-xl border bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b pb-4"
                >
                    {item.image ? <img
                      src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                    /> : <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange-50">🛍️</div>}

                  <div className="flex-1">
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Subtotal
                </span>

                <span>
                  ₹{subtotal}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Shipping
                </span>

                <span>
                  ₹{shipping}
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>

                  <span className="text-orange-500">
                    ₹{total}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Checkout;
