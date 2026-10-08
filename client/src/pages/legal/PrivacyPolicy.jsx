import React from "react";

function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Privacy Policy
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
                At AuraStore, we respect your privacy and are committed to
                protecting your personal information. This Privacy Policy
                explains how we collect, use and protect information when
                you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                2. Information We Collect
              </h2>
              <p>
                We may collect information that you provide when creating
                an account, placing an order or contacting us.
              </p>

              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Name and contact information</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Shipping and billing address</li>
                <li>Order and transaction information</li>
                <li>Account information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                3. How We Use Your Information
              </h2>
              <p>
                The information we collect may be used to:
              </p>

              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Create and manage your account</li>
                <li>Process and deliver your orders</li>
                <li>Process payments</li>
                <li>Provide customer support</li>
                <li>Send important order-related notifications</li>
                <li>Improve our website and services</li>
                <li>Prevent fraud and unauthorized activity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                4. Payment Information
              </h2>
              <p>
                Payments are processed through our authorized payment
                gateway. AuraStore does not directly store complete
                credit card, debit card or UPI payment credentials on
                its servers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                5. Cookies and Similar Technologies
              </h2>
              <p>
                We may use cookies and similar technologies to maintain
                sessions, remember preferences, improve website
                functionality and understand how users interact with
                our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                6. Information Sharing
              </h2>
              <p>
                We do not sell or rent your personal information. We may
                share necessary information with trusted service providers,
                payment processors, delivery partners or other service
                providers when required to provide our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                7. Data Security
              </h2>
              <p>
                We take reasonable technical and organizational measures
                to protect your personal information against unauthorized
                access, misuse, alteration or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                8. Your Rights
              </h2>
              <p>
                Depending on applicable laws, you may have the right to
                access, update or request deletion of your personal
                information. You may contact us if you would like to
                exercise any applicable privacy rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                9. Children's Privacy
              </h2>
              <p>
                Our services are not intended for children who are unable
                to legally use online shopping services without parental
                or guardian involvement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                10. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any
                changes will be published on this page with the updated
                date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">
                11. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or how
                your information is handled, please contact us through
                the Contact Us section of our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PrivacyPolicy;