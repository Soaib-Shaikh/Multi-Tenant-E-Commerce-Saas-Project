import { useEffect, useMemo, useState } from "react";
import { api, normalizeUser } from "../../api/client";

export function UserList({ roleFilter = "all", title = "Users" }) {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    api.auth.users().then((result) => { if (active) setUsers((result.users || []).map(normalizeUser)); }).catch((requestError) => { if (active) setError(requestError.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const rows = useMemo(() => users.filter((user) => roleFilter === "all" || user.role === roleFilter).filter((user) => `${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query.toLowerCase())), [users, roleFilter, query]);
  return <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6"><div className="mx-auto max-w-7xl"><p className="font-semibold text-orange-600">Platform administration</p><h1 className="mt-2 text-4xl font-bold">{title}</h1><p className="mt-2 text-slate-600">Account records loaded from the authenticated admin API.</p>{error && <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}<section className="mt-8 overflow-hidden rounded-2xl border bg-white"><div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between"><h2 className="font-semibold">{loading ? "Loading users…" : `${rows.length} ${title.toLowerCase()}`}</h2><input aria-label={`Search ${title}`} placeholder={`Search ${title.toLowerCase()}`} value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-lg border px-4 py-2.5" /></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr>{["Name", "Email", "Role", "Store", "Status"].map((label) => <th key={label} className="px-5 py-3 font-medium">{label}</th>)}</tr></thead><tbody className="divide-y">{rows.map((user) => <tr key={user.id}><td className="px-5 py-4 font-medium">{user.name}</td><td className="px-5 py-4">{user.email}</td><td className="px-5 py-4 capitalize">{user.role}</td><td className="px-5 py-4">{user.tenant?.name || "—"}</td><td className="px-5 py-4">{user.isActive === false ? "Inactive" : "Active"}</td></tr>)}{!loading && !rows.length && <tr><td colSpan="5" className="px-5 py-12 text-center text-slate-500">No users match this search.</td></tr>}</tbody></table></div></section></div></main>;
}
export default function Users() { return <UserList />; }
