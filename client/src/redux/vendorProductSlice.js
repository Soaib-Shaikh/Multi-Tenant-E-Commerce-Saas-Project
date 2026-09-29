import { createSlice } from "@reduxjs/toolkit";

const defaultProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    stock: 25,
    status: "Active",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 3999,
    stock: 12,
    status: "Active",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Sports",
    price: 1999,
    stock: 8,
    status: "Active",
  },
  {
    id: 4,
    name: "Travel Backpack",
    category: "Fashion",
    price: 1299,
    stock: 0,
    status: "Out of Stock",
  },
];

const savedProducts = localStorage.getItem("vendorProducts");
let parsedProducts = null;
try { parsedProducts = savedProducts ? JSON.parse(savedProducts) : null; } catch { localStorage.removeItem("vendorProducts"); }

const initialState = {
  products: parsedProducts || defaultProducts,
};

const vendorProductSlice = createSlice({
  name: "vendorProducts",
  initialState,

  reducers: {
    addProduct: (state, action) => {
      state.products.push({
        ...action.payload,
        id: Date.now(),
        status: Number(action.payload.stock) > 0
          ? "Active"
          : "Out of Stock",
      });

      localStorage.setItem(
        "vendorProducts",
        JSON.stringify(state.products)
      );
    },

    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload,
          status:
            Number(action.payload.stock) > 0
              ? "Active"
              : "Out of Stock",
        };
      }

      localStorage.setItem(
        "vendorProducts",
        JSON.stringify(state.products)
      );
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );

      localStorage.setItem(
        "vendorProducts",
        JSON.stringify(state.products)
      );
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
} = vendorProductSlice.actions;

export default vendorProductSlice.reducer;
