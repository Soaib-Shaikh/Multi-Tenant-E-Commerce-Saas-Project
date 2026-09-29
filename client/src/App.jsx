import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/common/Navbar";
import Home from "./pages/customer/Home";
import Products from "./pages/customer/Products";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";
import Orders from "./pages/customer/Orders";
import OrderDetails from "./pages/customer/OrderDetails";
import Profile from "./pages/customer/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCustomers from "./pages/admin/Customers";
import AdminUsers from "./pages/admin/Users";
import AdminVendors from "./pages/admin/Vendors";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProducts from "./pages/vendor/Products";
import VendorOrders from "./pages/vendor/Orders";
import VendorInventory from "./pages/vendor/Inventory";
import VendorSettings from "./pages/vendor/Settings";
import AddProduct from "./pages/vendor/AddProduct";

function ProtectedRoute({ roles, children }) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/register" element={<Navigate to="/signup" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/vendors" element={<ProtectedRoute roles={["admin"]}><AdminVendors /></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute roles={["admin"]}><AdminCustomers /></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute roles={["admin"]}><AdminProducts /></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute roles={["admin"]}><AdminOrders /></ProtectedRoute>} />
        <Route path="/vendor" element={<Navigate to="/vendor/dashboard" replace />} />
        <Route path="/vendor/dashboard" element={<ProtectedRoute roles={["vendor"]}><VendorDashboard /></ProtectedRoute>} />
        <Route path="/vendor/products" element={<ProtectedRoute roles={["vendor"]}><VendorProducts /></ProtectedRoute>} />
        <Route path="/vendor/products/add" element={<ProtectedRoute roles={["vendor"]}><AddProduct /></ProtectedRoute>} />
        <Route path="/vendor/products/edit/:id" element={<ProtectedRoute roles={["vendor"]}><AddProduct /></ProtectedRoute>} />
        <Route path="/vendor/orders" element={<ProtectedRoute roles={["vendor"]}><VendorOrders /></ProtectedRoute>} />
        <Route path="/vendor/inventory" element={<ProtectedRoute roles={["vendor"]}><VendorInventory /></ProtectedRoute>} />
        <Route path="/vendor/settings" element={<ProtectedRoute roles={["vendor"]}><VendorSettings /></ProtectedRoute>} />
        <Route path="*" element={<main className="mx-auto max-w-4xl px-6 py-24 text-center"><h1 className="text-3xl font-bold">Page not found</h1><p className="mt-3 text-gray-600">The page you requested does not exist.</p></main>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
