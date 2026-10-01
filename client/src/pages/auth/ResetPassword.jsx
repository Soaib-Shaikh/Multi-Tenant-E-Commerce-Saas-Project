import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../api/client";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get("token") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");

    setLoading(true);
    try {
      const result = await api.auth.resetPassword({ token: token.trim(), newPassword: password });
      setNotice(result.message || "Your password has been reset. You can sign in now.");
      setPassword("");
      setConfirmPassword("");
    } catch (requestError) {
      setError(requestError.status === 404
        ? "Password reset is not available yet. The backend needs the reset-password endpoint."
        : requestError.message || "Could not reset your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500 text-2xl text-white">🔑</div><h1 className="mt-5 text-3xl font-bold">Reset password</h1><p className="mt-2 text-gray-500">Choose a new password for your account.</p></div>
        {error && <div role="alert" className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {notice && <div role="status" className="mt-6 rounded-lg bg-green-50 p-3 text-sm text-green-800">{notice} <Link to="/login" className="ml-1 font-semibold underline">Go to login</Link></div>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {!searchParams.get("token") && <label className="block text-sm font-medium">Reset token<input required value={token} onChange={(event) => setToken(event.target.value)} className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500" /></label>}
          <label className="block text-sm font-medium">New password<input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500" /><span className="mt-1 block text-xs font-normal text-slate-500">Use at least 8 characters, including uppercase and lowercase letters, a number, and one of @$!%*?&amp;.</span></label>
          <label className="block text-sm font-medium">Confirm new password<input type="password" required minLength={8} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500" /></label>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60">{loading ? "Resetting…" : "Reset password"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500"><Link to="/login" className="font-semibold text-orange-500 hover:underline">Back to login</Link></p>
      </section>
    </main>
  );
}

export default ResetPassword;
