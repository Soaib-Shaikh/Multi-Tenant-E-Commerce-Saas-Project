import { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api, normalizeUser } from "../../api/client";
import { login } from "../../redux/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedRole = ["customer", "vendor", "admin"].includes(searchParams.get("role")) ? searchParams.get("role") : "customer";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await api.auth.login({ email, password });
      const user = normalizeUser(result.user);
      if (user.role !== requestedRole) {
        const accountType = user.role === "vendor" ? "Vendor" : user.role === "admin" ? "Admin" : "Customer";
        throw new Error(`This is a ${accountType} account. Select ${accountType} login to continue.`);
      }
      dispatch(login({ user, token: result.token }));
      const destination = location.state?.from || (user.role === "admin" ? "/admin/dashboard" : user.role === "vendor" ? "/vendor/dashboard" : "/");
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(requestError.message || "Could not sign in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500 text-2xl text-white">🛍</div><h1 className="mt-5 text-3xl font-bold">Login</h1><p className="mt-2 text-gray-500">Choose your account and sign in.</p></div>
        <div className="mt-6 grid grid-cols-3 gap-2" aria-label="Choose login type">
          {[ ["customer", "Customer", "🛍"], ["vendor", "Seller", "🏪"], ["admin", "Admin", "⚙️"] ].map(([role, label, icon]) => (
            <button key={role} type="button" aria-pressed={requestedRole === role} onClick={() => setSearchParams({ role })} className={`rounded-xl border px-2 py-3 text-center text-sm font-semibold transition ${requestedRole === role ? "border-orange-500 bg-orange-50 text-orange-700" : "bg-white text-slate-600 hover:border-orange-300"}`}>
              <span className="block text-lg">{icon}</span>{label}
            </button>
          ))}
        </div>
        {error && <div role="alert" className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <label className="block text-sm font-medium">Email<input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500" /></label>
          <label className="block text-sm font-medium">Password<input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" className="mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500" /></label>
          <p className="-mt-3 text-right text-sm"><Link to="/forgot-password" className="font-semibold text-orange-500 hover:underline">Forgot password?</Link></p>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60">{loading ? "Signing in…" : "Login"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">Don’t have a customer account? <Link to="/signup" className="font-semibold text-orange-500 hover:underline">Sign up</Link></p>
        <p className="mt-3 text-center text-xs text-slate-500">Shopping customers can sign in above. Seller and admin workspaces use the buttons above.</p>
      </div>
    </main>
  );
}

export default Login;
