// src/app/page/login/page.js

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		const res = await signIn("credentials", {
			redirect: false,
			email,
			password,
		});

		setIsLoading(false);

		if (res.error) {
			setError("Invalid email or password");
		} else {
			router.push("/page/dashboard");
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
								d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
							/>
						</svg>
					</div>
					<h1 className="text-3xl font-bold text-text mb-2">Welcome back</h1>
					<p className="text-muted text-sm">
						Sign in to continue to your account
					</p>
				</div>

				{/* Card */}
				<div className="bg-card rounded-3xl shadow-sm border border-border p-8">
					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="space-y-2">
							<label className="block text-sm font-medium text-text">
								Email address
							</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full border border-border bg-surface px-4 py-3 rounded-xl text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
								placeholder="name@example.com"
								required
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<label className="block text-sm font-medium text-text">
									Password
								</label>
							</div>
							<input
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full border border-border bg-surface px-4 py-3 rounded-xl text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
								placeholder="••••••••"
								required
							/>
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
									Signing in...
								</span>
							) : (
								"Sign in"
							)}
						</button>
					</form>
				</div>

				{/* Sign up link */}
				<p className="text-center text-sm text-muted mt-6">
					Don't have an account?{" "}
					<a
						href="/page/signup"
						className="text-accent hover:text-accent-light font-medium transition-colors"
					>
						Create account
					</a>
				</p>
			</div>
		</div>
	);
}
