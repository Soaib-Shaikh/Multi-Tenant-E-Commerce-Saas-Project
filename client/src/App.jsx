import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ApiBootstrap from "./components/common/ApiBootstrap";
import Navbar from "./components/common/Navbar";
import WorkspaceLayout from "./components/common/WorkspaceLayout";
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
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCustomers from "./pages/admin/Customers";
import AdminUsers from "./pages/admin/Users";
import AdminVendors from "./pages/admin/Vendors";
import AdminOrders from "./pages/admin/Orders";
import AdminProducts from "./pages/admin/Products";
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProducts from "./pages/vendor/Products";
import VendorCategories from "./pages/vendor/Categories";
import VendorCoupons from "./pages/vendor/Coupons";
import VendorOrders from "./pages/vendor/Orders";
import VendorInventory from "./pages/vendor/Inventory";
import VendorSettings from "./pages/vendor/Settings";
import AddProduct from "./pages/vendor/AddProduct";

function ProtectedRoute({ roles, children }) {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ApiBootstrap />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ProtectedRoute roles={["customer"]}><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute roles={["customer"]}><Checkout /></ProtectedRoute>} />
        <Route path="/order-success" element={<ProtectedRoute roles={["customer"]}><OrderSuccess /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute roles={["customer"]}><Orders /></ProtectedRoute>} />
        <Route path="/orders/:id" element={<ProtectedRoute roles={["customer"]}><OrderDetails /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Navigate to="/signup" replace />} />
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute roles={["admin"]}><WorkspaceLayout role="admin"><AdminDashboard /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute roles={["admin"]}><WorkspaceLayout role="admin"><AdminUsers /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/admin/vendors" element={<ProtectedRoute roles={["admin"]}><WorkspaceLayout role="admin"><AdminVendors /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/admin/customers" element={<ProtectedRoute roles={["admin"]}><WorkspaceLayout role="admin"><AdminCustomers /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute roles={["admin"]}><WorkspaceLayout role="admin"><AdminProducts /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute roles={["admin"]}><WorkspaceLayout role="admin"><AdminOrders /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/vendor" element={<Navigate to="/vendor/dashboard" replace />} />
        <Route path="/vendor/dashboard" element={<ProtectedRoute roles={["vendor"]}><WorkspaceLayout role="vendor"><VendorDashboard /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/vendor/products" element={<ProtectedRoute roles={["vendor"]}><WorkspaceLayout role="vendor"><VendorProducts /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/vendor/categories" element={<ProtectedRoute roles={["vendor"]}><WorkspaceLayout role="vendor"><VendorCategories /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/vendor/coupons" element={<ProtectedRoute roles={["vendor"]}><WorkspaceLayout role="vendor"><VendorCoupons /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/vendor/products/add" element={<ProtectedRoute roles={["vendor"]}><WorkspaceLayout role="vendor"><AddProduct /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/vendor/products/edit/:id" element={<ProtectedRoute roles={["vendor"]}><WorkspaceLayout role="vendor"><AddProduct /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/vendor/orders" element={<ProtectedRoute roles={["vendor"]}><WorkspaceLayout role="vendor"><VendorOrders /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/vendor/inventory" element={<ProtectedRoute roles={["vendor"]}><WorkspaceLayout role="vendor"><VendorInventory /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="/vendor/settings" element={<ProtectedRoute roles={["vendor"]}><WorkspaceLayout role="vendor"><VendorSettings /></WorkspaceLayout></ProtectedRoute>} />
        <Route path="*" element={<main className="mx-auto max-w-4xl px-6 py-24 text-center"><h1 className="text-3xl font-bold">Page not found</h1><p className="mt-3 text-gray-600">The page you requested does not exist.</p></main>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
