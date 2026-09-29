function Toast({ message, type = "success", onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex w-[320px] items-start gap-3 rounded-xl border bg-white p-4 shadow-xl">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg ${
          type === "error" ? "bg-red-100 text-red-600" : type === "success" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
        }`}
      >
        {type === "error" ? "!" : type === "success" ? "✓" : "🛒"}
      </div>

      <div className="flex-1">
          <p className="font-semibold">{type === "error" ? "Please check" : type === "success" ? "Success!" : "Added to cart!"}</p>

        <p className="mt-1 text-sm text-gray-500">{message}</p>
      </div>

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-black"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
