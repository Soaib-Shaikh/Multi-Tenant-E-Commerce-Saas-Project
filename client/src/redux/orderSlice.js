import { createSlice } from "@reduxjs/toolkit";

const savedOrders = localStorage.getItem("shopSaasOrders");
let parsedOrders = [];
try { parsedOrders = savedOrders ? JSON.parse(savedOrders) : []; } catch { localStorage.removeItem("shopSaasOrders"); }

const initialState = {
  orders: parsedOrders,
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);

      localStorage.setItem(
        "shopSaasOrders",
        JSON.stringify(state.orders)
      );
    },

    updateOrderStatus: (state, action) => {
      const order = state.orders.find((item) => item.id === action.payload.id);
      if (order) order.status = action.payload.status;
      localStorage.setItem("shopSaasOrders", JSON.stringify(state.orders));
    },

    clearOrders: (state) => {
      state.orders = [];

      localStorage.removeItem("shopSaasOrders");
    },
  },
});

export const {
  addOrder,
  updateOrderStatus,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
