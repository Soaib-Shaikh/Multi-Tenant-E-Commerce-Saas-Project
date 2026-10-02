import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const linkClass = ({ isActive }) => `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-orange-50 text-orange-600" : "text-slate-600 hover:text-orange-600"}`;
  const close = () => setOpen(false);
  const handleLogout = () => { dispatch(logout()); close(); navigate("/"); };
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900" onClick={close}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500 text-white">S</span>
          <span className="text-lg">ShopSaaS</span>
        </Link>
        <button type="button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-lg border px-3 py-2 text-slate-700 md:hidden">{open ? "Close" : "Menu"}</button>
        <div className={`${open ? "absolute left-0 right-0 top-full flex border-b bg-white p-4 shadow-lg" : "hidden"} flex-col gap-1 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
          <NavLink to="/" className={linkClass} onClick={close}>Home</NavLink>
          <NavLink to="/products" className={linkClass} onClick={close}>Products</NavLink>
          {user?.role === "customer" && <NavLink to="/orders" className={linkClass} onClick={close}>Orders</NavLink>}
          {user?.role === "vendor" && <NavLink to="/vendor/dashboard" className={linkClass} onClick={close}>Seller dashboard</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin/dashboard" className={linkClass} onClick={close}>Admin panel</NavLink>}
          {user?.role === "customer" && <NavLink to="/cart" className={linkClass} onClick={close}>Cart <span className="ml-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-700">{count}</span></NavLink>}
          {user ? <><NavLink to="/profile" className={linkClass} onClick={close}>Profile</NavLink><button type="button" onClick={handleLogout} className="rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 hover:text-orange-600">Log out</button></> : <><NavLink to="/login" className={linkClass} onClick={close}>Login</NavLink><NavLink to="/signup?role=customer" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600" onClick={close}>Sign up</NavLink></>}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
