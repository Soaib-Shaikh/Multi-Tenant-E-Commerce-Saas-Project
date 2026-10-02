import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../api/client";

const emptyForm = () => ({ code: "", discountType: "percentage", discountValue: "", minOrderAmount: "0", maxDiscount: "", usageLimit: "", expiresAt: "" });

function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const loadCoupons = useCallback(async () => {
    setCoupons(await api.coupons.list());
  }, []);

  useEffect(() => {
    let active = true;
    api.coupons.list().then((data) => { if (active) setCoupons(data); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const resetForm = () => { setForm(emptyForm()); setEditingId(""); };
  const change = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const payload = () => ({
    code: form.code.trim().toUpperCase(),
    discountType: form.discountType,
    discountValue: Number(form.discountValue),
    minOrderAmount: Number(form.minOrderAmount || 0),
    maxDiscount: form.maxDiscount === "" ? null : Number(form.maxDiscount),
    usageLimit: form.usageLimit === "" ? null : Number(form.usageLimit),
    expiresAt: new Date(form.expiresAt).toISOString(),
  });

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      if (new Date(form.expiresAt).getTime() <= Date.now()) throw new Error("Expiry time must be in the future.");
      const values = payload();
      const result = editingId ? await api.coupons.update(editingId, values) : await api.coupons.create(values);
      setNotice(result.message || (editingId ? "Coupon updated." : "Coupon created."));
      resetForm();
      await loadCoupons();
    } catch (requestError) {
      setError(requestError.message || "Could not save the coupon.");
    } finally {
      setBusy(false);
    }
  };

  const edit = (coupon) => {
    const localExpiry = new Date(new Date(coupon.expiresAt).getTime() - new Date(coupon.expiresAt).getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setForm({ code: coupon.code, discountType: coupon.discountType, discountValue: String(coupon.discountValue), minOrderAmount: String(coupon.minOrderAmount || 0), maxDiscount: coupon.maxDiscount == null ? "" : String(coupon.maxDiscount), usageLimit: coupon.usageLimit == null ? "" : String(coupon.usageLimit), expiresAt: localExpiry });
    setEditingId(coupon._id);
    setError("");
    setNotice("");
  };

  const toggleActive = async (coupon) => {
    setBusy(true); setError(""); setNotice("");
    try { const result = await api.coupons.update(coupon._id, { isActive: !coupon.isActive }); setNotice(result.message || "Coupon status updated."); await loadCoupons(); }
    catch (requestError) { setError(requestError.message || "Could not update the coupon."); }
    finally { setBusy(false); }
  };

  const remove = async (coupon) => {
    if (!window.confirm(`Delete coupon ${coupon.code}?`)) return;
    setBusy(true); setError(""); setNotice("");
    try { const result = await api.coupons.remove(coupon._id); setNotice(result.message || "Coupon deleted."); if (editingId === coupon._id) resetForm(); await loadCoupons(); }
    catch (requestError) { setError(requestError.message || "Could not delete the coupon."); }
    finally { setBusy(false); }
  };

  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-7xl"><Link to="/vendor/dashboard" className="text-sm font-semibold text-orange-600">← Vendor dashboard</Link><header className="mt-4"><p className="font-semibold text-orange-600">Vendor workspace</p><h1 className="mt-1 text-4xl font-bold">Coupons</h1><p className="mt-2 text-slate-600">Create and manage discount codes for your store.</p></header>{error && <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}{notice && <p role="status" className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-800">{notice}</p>}
    <form onSubmit={submit} className="mt-8 rounded-2xl border bg-white p-5 shadow-sm"><h2 className="text-xl font-bold">{editingId ? "Edit coupon" : "Create coupon"}</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="text-sm font-medium">Coupon code<input required maxLength={32} name="code" value={form.code} onChange={change} disabled={Boolean(editingId)} placeholder="SAVE10" className="mt-2 w-full rounded-lg border px-3 py-2.5 uppercase disabled:bg-slate-100" /></label>
      <label className="text-sm font-medium">Discount type<select name="discountType" value={form.discountType} onChange={change} className="mt-2 w-full rounded-lg border bg-white px-3 py-2.5"><option value="percentage">Percentage</option><option value="fixed">Fixed amount</option></select></label>
      <label className="text-sm font-medium">Discount value<input required type="number" min="0.01" max={form.discountType === "percentage" ? "100" : undefined} step="0.01" name="discountValue" value={form.discountValue} onChange={change} className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label>
      <label className="text-sm font-medium">Minimum order (₹)<input type="number" min="0" step="0.01" name="minOrderAmount" value={form.minOrderAmount} onChange={change} className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label>
      <label className="text-sm font-medium">Maximum discount (₹)<input type="number" min="0" step="0.01" name="maxDiscount" value={form.maxDiscount} onChange={change} placeholder="No limit" className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label>
      <label className="text-sm font-medium">Usage limit<input type="number" min="1" step="1" name="usageLimit" value={form.usageLimit} onChange={change} placeholder="Unlimited" className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label>
      <label className="text-sm font-medium sm:col-span-2">Expires at<input required type="datetime-local" name="expiresAt" value={form.expiresAt} onChange={change} className="mt-2 w-full rounded-lg border px-3 py-2.5" /></label>
    </div><div className="mt-5 flex gap-3"><button type="submit" disabled={busy} className="rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white disabled:opacity-60">{busy ? "Saving…" : editingId ? "Save changes" : "Create coupon"}</button>{editingId && <button type="button" onClick={resetForm} className="rounded-lg border px-5 py-2.5 font-semibold">Cancel edit</button>}</div></form>
    <section className="mt-8 overflow-hidden rounded-2xl border bg-white shadow-sm"><div className="border-b p-5"><h2 className="text-lg font-bold">Your coupons</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{["Code", "Discount", "Expiry", "Usage", "Status", "Actions"].map((label) => <th key={label} className="px-5 py-3 font-medium">{label}</th>)}</tr></thead><tbody className="divide-y">{loading && <tr><td colSpan="6" className="px-5 py-12 text-center text-slate-500">Loading coupons…</td></tr>}{!loading && coupons.map((coupon) => <tr key={coupon._id}><td className="px-5 py-4 font-bold">{coupon.code}<p className="mt-1 text-xs font-normal text-slate-500">Minimum ₹{Number(coupon.minOrderAmount || 0).toLocaleString("en-IN")}</p></td><td className="px-5 py-4">{coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}{coupon.maxDiscount != null && coupon.discountType === "percentage" && <p className="text-xs text-slate-500">Max ₹{coupon.maxDiscount}</p>}</td><td className="px-5 py-4">{new Date(coupon.expiresAt).toLocaleString("en-IN")}</td><td className="px-5 py-4">{coupon.usedCount || 0} / {coupon.usageLimit || "∞"}</td><td className="px-5 py-4">{coupon.isActive ? "Active" : "Inactive"}</td><td className="px-5 py-4"><div className="flex gap-3"><button type="button" disabled={busy} onClick={() => edit(coupon)} className="font-semibold text-orange-600 underline">Edit</button><button type="button" disabled={busy} onClick={() => toggleActive(coupon)} className="font-semibold text-slate-600 underline">{coupon.isActive ? "Deactivate" : "Activate"}</button><button type="button" disabled={busy} onClick={() => remove(coupon)} className="font-semibold text-red-600 underline">Delete</button></div></td></tr>)}{!loading && !coupons.length && <tr><td colSpan="6" className="px-5 py-12 text-center text-slate-500">No coupons created yet.</td></tr>}</tbody></table></div></section>
    </div></main>;
}

export default Coupons;
