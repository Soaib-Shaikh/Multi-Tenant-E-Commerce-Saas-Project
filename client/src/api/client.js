const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api").replace(/\/$/, "");
export const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "";
export const TOKEN_KEY = "shopSaasToken";

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  } catch {
    throw new ApiError(`Could not reach the API at ${API_BASE_URL}. Check that the backend is running and VITE_API_BASE_URL is correct.`, 0);
  }

  const text = await response.text();
  let body;
  try { body = text ? JSON.parse(text) : {}; } catch { body = { message: text }; }
  if (!response.ok || body.success === false) {
    throw new ApiError(body.message || `Request failed (${response.status}).`, response.status);
  }
  return body;
}

export const normalizeUser = (user) => ({
  ...user,
  id: user?._id || user?.id,
  tenant: typeof user?.tenantId === "object" ? user.tenantId : null,
  tenantId: typeof user?.tenantId === "object" ? user.tenantId?._id : user?.tenantId,
  role: user?.role === "seller" ? "vendor" : user?.role === "super_admin" ? "admin" : user?.role,
});

export const normalizeProduct = (product) => {
  const category = product?.categoryId;
  const images = Array.isArray(product?.images) ? product.images : [];
  return {
    ...product,
    id: product?._id || product?.id,
    tenantId: typeof product?.tenantId === "object" ? product?.tenantId?._id : product?.tenantId,
    categoryId: typeof category === "object" ? category?._id : category,
    category: typeof category === "object" ? category?.name || "Uncategorized" : product?.category || "Uncategorized",
    image: images[0] || product?.image || "",
    images,
    rating: Number(product?.rating || product?.averageRating || 0),
    status: product?.stock > 0 ? "Active" : "Out of Stock",
  };
};

export const normalizeOrder = (order) => ({
  ...order,
  id: order?._id || order?.id,
  total: Number(order?.totalAmount ?? order?.total ?? 0),
  date: order?.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : order?.date || "—",
  paymentMethod: order?.paymentMethod || (order?.status === "pending" ? "Razorpay pending" : "Razorpay"),
  status: ({ pending: "Pending payment", confirmed: "Confirmed", processing: "Processing", shipped: "Shipped", delivered: "Delivered", cancelled: "Cancelled", returned: "Returned" })[order?.status] || order?.status || "Pending",
  items: (order?.items || []).map((item, index) => ({
    ...item,
    id: item?._id || item?.productId?._id || item?.productId || index,
    image: item?.image || item?.productId?.images?.[0] || "",
    name: item?.name || item?.productId?.name || "Product",
  })),
  customer: order?.shippingAddress || order?.customer || null,
});

export const normalizeCart = (cart) => ({
  items: (cart?.items || []).filter((entry) => entry.productId && typeof entry.productId === "object").map((entry) => {
    const product = normalizeProduct(entry.productId);
    return { ...product, tenantId: entry.tenantId || product.tenantId, storeName: entry.storeName || product.storeName, quantity: Number(entry.quantity || 1) };
  }),
  totalAmount: Number(cart?.totalAmount || 0),
});

const json = (data) => JSON.stringify(data);

