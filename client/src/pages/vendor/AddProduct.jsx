import { Link, useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API can be connected here later
    console.log("Product added");

    navigate("/vendor/products");
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <p className="mb-2 font-medium text-gray-600">
                Vendor Panel
              </p>

              <h1 className="text-4xl font-bold">
                Add Product
              </h1>

              <p className="mt-3 text-gray-600">
                Add a new product to your store.
              </p>
            </div>

            <Link
              to="/vendor/products"
              className="rounded-lg border px-5 py-3 text-center font-medium transition hover:bg-gray-50"
            >
              ← Back to Products
            </Link>

          </div>

        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-5xl px-6 py-10">

        <form onSubmit={handleSubmit}>

          {/* Basic Information */}
          <div className="rounded-xl border bg-white shadow-sm">

            <div className="border-b p-6">
              <h2 className="text-xl font-bold">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the basic details of your product.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

              {/* Product Name */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium">
                  Product Name
                </label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  required
                  className="mt-2 w-full rounded-lg border px-4 py-3 outline-none transition focus:border-black"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium">
                  Category
                </label>

                <select
                  required
                  className="mt-2 w-full rounded-lg border bg-white px-4 py-3 outline-none focus:border-black"
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="electronics">
                    Electronics
                  </option>

                  <option value="fashion">
                    Fashion
                  </option>

                  <option value="home">
                    Home & Living
                  </option>

                  <option value="sports">
                    Sports
                  </option>

                  <option value="beauty">
                    Beauty
                  </option>
                </select>
              </div>

              {/* SKU */}
              <div>
                <label className="text-sm font-medium">
                  SKU
                </label>

                <input
                  type="text"
                  placeholder="Example: WH-001"
                  className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium">
                  Product Description
                </label>

                <textarea
                  rows="5"
                  placeholder="Write a detailed description of your product..."
                  required
                  className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                />
              </div>

            </div>

          </div>

          {/* Pricing & Inventory */}
          <div className="mt-8 rounded-xl border bg-white shadow-sm">

            <div className="border-b p-6">

              <h2 className="text-xl font-bold">
                Pricing & Inventory
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Set product pricing and stock information.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">

              {/* Price */}
              <div>
                <label className="text-sm font-medium">
                  Price (₹)
                </label>

                <input
                  type="number"
                  placeholder="2499"
                  min="0"
                  required
                  className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* Discount */}
              <div>
                <label className="text-sm font-medium">
                  Discount (%)
                </label>

                <input
                  type="number"
                  placeholder="10"
                  min="0"
                  max="100"
                  className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                />
              </div>

              {/* Stock */}
              <div>
                <label className="text-sm font-medium">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  placeholder="100"
                  min="0"
                  required
                  className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
                />
              </div>

            </div>

          </div>

          {/* Product Images */}
          <div className="mt-8 rounded-xl border bg-white shadow-sm">

            <div className="border-b p-6">

              <h2 className="text-xl font-bold">
                Product Images
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Upload images of your product.
              </p>

            </div>

            <div className="p-6">

              <label
                htmlFor="product-images"
                className="flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center transition hover:border-gray-500"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <span className="text-2xl">
                    +
                  </span>
                </div>

                <p className="mt-4 font-medium">
                  Upload Product Images
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  PNG, JPG or WEBP up to 5MB
                </p>

                <input
                  id="product-images"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  className="hidden"
                />

              </label>

            </div>

          </div>

          {/* Product Status */}
          <div className="mt-8 rounded-xl border bg-white shadow-sm">

            <div className="border-b p-6">

              <h2 className="text-xl font-bold">
                Product Status
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Control the visibility of your product.
              </p>

            </div>

            <div className="p-6">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-gray-50">

                  <input
                    type="radio"
                    name="status"
                    value="active"
                    defaultChecked
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-medium">
                      Active
                    </p>

                    <p className="text-sm text-gray-500">
                      Product will be visible in your store.
                    </p>
                  </div>

                </label>

                <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-gray-50">

                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    className="h-4 w-4"
                  />

                  <div>
                    <p className="font-medium">
                      Draft
                    </p>

                    <p className="text-sm text-gray-500">
                      Product will remain hidden from customers.
                    </p>
                  </div>

                </label>

              </div>

            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <Link
              to="/vendor/products"
              className="rounded-lg border px-6 py-3 text-center font-medium transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800"
            >
              Add Product
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}

export default AddProduct;