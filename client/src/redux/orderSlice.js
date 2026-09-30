import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [] },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload || [];
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { setOrders, addOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
