import React from "react";

function CancellationRefundPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Cancellation & Refund Policy
          </h1>

          <p className="text-sm text-slate-500 mb-8">
            Last updated: October 2026
          </p>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                1. Order Cancellation
              </h2>
              <p>
                Customers may request cancellation of an order before it has
                been processed or shipped. Cancellation requests may not be
                accepted after the order has entered the shipping process.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                2. Cancellation Request
              </h2>
              <p>
                To request an order cancellation, customers should contact
                our support team with their order details as soon as possible.
                We will review the request and confirm whether cancellation
                is possible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                3. Refund Eligibility
              </h2>
              <p>
                Refunds may be provided for eligible cancelled orders,
                approved returns, damaged products or other situations
                covered by our policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. Refund Processing
              </h2>
              <p>
                Once a refund is approved, the refund will be processed
                through the applicable payment method or payment gateway.
                The time required for the amount to appear in the customer's
                account may depend on the payment provider or financial
                institution.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                5. Returned Products
              </h2>
              <p>
                Products approved for return may need to be unused, in their
                original condition and accompanied by the applicable
                packaging or documentation. Return eligibility may vary
                depending on the product.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                6. Non-Refundable Situations
              </h2>
              <p>
                Refunds may not be available for products that have been
                damaged through misuse, unauthorized modification or other
                conditions outside the applicable return policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                7. Contact Us
              </h2>
              <p>
                For cancellation or refund requests, please contact our
                support team with your order number and relevant details.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CancellationRefundPolicy;