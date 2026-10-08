import React from "react";

function ShippingPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Shipping Policy
          </h1>

          <p className="text-sm text-slate-500 mb-8">
            Last updated: October 2026
          </p>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                1. Shipping Information
              </h2>
              <p>
                AuraStore delivers products to the shipping address provided
                by the customer during checkout. Please make sure that your
                shipping information is accurate and complete before placing
                an order.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                2. Order Processing
              </h2>
              <p>
                Orders are normally processed after successful payment and
                order confirmation. Processing time may vary depending on
                product availability and order volume.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                3. Delivery Time
              </h2>
              <p>
                Estimated delivery time may vary depending on the delivery
                location, product availability and shipping partner.
                Delivery timelines shown during checkout are estimates and
                may occasionally change due to circumstances beyond our
                control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. Shipping Charges
              </h2>
              <p>
                Applicable shipping charges, if any, will be displayed during
                checkout before the order is placed. Shipping charges may
                depend on the order value, delivery location and selected
                shipping method.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                5. Order Tracking
              </h2>
              <p>
                Where tracking information is available, customers may
                receive tracking details through their account or through
                communication related to their order.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                6. Delayed Deliveries
              </h2>
              <p>
                Delivery may be delayed due to weather conditions, public
                holidays, transportation issues, incorrect address details,
                or other circumstances outside our reasonable control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                7. Incorrect or Incomplete Address
              </h2>
              <p>
                Customers are responsible for providing a correct and
                complete delivery address. AuraStore may not be responsible
                for delays or failed delivery caused by incorrect or
                incomplete address information provided by the customer.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                8. Damaged or Missing Package
              </h2>
              <p>
                If your package arrives damaged or appears to be missing
                items, please contact our support team as soon as possible
                with your order details so that we can review the issue.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                9. Contact Us
              </h2>
              <p>
                If you have questions about shipping or delivery, please
                contact us through the Contact Us section of our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ShippingPolicy;