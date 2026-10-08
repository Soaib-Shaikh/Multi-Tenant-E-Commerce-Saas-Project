import React from "react";

function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Terms & Conditions
          </h1>

          <p className="text-sm text-slate-500 mb-8">
            Last updated: October 2026
          </p>

          <div className="space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                1. Introduction
              </h2>
              <p>
                Welcome to AuraStore. By accessing or using our website,
                you agree to comply with and be bound by these Terms &
                Conditions. If you do not agree with these terms, please
                do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                2. Products and Orders
              </h2>
              <p>
                We provide products and services through our e-commerce
                platform. Product information, pricing, availability and
                other details may be updated from time to time.
              </p>
              <p className="mt-3">
                An order is considered successfully placed after the
                required payment process has been completed and the order
                has been confirmed.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                3. Payments
              </h2>
              <p>
                Payments are processed securely through our authorized
                payment gateway. We do not directly store your complete
                card or payment credentials on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. Pricing
              </h2>
              <p>
                Prices displayed on the website may change without prior
                notice. We reserve the right to correct pricing errors,
                product information or availability when necessary.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                5. User Account
              </h2>
              <p>
                Users are responsible for maintaining the confidentiality
                of their account information and for all activities carried
                out through their account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                6. Cancellation and Refunds
              </h2>
              <p>
                Orders may be eligible for cancellation or refund according
                to our Cancellation & Refund Policy. Refund eligibility may
                depend on the order status and product conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                7. Shipping
              </h2>
              <p>
                Orders are shipped to the address provided by the customer
                during checkout. Delivery timelines may vary depending on
                the delivery location and availability of the product.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                8. Contact Us
              </h2>
              <p>
                If you have any questions regarding these Terms &
                Conditions, please contact us through the Contact Us page
                available on our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                9. Changes to These Terms
              </h2>
              <p>
                We may update these Terms & Conditions from time to time.
                Any changes will be published on this page with the updated
                date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TermsAndConditions;