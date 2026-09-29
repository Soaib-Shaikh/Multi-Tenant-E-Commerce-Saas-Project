import { Link } from "react-router-dom";

import { products } from "../../data/products";

const featuredProducts = products.slice(0, 4);

const categories = [
  {
    name: "Electronics",
    icon: "💻",
    description: "Tech & gadgets",
  },
  {
    name: "Fashion",
    icon: "👕",
    description: "Style & clothing",
  },
  {
    name: "Sports",
    icon: "⚽",
    description: "Fitness & outdoor",
  },
  {
    name: "Home & Living",
    icon: "🏠",
    description: "For your home",
  },
];

function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* ================= HERO SECTION ================= */}
      <section className="overflow-hidden bg-white">
        <div className="mx-auto grid min-h-[580px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">

          {/* Left Content */}
          <div>

            <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              ✨ Your everyday shopping destination
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl">
              Everything you need,
              <span className="block text-orange-500">
                all in one place.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Discover products from multiple stores with a simple,
              secure and convenient shopping experience.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/products"
                className="rounded-xl bg-orange-500 px-7 py-3.5 font-semibold text-white transition hover:bg-orange-600"
              >
                Shop Now →
              </Link>

              <Link
                to="/products"
                className="rounded-xl border border-gray-300 bg-white px-7 py-3.5 font-semibold transition hover:bg-gray-100"
              >
                Explore Products
              </Link>

            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-8">

              <div>
                <p className="text-2xl font-bold">
                  500+
                </p>

                <p className="text-sm text-gray-500">
                  Products
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">
                  50+
                </p>

                <p className="text-sm text-gray-500">
                  Categories
                </p>
              </div>

              <div>
                <p className="text-2xl font-bold">
                  24/7
                </p>

                <p className="text-sm text-gray-500">
                  Support
                </p>
              </div>

            </div>

          </div>

          {/* Right Hero Image */}
          <div className="relative">

            <div className="overflow-hidden rounded-3xl bg-orange-50 shadow-sm">

              <img
                src={products[0].image}
                alt={`${products[0].name} featured in the ShopSaaS store`}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = products[2].image;
                }}
                fetchPriority="high"
                className="h-[430px] w-full object-cover transition duration-500 hover:scale-105"
              />

            </div>

            {/* Rating Card */}
            <div className="absolute -bottom-5 -left-5 rounded-2xl border bg-white p-4 shadow-lg">

              <p className="text-sm text-gray-500">
                Customer Rating
              </p>

              <p className="mt-1 font-bold">
                ⭐ 4.8 / 5
              </p>

            </div>

            {/* Offer Card */}
            <div className="absolute -right-4 top-8 rounded-2xl bg-orange-500 p-4 text-white shadow-lg">

              <p className="text-sm">
                Special Offer
              </p>

              <p className="mt-1 text-xl font-bold">
                Up to 30% OFF
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="flex items-end justify-between">

          <div>
            <p className="font-semibold text-orange-500">
              Browse
            </p>

            <h2 className="mt-1 text-3xl font-bold">
              Shop by Category
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden font-medium text-orange-500 hover:underline sm:block"
          >
            View All →
          </Link>

        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

          {categories.map((category) => (
            <Link
              key={category.name}
              to="/products"
              className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-md"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-3xl">
                {category.icon}
              </div>

              <h3 className="mt-5 font-semibold group-hover:text-orange-500">
                {category.name}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {category.description}
              </p>

            </Link>
          ))}

        </div>

      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="bg-white py-16">

        <div className="mx-auto max-w-7xl px-6">

          <div className="flex items-end justify-between">

            <div>
              <p className="font-semibold text-orange-500">
                Trending Now
              </p>

              <h2 className="mt-1 text-3xl font-bold">
                Featured Products
              </h2>
            </div>

            <Link
              to="/products"
              className="font-medium text-orange-500 hover:underline"
            >
              View All →
            </Link>

          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* Product Image */}
                <div className="h-52 overflow-hidden bg-gray-100">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                </div>

                {/* Product Info */}
                <div className="p-5">

                  <p className="text-xs font-medium uppercase text-gray-400">
                    {product.category}
                  </p>

                  <h3 className="mt-2 font-semibold group-hover:text-orange-500">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex items-center justify-between">

                    <p className="text-lg font-bold">
                      ₹{product.price}
                    </p>

                    <span className="text-sm text-yellow-500">
                      ★ {product.rating}
                    </span>

                  </div>

                </div>

              </Link>
            ))}

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-5 md:grid-cols-3">

          <Feature
            icon="🚚"
            title="Fast Delivery"
            description="Get your orders delivered quickly and safely."
          />

          <Feature
            icon="🔒"
            title="Secure Payment"
            description="Your payment information is protected."
          />

          <Feature
            icon="↩️"
            title="Easy Returns"
            description="Simple and convenient return experience."
          />

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="mx-6 mb-16 overflow-hidden rounded-3xl bg-black text-white">

        <div className="mx-auto max-w-7xl px-6 py-14 text-center">

          <h2 className="text-3xl font-bold md:text-4xl">
            Ready to start shopping?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Explore our collection and find something you'll love.
          </p>

          <Link
            to="/products"
            className="mt-7 inline-block rounded-xl bg-orange-500 px-7 py-3.5 font-semibold transition hover:bg-orange-600"
          >
            Explore Products →
          </Link>

        </div>

      </section>

      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ShopSaaS. A multi-store shopping demo.</p>
          <div className="flex gap-5"><Link to="/products" className="hover:text-orange-600">Products</Link><Link to="/cart" className="hover:text-orange-600">Cart</Link><Link to="/profile" className="hover:text-orange-600">Account</Link></div>
        </div>
      </footer>

    </main>
  );
}

/* ================= FEATURE COMPONENT ================= */

function Feature({
  icon,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="text-3xl">
        {icon}
      </div>

      <h3 className="mt-4 font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

    </div>
  );
}

export default Home;
