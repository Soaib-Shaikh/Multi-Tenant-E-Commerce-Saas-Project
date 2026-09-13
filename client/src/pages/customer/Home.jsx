import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gray-100">
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-16">
          <div className="max-w-2xl">
            <p className="mb-4 font-medium text-gray-600">
              Welcome to ShopSaaS
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Everything you need,
              <br />
              all in one place.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-gray-600">
              Discover products from multiple stores and enjoy a simple,
              secure and convenient shopping experience.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-block rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-bold">Shop by Category</h2>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Category name="Electronics" />
          <Category name="Fashion" />
          <Category name="Home & Living" />
          <Category name="Sports" />
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Products</h2>

          <Link
            to="/products"
            className="font-medium underline"
          >
            View All
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <ProductPreview name="Wireless Headphones" price="₹1,499" />
          <ProductPreview name="Smart Watch" price="₹3,999" />
          <ProductPreview name="Running Shoes" price="₹1,999" />
          <ProductPreview name="Backpack" price="₹1,199" />
        </div>
      </section>
    </main>
  );
}

function Category({ name }) {
  return (
    <div className="flex h-32 items-center justify-center rounded-xl border bg-white text-lg font-semibold shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      {name}
    </div>
  );
}

function ProductPreview({ name, price }) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex h-48 items-center justify-center rounded-lg bg-gray-100">
        <span className="text-gray-400">Product Image</span>
      </div>

      <h3 className="mt-4 font-semibold">{name}</h3>

      <p className="mt-2 font-medium">{price}</p>
    </div>
  );
}

export default Home;