import { NavLink } from "react-router-dom";

const workspaceLinks = {
  admin: [
    ["Overview", "/admin/dashboard", "▦"],
    ["Stores / sellers", "/admin/vendors", "◇"],
    ["Users", "/admin/users", "♙"],
    ["Customers", "/admin/customers", "♧"],
    ["Products", "/admin/products", "□"],
    ["Orders", "/admin/orders", "▤"],
    ["Analytics", "/admin/analytics", "▥"],
  ],
  vendor: [
    ["Overview", "/vendor/dashboard", "▦"],
    ["Products", "/vendor/products", "□"],
    ["Add product", "/vendor/products/add", "+"],
    ["Categories", "/vendor/categories", "◇"],
    ["Inventory", "/vendor/inventory", "▤"],
    ["Orders", "/vendor/orders", "▣"],
    ["Coupons", "/vendor/coupons", "%"],
    ["Store settings", "/vendor/settings", "⚙"],
  ],
};

export default function WorkspaceLayout({ role, children }) {
  const isAdmin = role === "admin";
  const title = isAdmin ? "Admin panel" : "Seller workspace";
  const links = workspaceLinks[role] || [];

  return (
    <div className="min-h-screen bg-slate-50 md:flex">
      <aside className="border-b bg-white md:min-h-[calc(100vh-57px)] md:w-64 md:shrink-0 md:border-b-0 md:border-r">
        <div className="px-5 pb-3 pt-5 md:pb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-orange-600">ShopSaaS</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">{title}</h2>
        </div>
        <nav aria-label={title} className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible">
          {links.map(([label, to, icon]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin/dashboard" || to === "/vendor/dashboard"}
              className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-orange-50 text-orange-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}
            >
              <span aria-hidden="true" className="w-5 text-center text-base">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
