# Frontend API setup

The frontend reads its API settings from Vite environment variables. Copy `.env.example` to `.env.local` and set:

- `VITE_API_BASE_URL`: the backend API base URL, including `/api` (for example `http://localhost:3000/api`). The server code defaults to port `3000`, so use the port your backend is actually listening on.
- `VITE_TENANT_ID`: an active store tenant ID for guest product browsing and customer registration. Ask the store owner/backend team for the approved store's tenant ID.
- `VITE_RAZORPAY_KEY_ID`: optional public key ID if the payment API response does not include one. Never add `RAZORPAY_KEY_SECRET`, `JWT_SECRET`, `MONGODB_URL`, or Cloudinary secrets to this frontend file.

Restart Vite after changing environment variables. Sign in with an existing backend account or register a customer with an active tenant ID. New seller accounts remain pending until an administrator approves their tenant.

## API-backed frontend flows

Guests can browse active products at `/products` and `/products/:id` without an account. The frontend fetches this public, read-only catalog from `GET /api/public/catalog/products?tenantId=...` and `GET /api/public/catalog/products/:id?tenantId=...`; the backend checks that the requested tenant is active and returns only active products from that tenant. Set `VITE_TENANT_ID` to that store's active tenant ID. Cart, checkout, order history, and review submissions still require sign-in.

When a guest cannot reach the public catalog, the storefront falls back to the local sample products for demonstration and marks them as a preview. Sample items are not connected to checkout. Selecting a purchase action opens a login/create-account prompt while keeping the product page visible.

The frontend now uses the backend for authentication and password resets, products and categories, seller product/category/coupon CRUD plus inventory, customer carts and orders, Razorpay payments/refunds, order cancellation and return requests, seller order status updates, product reviews, seller/admin dashboards, user listing, tenant listing, and tenant approval/deactivation.

The backend still does not expose admin-wide order or product management, profile/store settings updates, or coupon application as part of order creation. Coupon validation returns a discounted preview, but `POST /api/orders` currently calculates the full cart total and does not accept a coupon code; coupon validation also does not increment `usedCount`. The checkout does not offer coupon entry until the backend applies discounts to the stored order amount and records usage.

## Password reset email configuration

The backend exposes `POST /api/auth/forgot-password` with `{ "email": "..." }` and `POST /api/auth/reset-password/:token` with `{ "password": "..." }`. It emails a time-limited link to `/reset-password/:token`. Configure `RESEND_EMAIL_API_KEY` and `CLIENT_URL` in the backend environment so email links can be delivered and point to this frontend. Set `CLIENT_URL` to the frontend's exact origin, including its port (for example `http://localhost:5174` for the current preview). Reset links expire after 15 minutes.
