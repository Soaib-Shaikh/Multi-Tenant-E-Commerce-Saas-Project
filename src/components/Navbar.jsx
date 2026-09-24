import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/authSlice";

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigation = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
  ];

  function isActive(path) {
    return path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    dispatch(logout());
    closeMenu();
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#dce5d8]/80 bg-[#fbfaf6]/95 text-[#17221d] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="group inline-flex items-center gap-3" onClick={closeMenu}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1e5b45] font-serif text-xl text-[#f5f1e8] shadow-[0_8px_18px_rgba(30,91,69,0.18)] transition group-hover:rotate-[-6deg]">
            S
          </span>
          <span className="text-lg font-bold tracking-tight sm:text-xl">Shop<span className="text-[#d48652]">SaaS</span></span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive(item.to) ? "bg-[#e8efe5] text-[#1e5b45]" : "text-[#68736b] hover:bg-[#f5f1e8] hover:text-[#1e5b45]"}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/cart"
            className={`group relative rounded-full px-4 py-2 text-sm font-semibold transition ${isActive("/cart") ? "bg-[#e8efe5] text-[#1e5b45]" : "text-[#68736b] hover:bg-[#f5f1e8] hover:text-[#1e5b45]"}`}
          >
            <span className="inline-flex items-center gap-2">
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M2.75 4.75h2l1.8 10.2a2 2 0 0 0 2 1.65h7.9a2 2 0 0 0 1.95-1.55l1.1-5.3H6.05M9.5 20a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm7 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" /></svg>
              Cart
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#d48652] px-1 text-[10px] font-bold text-white">0</span>
            </span>
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 border-r border-[#dce5d8] pr-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#dce5d8] text-sm font-bold text-[#1e5b45]">{user?.name?.charAt(0).toUpperCase()}</span>
                <span className="max-w-24 truncate text-sm font-semibold">{user?.name}</span>
              </div>
              <button type="button" onClick={handleLogout} className="rounded-full px-3 py-2 text-sm font-semibold text-[#68736b] transition hover:bg-[#f5f1e8] hover:text-[#1e5b45]">Log out</button>
            </>
          ) : (
            <Link to="/login" className="rounded-full bg-[#1e5b45] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(30,91,69,0.18)] transition hover:-translate-y-0.5 hover:bg-[#174a38]">Sign in <span aria-hidden="true">→</span></Link>
          )}
        </div>

        <button type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-xl border border-[#dce5d8] text-[#1e5b45] md:hidden">
          {menuOpen ? <span className="text-2xl leading-none">×</span> : <span className="text-xl leading-none">☰</span>}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[#dce5d8] px-5 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            {[...navigation, { label: "Cart", to: "/cart" }].map((item) => (
              <Link key={item.to} to={item.to} onClick={closeMenu} className={`rounded-xl px-4 py-3 text-sm font-semibold ${isActive(item.to) ? "bg-[#e8efe5] text-[#1e5b45]" : "text-[#68736b]"}`}>{item.label}</Link>
            ))}
            {isAuthenticated ? <button type="button" onClick={handleLogout} className="mt-2 rounded-xl bg-[#f5f1e8] px-4 py-3 text-left text-sm font-semibold text-[#1e5b45]">Log out</button> : <Link to="/login" onClick={closeMenu} className="mt-2 rounded-xl bg-[#1e5b45] px-4 py-3 text-center text-sm font-semibold text-white">Sign in</Link>}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;