export const api = {
  auth: {
    login: (data) => request("/auth/login", { method: "POST", body: json(data) }),
    register: (data) => request("/auth/register", { method: "POST", body: json(data) }),
    forgotPassword: (data) => request("/auth/forgot-password", { method: "POST", body: json(data) }),
    resetPassword: (token, data) => request(`/auth/reset-password/${encodeURIComponent(token)}`, { method: "POST", body: json(data) }),
    me: () => request("/auth/me"),
    users: () => request("/auth/"),
  },
  tenants: {
    list: () => request("/tenants"),
    approve: (id) => request(`/tenants/${encodeURIComponent(id)}/approve`, { method: "PATCH" }),
    reject: (id) => request(`/tenants/${encodeURIComponent(id)}/reject`, { method: "PATCH" }),
  },
  categories: {
    list: async () => (await request("/categories")).categories || [],
    create: (data) => request("/categories", { method: "POST", body: json(data) }),
    update: (id, data) => request(`/categories/${encodeURIComponent(id)}`, { method: "PUT", body: json(data) }),
    remove: (id) => request(`/categories/${encodeURIComponent(id)}`, { method: "DELETE" }),
  },
  products: {
    list: async () => ((await request("/products")).products || []).map(normalizeProduct),
    get: async (id) => normalizeProduct((await request(`/products/${encodeURIComponent(id)}`)).product),
    publicList: async () => {
      return ((await request("/public/catalog/products")).products || []).map(normalizeProduct);
    },
    publicGet: async (id) => {
      return normalizeProduct((await request(`/public/catalog/products/${encodeURIComponent(id)}`)).product);
    },
    create: async (data) => {
      const form = new FormData();
      ["categoryId", "name", "description", "price", "stock"].forEach((key) => form.append(key, data[key] ?? ""));
      (data.files || []).forEach((file) => form.append("images", file));
      return normalizeProduct((await request("/products", { method: "POST", body: form })).product);
    },
    update: async (id, data) => {
      const form = new FormData();
      ["categoryId", "name", "description", "price", "stock"].forEach((key) => form.append(key, data[key] ?? ""));
      (data.files || []).forEach((file) => form.append("images", file));
      return normalizeProduct((await request(`/products/${encodeURIComponent(id)}`, { method: "PUT", body: form })).product);
    },
    remove: (id) => request(`/products/${encodeURIComponent(id)}`, { method: "DELETE" }),
  },
  cart: {
    get: async () => normalizeCart((await request("/carts")).cart),
    add: async (productId, quantity = 1) => { await request("/carts", { method: "POST", body: json({ productId, quantity }) }); return api.cart.get(); },
    setQuantity: async (productId, quantity) => { await request(`/carts/${encodeURIComponent(productId)}`, { method: "PUT", body: json({ quantity }) }); return api.cart.get(); },
    remove: async (productId) => { await request(`/carts/${encodeURIComponent(productId)}`, { method: "DELETE" }); return api.cart.get(); },
    clear: async (tenantId) => { await request("/carts", { method: "DELETE", body: json(tenantId ? { tenantId } : {}) }); return api.cart.get(); },
  },
  orders: {
    list: async () => ((await request("/orders")).orders || []).map(normalizeOrder),
    get: async (id) => normalizeOrder((await request(`/orders/${encodeURIComponent(id)}`)).order),
    create: async (shippingAddress, tenantId) => normalizeOrder((await request("/orders", { method: "POST", body: json({ shippingAddress, tenantId }) })).order),
    requestCancellation: async (id, reason) => normalizeOrder((await request(`/orders/${encodeURIComponent(id)}/cancel-request`, { method: "PATCH", body: json({ reason }) })).order),
    requestReturn: async (id, reason) => normalizeOrder((await request(`/orders/${encodeURIComponent(id)}/return-request`, { method: "PATCH", body: json({ reason }) })).order),
    updateStatus: async (id, status) => normalizeOrder((await request(`/orders/${encodeURIComponent(id)}/status`, { method: "PATCH", body: json({ status }) })).order),
  },
  notifications: {
    list: async () => {
      return request("/notifications");
    },

    markRead: async (id) => {
      return request(`/notifications/${encodeURIComponent(id)}/read`, {
        method: "PATCH",
      });
    },

    markAllRead: async () => {
      return request("/notifications/read-all", {
        method: "PATCH",
      });
    },
  },
  payments: {
    create: (orderId) => request("/payments/create", { method: "POST", body: json({ orderId }) }),
    verify: (data) => request("/payments/verify", { method: "POST", body: json(data) }),
    refund: (orderId) => request(`/payments/refund/${encodeURIComponent(orderId)}`, { method: "POST" }),
  },
  coupons: {
    list: async () => (await request("/coupons")).coupons || [],
    create: (data) => request("/coupons", { method: "POST", body: json(data) }),
    update: (id, data) => request(`/coupons/${encodeURIComponent(id)}`, { method: "PUT", body: json(data) }),
    remove: (id) => request(`/coupons/${encodeURIComponent(id)}`, { method: "DELETE" }),
    validate: (code, orderAmount) => request("/coupons/validate", { method: "POST", body: json({ code, orderAmount }) }),
  },
  reviews: {
    list: async (productId) => (await request(`/reviews/product/${encodeURIComponent(productId)}`)).reviews || [],
    create: (data) => request("/reviews", { method: "POST", body: json(data) }),
    update: (id, data) => request(`/reviews/${encodeURIComponent(id)}`, { method: "PUT", body: json(data) }),
    remove: (id) => request(`/reviews/${encodeURIComponent(id)}`, { method: "DELETE" }),
  },
  dashboards: {
    seller: () => request("/seller/dashboard"),
    admin: () => request("/admin/dashboard"),
  },
};

export async function loadRazorpay() {
  if (window.Razorpay) return true;
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
