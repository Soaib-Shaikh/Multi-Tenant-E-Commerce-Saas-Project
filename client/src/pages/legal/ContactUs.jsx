import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

function ContactUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Contact Us
          </h1>

          <p className="text-slate-600 mb-10">
            Have a question about your order, payment or our services?
            We are happy to help.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <Mail className="w-6 h-6 text-indigo-500 mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">
                Email
              </h3>
              <p className="text-sm text-slate-600">
                support@aurastore.com
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <Phone className="w-6 h-6 text-emerald-500 mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">
                Phone
              </h3>
              <p className="text-sm text-slate-600">
                +91 00000 00000
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <MapPin className="w-6 h-6 text-purple-500 mb-3" />
              <h3 className="font-bold text-slate-900 mb-1">
                Address
              </h3>
              <p className="text-sm text-slate-600">
                Gujarat, India
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-2xl p-5">
              <h3 className="font-bold mb-1">
                Message received!
              </h3>
              <p className="text-sm">
                Thank you for contacting us. Our support team will get
                back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Message
                </label>

                <textarea
                  required
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default ContactUs;