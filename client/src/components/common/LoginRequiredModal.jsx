import { Link } from "react-router-dom";

export default function LoginRequiredModal({ productName, returnTo, isDemo, onClose }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="login-required-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-sm font-semibold text-orange-600">Ready to shop?</p><h2 id="login-required-title" className="mt-1 text-2xl font-bold">Sign in to continue</h2></div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg px-3 py-1 text-2xl leading-none text-slate-500 hover:bg-slate-100">×</button>
        </div>
        <p className="mt-4 text-slate-600">Log in or create a customer account to buy {productName ? <strong>{productName}</strong> : "this product"}.</p>
        {isDemo && <p className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">You’re viewing a sample product for the team preview. Live orders become available when the store catalog is connected.</p>}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link to="/login?role=customer" state={{ from: isDemo ? "/" : returnTo }} className="rounded-lg bg-orange-500 px-4 py-3 text-center font-semibold text-white hover:bg-orange-600">Log in</Link>
          <Link to="/signup?role=customer" state={{ from: isDemo ? "/" : returnTo }} className="rounded-lg border border-orange-300 px-4 py-3 text-center font-semibold text-orange-700 hover:bg-orange-50">Create account</Link>
        </div>
      </section>
    </div>
  );
}
