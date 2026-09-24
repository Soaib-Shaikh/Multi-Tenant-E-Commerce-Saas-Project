import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../redux/authSlice";

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [form, setForm] = useState({ username: "", password: "" });

	function handleChange(event) {
		const { name, value } = event.target;
		setForm((currentForm) => ({ ...currentForm, [name]: value }));
	}

	function handleSubmit(event) {
		event.preventDefault();

		dispatch(
			login({
				name: form.username,
				username: form.username,
				password: form.password,
			})
		);
		navigate("/");
	}

	return (
		<main className="min-h-[calc(100vh-73px)] bg-[#f5f1e8] px-6 py-12 text-[#17221d] sm:py-16">
			<div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-[#dce5d8] bg-[#fbfaf6] shadow-[0_24px_70px_rgba(30,91,69,0.12)] lg:grid-cols-[0.92fr_1.08fr]">
				<section className="relative hidden overflow-hidden bg-[#1e5b45] p-12 text-[#f5f1e8] lg:flex lg:min-h-[620px] lg:flex-col lg:justify-between">
					<div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[42px] border-[#d48652]/25" />
					<div className="absolute -bottom-36 -left-28 h-80 w-80 rounded-full border-[52px] border-[#dce5d8]/10" />

					<div className="relative">
						<Link to="/" className="inline-flex items-center gap-3 text-lg font-bold tracking-tight">
							<span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f5f1e8] font-serif text-xl text-[#1e5b45]">
								S
							</span>
							ShopSaaS
						</Link>
					</div>

					<div className="relative max-w-sm">
						<p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#dce5d8]">
							Welcome back
						</p>
						<h1 className="font-serif text-5xl leading-[1.05] tracking-tight">
							Your next great find is waiting.
						</h1>
						<p className="mt-6 leading-7 text-[#dce5d8]">
							Sign in to keep your wishlist, orders, and favorite stores close at hand.
						</p>
					</div>

					<p className="relative text-sm text-[#dce5d8]">Curated shopping, made simple.</p>
				</section>

				<section className="p-7 sm:p-12 lg:p-16">
					<div className="mx-auto max-w-md">
						<div className="mb-10 lg:hidden">
							<Link to="/" className="inline-flex items-center gap-3 text-lg font-bold tracking-tight">
								<span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1e5b45] font-serif text-xl text-[#f5f1e8]">
									S
								</span>
								ShopSaaS
							</Link>
						</div>

						<div>
							<p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#d48652]">
								Member access
							</p>
							<h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
								Welcome back.
							</h2>
							<p className="mt-4 text-[#68736b]">
								Enter your details to continue shopping.
							</p>
						</div>

						<form className="mt-9 space-y-5" onSubmit={handleSubmit}>
							<div>
								<label className="mb-2 block text-sm font-semibold" htmlFor="username">
									Username
								</label>
								<input
									className="w-full rounded-xl border border-[#dce5d8] bg-white px-4 py-3.5 text-[#17221d] outline-none transition placeholder:text-[#9aa49d] focus:border-[#1e5b45] focus:ring-4 focus:ring-[#1e5b45]/10"
									id="username"
									name="username"
									type="text"
									placeholder="Enter your username"
									value={form.username}
									onChange={handleChange}
									autoComplete="username"
									required
								/>
							</div>

							<div>
								<label className="mb-2 block text-sm font-semibold" htmlFor="password">
									Password
								</label>
								<div className="relative">
									<input
										className="w-full rounded-xl border border-[#dce5d8] bg-white px-4 py-3.5 pr-20 text-[#17221d] outline-none transition placeholder:text-[#9aa49d] focus:border-[#1e5b45] focus:ring-4 focus:ring-[#1e5b45]/10"
										id="password"
										name="password"
										type={showPassword ? "text" : "password"}
										placeholder="Enter your password"
										value={form.password}
										onChange={handleChange}
										autoComplete="current-password"
										required
									/>
									<button
										className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-bold uppercase tracking-wide text-[#68736b] hover:bg-[#f5f1e8] hover:text-[#1e5b45]"
										type="button"
										onClick={() => setShowPassword((visible) => !visible)}
										aria-label={showPassword ? "Hide password" : "Show password"}
									>
										{showPassword ? "Hide" : "Show"}
									</button>
								</div>
							</div>

							<button
								className="w-full rounded-xl bg-[#1e5b45] px-5 py-3.5 font-semibold text-white shadow-[0_12px_24px_rgba(30,91,69,0.2)] transition hover:-translate-y-0.5 hover:bg-[#174a38] focus:outline-none focus:ring-4 focus:ring-[#1e5b45]/20"
								type="submit"
							>
								Sign in to ShopSaaS
							</button>
						</form>
					</div>
				</section>
			</div>
		</main>
	);
}

export default Login;
