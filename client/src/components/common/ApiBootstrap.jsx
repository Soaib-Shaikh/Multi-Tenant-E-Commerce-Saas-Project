import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../api/client";
import { logout, login } from "../../redux/authSlice";
import { setCart } from "../../redux/cartSlice";
import { setOrders } from "../../redux/orderSlice";
import { setProducts } from "../../redux/vendorProductSlice";

export default function ApiBootstrap() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const userId = user?.id;
  const userRole = user?.role;

  useEffect(() => {
    if (!token || !userId) {
      dispatch(setCart({ items: [] }));
      dispatch(setOrders([]));
      dispatch(setProducts([]));
      return undefined;
    }

    let active = true;
    const refresh = async () => {
      try {
        const me = await api.auth.me();
        if (!active) return;
        dispatch(login({ user: me.user, token }));
        if (userRole === "admin") { dispatch(setProducts([])); return; }
        const products = userRole === "customer" ? await api.products.publicList() : await api.products.list();
        if (!active) return;
        dispatch(setProducts(products));

        if (userRole === "customer") {
          const [cart, orders] = await Promise.all([api.cart.get(), api.orders.list()]);
          if (!active) return;
          dispatch(setCart(cart));
          dispatch(setOrders(orders));
        }
      } catch (error) {
        if (!active) return;
        if (error.status === 401) dispatch(logout());
        else console.warn("API data could not be refreshed:", error.message);
      }
    };

    refresh();
    return () => { active = false; };
  }, [dispatch, token, userId, userRole]);

  return null;
}
