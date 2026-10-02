import { products as sampleProducts } from "./products";

// Local-only catalog used to demonstrate the storefront while the API/store is being configured.
export const demoProducts = sampleProducts.map((product) => ({
  ...product,
  id: `demo-${product.id}`,
  stock: 12,
  images: [product.image],
  isDemo: true,
}));
