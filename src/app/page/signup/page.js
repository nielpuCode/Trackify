// src/app/page/signup/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
	const router = useRouter();
	const [form, setForm] = useState({ name: "", email: "", password: "" });
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setSuccess("");
		setIsLoading(true);

		try {
			const res = await fetch("/api/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.error || "Something went wrong");
				setIsLoading(false);
				return;
			}

			setSuccess("Account created successfully! Redirecting...");
			setTimeout(() => router.push("/page/login"), 1500);
		} catch (err) {
			setError("Server error");
			setIsLoading(false);
		}
	}

	return (
		<div className="flex items-center justify-center min-h-fit bg-surface px-4 py-8">
			<div className="w-full max-w-md">
				{/* Logo/Brand Section */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-light mb-4 shadow-lg">
						<svg
							className="w-8 h-8 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
							/>
						</svg>
					</div>
					<h1 className="text-3xl font-bold text-text mb-2">Create account</h1>
					<p className="text-muted text-sm">
						Get started with your free account
					</p>
				</div>

				{/* Card */}
				<div className="bg-card rounded-3xl shadow-sm border border-border p-8">
					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="space-y-2">
							<label className="block text-sm font-medium text-text">
								Full name
							</label>
							<input
								type="text"
								value={form.name}
								onChange={(e) => setForm({ ...form, name: e.target.value })}
								className="w-full border border-border bg-surface px-4 py-3 rounded-xl text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
								placeholder="John Doe"
								required
							/>
						</div>

						<div className="space-y-2">
							<label className="block text-sm font-medium text-text">
								Email address
							</label>
							<input
								type="email"
								value={form.email}
								onChange={(e) => setForm({ ...form, email: e.target.value })}
								className="w-full border border-border bg-surface px-4 py-3 rounded-xl text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
								placeholder="name@example.com"
								required
							/>
						</div>

						<div className="space-y-2">
							<label className="block text-sm font-medium text-text">
								Password
							</label>
							<input
								type="password"
								value={form.password}
								onChange={(e) => setForm({ ...form, password: e.target.value })}
								className="w-full border border-border bg-surface px-4 py-3 rounded-xl text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
								placeholder="••••••••"
								required
							/>
							<p className="text-xs text-muted mt-1">
								Must be at least 8 characters
							</p>
						</div>

						{error && (
							<div className="flex items-center gap-2 text-danger text-sm bg-danger/10 px-4 py-3 rounded-xl">
								<svg
									className="w-4 h-4 flex-shrink-0"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clipRule="evenodd"
									/>
								</svg>
								<span>{error}</span>
							</div>
						)}

						{success && (
							<div className="flex items-center gap-2 text-success text-sm bg-success/10 px-4 py-3 rounded-xl">
								<svg
									className="w-4 h-4 flex-shrink-0"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clipRule="evenodd"
									/>
								</svg>
								<span>{success}</span>
							</div>
						)}

						<button
							type="submit"
							disabled={isLoading}
							className="w-full bg-gradient-to-r from-accent to-accent-light text-white font-medium px-4 py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
						>
							{isLoading ? (
								<span className="flex items-center justify-center gap-2">
									<svg
										className="animate-spin h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
									Creating account...
								</span>
							) : (
								"Create account"
							)}
						</button>

						<div className="relative py-4">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-border"></div>
							</div>
							<div className="relative flex justify-center text-xs">
								<span className="bg-card px-4 text-muted">
									By signing up, you agree to our Terms
								</span>
							</div>
						</div>
					</form>
				</div>

				{/* Login link */}
				<p className="text-center text-sm text-muted mt-6">
					Already have an account?{" "}
					<a
						href="/page/login"
						className="text-accent hover:text-accent-light font-medium transition-colors"
					>
						Sign in
					</a>
				</p>
			</div>
		</div>
	);
}
