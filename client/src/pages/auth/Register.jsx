import { useState } from "react";
import { Link } from "react-router-dom";
import { api, TENANT_ID } from "../../api/client";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [tenantId, setTenantId] = useState(TENANT_ID);
  const [storeName, setStoreName] = useState("");
  const [slug, setSlug] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [createdTenantId, setCreatedTenantId] = useState("");
  const [loading, setLoading] = useState(false);

  const updateStoreName = (value) => {
    setStoreName(value);
    const generated = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!slug || slug === storeName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")) setSlug(generated);
    if (!subdomain || subdomain === storeName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "")) setSubdomain(generated.replace(/-/g, ""));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setCreatedTenantId("");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    const payload = { name: name.trim(), email: email.trim(), password, role: role === "vendor" ? "seller" : "customer" };
    if (role === "customer") {
      if (!tenantId.trim()) return setError("Enter the store tenant ID provided by the store owner.");
      payload.tenantId = tenantId.trim();
    } else {
      if (!storeName.trim() || !slug.trim() || !subdomain.trim()) return setError("Enter the store name, slug and subdomain.");
      Object.assign(payload, { storeName: storeName.trim(), slug: slug.trim(), subdomain: subdomain.trim() });
    }
    setLoading(true);
    try {
      const result = await api.auth.register(payload);
      setSuccess(role === "vendor" ? `${result.message} You can sign in after an administrator approves your store.` : `${result.message} Sign in to continue.`);
      setCreatedTenantId(result.tenant?._id || "");
      setPassword("");
      setConfirmPassword("");
    } catch (requestError) {
      setError(requestError.message || "Could not create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500 text-2xl text-white">🛍</div><h1 className="mt-5 text-3xl font-bold">Create Account</h1><p className="mt-2 text-gray-500">Join ShopSaaS today</p></div>
        {error && <div role="alert" className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {success && <div role="status" className="mt-6 rounded-lg bg-green-50 p-3 text-sm text-green-800">{success} <Link to="/login" className="ml-1 font-semibold underline">Go to login</Link>{createdTenantId && <div className="mt-3 border-t border-green-200 pt-3"><p className="font-semibold">Store tenant ID</p><code className="mt-1 block break-all rounded bg-white p-2 text-xs">{createdTenantId}</code><p className="mt-2 text-xs">After approval, customers can use this ID to join your store.</p></div>}</div>}
        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <label className="block text-sm font-medium">Full name<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
          <label className="block text-sm font-medium">Email<input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
          <label className="block text-sm font-medium">Account type<select value={role} onChange={(event) => setRole(event.target.value)} className="mt-2 w-full rounded-lg border bg-white px-4 py-3"><option value="customer">Customer</option><option value="vendor">Store owner</option></select></label>
          {role === "customer" ? <label className="block text-sm font-medium">Store tenant ID<input required value={tenantId} onChange={(event) => setTenantId(event.target.value)} placeholder="Ask the store owner for this ID" className="mt-2 w-full rounded-lg border px-4 py-3" /><span className="mt-1 block text-xs font-normal text-slate-500">Customers must join an active store.</span></label> : <>
            <label className="block text-sm font-medium">Store name<input required value={storeName} onChange={(event) => updateStoreName(event.target.value)} placeholder="My Store" className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
            <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium">Store slug<input required value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="my-store" className="mt-2 w-full rounded-lg border px-4 py-3" /></label><label className="block text-sm font-medium">Subdomain<input required value={subdomain} onChange={(event) => setSubdomain(event.target.value)} placeholder="mystore" className="mt-2 w-full rounded-lg border px-4 py-3" /></label></div>
            <p className="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">New stores need administrator approval before the owner can sign in.</p>
          </>}
          <label className="block text-sm font-medium">Password<input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-lg border px-4 py-3" /><span className="mt-1 block text-xs font-normal text-slate-500">Use uppercase and lowercase letters, a number and one of @$!%*?&amp;.</span></label>
          <label className="block text-sm font-medium">Confirm password<input type="password" required minLength={8} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 w-full rounded-lg border px-4 py-3" /></label>
          <button type="submit" disabled={loading} className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-60">{loading ? "Creating account…" : "Create Account"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">Already have an account? <Link to="/login" className="font-semibold text-orange-500 hover:underline">Login</Link></p>
      </div>
    </main>
  );
}

export default Register;
