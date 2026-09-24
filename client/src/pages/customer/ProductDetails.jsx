import { Link, useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    category: "Electronics",
    description:
      "Enjoy clear sound and comfortable listening with these wireless headphones. Perfect for music, movies, calls and everyday use.",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    category: "Electronics",
    description:
      "Track your daily activities, notifications and fitness goals with this stylish smart watch.",
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1999,
    category: "Sports",
    description:
      "Lightweight and comfortable running shoes designed for everyday workouts and outdoor activities.",
  },
  {
    id: 4,
    name: "Travel Backpack",
    price: 1299,
    category: "Fashion",
    description:
      "A spacious and durable backpack suitable for college, travel and everyday use.",
  },
  {
    id: 5,
    name: "Mechanical Keyboard",
    price: 3499,
    category: "Electronics",
    description:
      "A responsive mechanical keyboard designed for comfortable typing and gaming.",
  },
  {
    id: 6,
    name: "Cotton T-Shirt",
    price: 799,
    category: "Fashion",
    description:
      "Soft and comfortable cotton T-shirt suitable for everyday wear.",
  },
  {
    id: 7,
    name: "Water Bottle",
    price: 599,
    category: "Sports",
    description:
      "Reusable water bottle designed to keep you hydrated throughout the day.",
  },
  {
    id: 8,
    name: "Table Lamp",
    price: 1499,
    category: "Home & Living",
    description:
      "Modern table lamp perfect for study tables, bedrooms and workspaces.",
  },
];

function ProductDetails() {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Product Not Found</h1>
          <Link
            to="/products"
            className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-white"
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
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-black">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        {/* Product */}
        <div className="grid gap-10 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          {/* Image */}
          <div className="flex min-h-[450px] items-center justify-center rounded-xl bg-gray-100">
            <span className="text-gray-400">Product Image</span>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold">{product.name}</h1>

            <p className="mt-5 text-3xl font-bold">₹{product.price}</p>

            <p className="mt-6 leading-7 text-gray-600">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mt-8">
              <p className="mb-3 font-medium">Quantity</p>

              <div className="flex w-fit items-center rounded-lg border">
                <button className="px-4 py-2 text-lg hover:bg-gray-100">
                  −
                </button>

                <span className="px-5 py-2">1</span>

                <button className="px-4 py-2 text-lg hover:bg-gray-100">
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="rounded-lg bg-black px-8 py-3 font-medium text-white transition hover:bg-gray-800">
                Add to Cart
              </button>

              <button className="rounded-lg border border-black px-8 py-3 font-medium transition hover:bg-gray-100">
                Buy Now
              </button>
            </div>

            {/* Information */}
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between border-b py-3">
                <span className="text-gray-500">Category</span>
                <span className="font-medium">{product.category}</span>
              </div>

              <div className="flex justify-between py-3">
                <span className="text-gray-500">Availability</span>
                <span className="font-medium text-green-600">
                  In Stock
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <Link
          to="/products"
          className="mt-8 inline-block font-medium underline"
        >
          ← Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default ProductDetails;