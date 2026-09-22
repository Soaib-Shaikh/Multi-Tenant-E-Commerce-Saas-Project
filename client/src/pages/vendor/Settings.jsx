function Settings() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">

          <p className="mb-2 font-medium text-gray-600">
            Vendor Panel
          </p>

          <h1 className="text-4xl font-bold">
            Store Settings
          </h1>

          <p className="mt-3 text-gray-600">
            Manage your store information and account settings.
          </p>

        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10">

        {/* Store Information */}
        <div className="rounded-xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold">
              Store Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Update your storefront information.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

            <div>
              <label className="text-sm font-medium">
                Store Name
              </label>

              <input
                type="text"
                defaultValue="TechZone Store"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Owner Name
              </label>

              <input
                type="text"
                defaultValue="Arun Kumar"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                defaultValue="arun@techzone.com"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Phone Number
              </label>

              <input
                type="text"
                defaultValue="+91 98765 43210"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div className="md:col-span-2">

              <label className="text-sm font-medium">
                Store Description
              </label>

              <textarea
                rows="4"
                defaultValue="TechZone Store provides quality electronics and accessories at affordable prices."
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />

            </div>

          </div>

        </div>

        {/* Store Address */}
        <div className="mt-8 rounded-xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold">
              Store Address
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your business address.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">

            <div className="md:col-span-2">

              <label className="text-sm font-medium">
                Address
              </label>

              <textarea
                rows="3"
                defaultValue="12 Main Road, Anna Nagar"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />

            </div>

            <div>
              <label className="text-sm font-medium">
                City
              </label>

              <input
                type="text"
                defaultValue="Chennai"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                State
              </label>

              <input
                type="text"
                defaultValue="Tamil Nadu"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                PIN Code
              </label>

              <input
                type="text"
                defaultValue="600040"
                className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-black"
              />
            </div>

          </div>

        </div>

        {/* Payment Settings */}
        <div className="mt-8 rounded-xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold">
              Payment Settings
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Configure your payment information.
            </p>

          </div>

          <div className="space-y-5 p-6">

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">
                Accept Credit / Debit Card
              </span>

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">
                Accept UPI Payments
              </span>

            </label>

            <label className="flex items-center gap-3">

              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">
                Accept Cash on Delivery
              </span>

            </label>

          </div>

        </div>

        {/* Save */}
        <div className="mt-8 flex justify-end">

          <button className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800">
            Save Changes
          </button>

        </div>

      </section>

    </main>
  );
}

export default Settings;