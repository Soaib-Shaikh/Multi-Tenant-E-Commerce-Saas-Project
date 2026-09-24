import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/customer/Home";
import Products from "./pages/customer/Products";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Customers from "./pages/admin/Customers";
import AdminDashboard from "./pages/admin/Dashboard";
import Vendors from "./pages/admin/Vendors";
import Orders from "./pages/admin/Orders";
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProducts from "./pages/vendor/Products";
import VendorOrders from "./pages/vendor/Orders";
import VendorInventory from "./pages/vendor/Inventory";
import VendorSettings from "./pages/vendor/Settings";
import VendorAddProduct from "./pages/vendor/AddProduct";






function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />}/>
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/vendors" element={<Vendors />}/>
        <Route path="/admin/orders" element={<Orders />}/>
        <Route path="/vendor" element={<VendorDashboard />}/>

<Route
  path="/vendor/products"
  element={<VendorProducts />}
/>

<Route
  path="/vendor/orders"
  element={<VendorOrders />}
/>

<Route
  path="/vendor/inventory"
  element={<VendorInventory />}
/>

<Route
  path="/vendor/settings"
  element={<VendorSettings />}
/> 
      <Route
  path="/vendor/products/add"
  element={<VendorAddProduct />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;