import { createSlice } from "@reduxjs/toolkit";

const vendorProductSlice = createSlice({
  name: "vendorProducts",
  initialState: { products: [] },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload || [];
    },
    upsertProduct: (state, action) => {
      const index = state.products.findIndex((product) => String(product.id) === String(action.payload.id));
      if (index === -1) state.products.unshift(action.payload);
      else state.products[index] = action.payload;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => String(product.id) !== String(action.payload));
    },
  },
});

export const { setProducts, upsertProduct, removeProduct } = vendorProductSlice.actions;
export default vendorProductSlice.reducer;
