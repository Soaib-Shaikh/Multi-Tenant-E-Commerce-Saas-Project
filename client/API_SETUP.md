# Frontend API setup

The frontend reads its API settings from Vite environment variables. Copy `.env.example` to `.env.local` and set:

- `VITE_API_BASE_URL`: the backend API base URL, including `/api` (for example `http://localhost:5000/api`). The server code defaults to port `3000`, so use the port your backend is actually listening on.
- `VITE_TENANT_ID`: an active store tenant ID for customer registration. Customer and seller product routes are tenant-scoped; the backend does not expose a public tenant directory.
- `VITE_RAZORPAY_KEY_ID`: optional public key ID if the payment API response does not include one. Never add `RAZORPAY_KEY_SECRET`, `JWT_SECRET`, `MONGODB_URL`, or Cloudinary secrets to this frontend file.

Restart Vite after changing environment variables. Sign in with an existing backend account or register a customer with an active tenant ID. New seller accounts remain pending until an administrator approves their tenant.

## API-backed frontend flows

The frontend now uses the backend for authentication, products and categories, seller product and category CRUD plus inventory, customer carts and orders, Razorpay payments, product reviews, seller/admin dashboards, user listing, tenant listing, and tenant approval/deactivation.

The backend currently does not expose seller order status updates, admin-wide order or product management, or profile/store settings updates. Those screens state this limitation instead of showing demo records as live data.
