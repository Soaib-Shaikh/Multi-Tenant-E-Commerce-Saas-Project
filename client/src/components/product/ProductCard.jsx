import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../../api/client";
import { setCart } from "../../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="flex h-56 items-center justify-center bg-gray-100">
          {product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <span className="text-gray-400">Product Image</span>}
        </div>
      </Link>

      <div className="p-5">
        <p className="text-sm text-gray-500">{product.category}</p>

        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 text-lg font-semibold hover:underline">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold">₹{product.price}</p>

          <button onClick={async () => { try { dispatch(setCart(await api.cart.add(product.id))); } catch (error) { window.alert(error.message); } }} className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
