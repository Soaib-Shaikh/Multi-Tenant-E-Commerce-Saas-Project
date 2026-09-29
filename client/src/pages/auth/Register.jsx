import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../redux/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6 || !email.includes("@")) {
      setError("Use a valid email and a password with at least 6 characters.");
      return;
    }

    dispatch(
      login({
        name,
        email,
        role,
      })
    );

    navigate("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-orange-500 text-2xl text-white">
            🛍
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Join ShopSaaS today
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <div className="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">Demo registration stores a local profile only. It does not create a server account.</div>
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              minLength={6}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              minLength={6}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-orange-500"
            />
          </div>
          <div><label className="mb-2 block text-sm font-medium">Account type</label><select value={role} onChange={(event) => setRole(event.target.value)} className="w-full rounded-lg border bg-white px-4 py-3"><option value="customer">Customer</option><option value="vendor">Vendor</option><option value="admin">Admin demo</option></select></div>

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-orange-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
