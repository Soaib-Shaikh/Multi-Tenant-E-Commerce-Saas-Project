import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { addToCart } from "../../redux/cartSlice";
import Toast from "../../components/common/Toast";
import { products } from "../../data/products";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vendorProducts = useSelector((state) => state.vendorProducts.products);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  const product = [...products, ...vendorProducts].find(
    (item) => item.id === Number(id)
  );

  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    showNotification(
      `${product.name} has been added to your cart.`
    );
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    showNotification(
      "Product added. Taking you to checkout..."
    );

    setTimeout(() => {
      navigate("/checkout");
    }, 800);
  };

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Product Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            The product you are looking for does not exist.
          </p>

          <Link
            to="/products"
            className="mt-5 inline-block rounded-lg bg-orange-500 px-5 py-3 font-medium text-white hover:bg-orange-600"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-gray-500">
          <Link
            to="/"
            className="hover:text-orange-500"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            to="/products"
            className="hover:text-orange-500"
          >
            Products
          </Link>

          <span className="mx-2">/</span>

          <span className="text-gray-700">
            {product.name}
          </span>
        </div>

        {/* Product */}
        <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">

          {/* Product Image */}
          <div className="overflow-hidden rounded-xl bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="h-full min-h-[450px] w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">

            {/* Category + Rating */}
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                {product.category}
              </span>

              <span className="text-sm text-yellow-500">
                ★ {product.rating}
              </span>
            </div>

            {/* Name */}
            <h1 className="mt-4 text-4xl font-bold tracking-tight">
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-5 text-3xl font-bold text-orange-500">
              ₹{product.price}
            </p>

            {/* Description */}
            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-3 font-medium">
                Quantity
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-lg border">

                <button
                  onClick={handleDecrease}
                  className="px-4 py-2 text-lg hover:bg-gray-100"
                >
                  −
                </button>

                <span className="min-w-12 border-x px-5 py-2 text-center font-medium">
                  {quantity}
                </span>

                <button
                  onClick={handleIncrease}
                  className="px-4 py-2 text-lg hover:bg-gray-100"
                >
                  +
                </button>

              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-8 py-3 font-medium text-white hover:bg-orange-600"
              >
                🛒 Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 rounded-lg border border-orange-500 px-8 py-3 font-medium text-orange-600 hover:bg-orange-50"
              >
                ⚡ Buy Now
              </button>

            </div>

            {/* Information */}
            <div className="mt-8 border-t pt-6">

              <div className="flex justify-between border-b py-3">
                <span className="text-gray-500">
                  Category
                </span>

                <span className="font-medium">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-between border-b py-3">
                <span className="text-gray-500">
                  Brand
                </span>

                <span className="font-medium">
                  {product.brand || "ShopSaaS"}
                </span>
              </div>

              <div className="flex justify-between border-b py-3">
                <span className="text-gray-500">Availability</span>
                <span className={`font-medium ${product.stock === 0 ? "text-red-600" : "text-green-600"}`}>{product.stock === 0 ? "Out of stock" : product.stock ? `${product.stock} in stock` : "In stock"}</span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-gray-500">
                  Rating
                </span>

                <span className="font-medium">
                  ⭐ {product.rating} / 5
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* Back */}
        <Link
          to="/products"
          className="mt-8 inline-block font-medium text-gray-700 underline hover:text-orange-500"
        >
          ← Continue Shopping
        </Link>

      </div>

      {/* Toast */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

    </main>
  );
}

export default ProductDetails;
