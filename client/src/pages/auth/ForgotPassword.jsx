import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);
    try {
      const result = await api.auth.forgotPassword({ email: email.trim() });
      setNotice(result.message || "If an account exists for that email, a reset link will be sent.");
    } catch (requestError) {
      setError(requestError.status === 404
        ? "Password reset is not available yet. The backend needs the forgot-password endpoint."
        : requestError.message || "Could not request a password reset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500 text-2xl text-white">🔐</div><h1 className="mt-5 text-3xl font-bold">Forgot password?</h1><p className="mt-2 text-gray-500">Enter your account email and we’ll send reset instructions.</p></div>
        {error && <div role="alert" className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {notice && <div role="status" className="mt-6 rounded-lg bg-green-50 p-3 text-sm text-green-800">{notice}</div>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-medium">Email<input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500" /></label>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60">{loading ? "Sending…" : "Send reset link"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500"><Link to="/login" className="font-semibold text-orange-500 hover:underline">Back to login</Link></p>
      </section>
    </main>
  );
}

export default ForgotPassword;
