// src/app/components/navbar.js
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, LogIn, UserPlus, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
	const { data: session, status } = useSession();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<>
			{/* Floating Navbar */}
			<div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full bg-white/80">
				<nav className="mx-auto  backdrop-blur-xl border-0 shadow-2xl shadow-violet-500/10 px-6 py-3 w-[90%]">
					<div className="flex justify-between items-center">
						{/* Logo Side */}
						<Link href="/" className="flex items-center gap-3 group">
							<div className="relative">
								<div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition"></div>
								<div className="relative w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full p-0.5">
									<div className="w-full h-full bg-white rounded-full p-1.5">
										<Image
											src="/main-logo.png"
											alt="Trackify"
											fill
											className="object-contain"
											sizes="44px"
											priority
										/>
									</div>
								</div>
							</div>

							<div className="block">
								<div className="text-lg font-bold tracking-tight text-gray-900">
									Trackify
								</div>
								<div className="text-xs text-violet-600 -mt-1">
									Track Everything
								</div>
							</div>
						</Link>

						<div className="hidden md:flex items-center gap-2">
							{status === "loading" ? (
								<div className="px-4 py-2">
									<div className="flex gap-1">
										<div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
										<div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100"></div>
										<div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200"></div>
									</div>
								</div>
							) : session?.user ? (
								<>
									<div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-50 to-purple-50 rounded-full">
										<Sparkles className="w-3.5 h-3.5 text-violet-600" />
										<span className="text-sm font-medium text-gray-800">
											Hi, {session.user.name}
										</span>
									</div>
									<button
										onClick={() => signOut({ callbackUrl: "/page/login" })}
										className="px-4 py-1.5 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 rounded-full border border-red-200 hover:border-red-500 transition-all duration-200 cursor-pointer"
									>
										Logout
									</button>
								</>
							) : (
								<>
									<Link
										href="/page/login"
										className="px-4 cursor-pointer py-1.5 text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-all"
									>
										Login
									</Link>
									<Link
										href="/page/signup"
										className="relative cursor-pointer px-5 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-full shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 transition-all duration-200"
									>
										<span className="relative z-10 flex items-center gap-1.5">
											<UserPlus className="w-4 h-4" />
											Sign Up
										</span>
									</Link>
								</>
							)}
						</div>

						{/* Hamburger Button */}
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
						>
							{menuOpen ? (
								<X className="w-5 h-5 text-gray-700" />
							) : (
								<Menu className="w-5 h-5 text-gray-700" />
							)}
						</button>
					</div>
				</nav>
			</div>

			{/* Mobile Dropdown Menu */}
			{menuOpen && (
				<div className="fixed top-18 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-md md:hidden transition-all ease-in-out duration-300">
					<div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200/50 shadow-2xl shadow-violet-500/10 p-4 space-y-2">
						{status === "loading" ? (
							<div className="flex justify-center py-4">
								<div className="flex gap-1">
									<div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
									<div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-100"></div>
									<div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce delay-200"></div>
								</div>
							</div>
						) : session?.user ? (
							<>
								<div className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl">
									<Sparkles className="w-4 h-4 text-violet-600" />
									<span className="text-sm font-medium text-gray-800">
										Hi, {session.user.name}
									</span>
								</div>
								<button
									onClick={() => {
										signOut({ callbackUrl: "/page/login" });
										setMenuOpen(false);
									}}
									className="w-full px-4 py-3 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 rounded-2xl border border-red-200 hover:border-red-500 transition-all duration-200 cursor-pointer"
								>
									<span className="flex items-center justify-center gap-2">
										<LogOut className="w-4 h-4" />
										Logout
									</span>
								</button>
							</>
						) : (
							<>
								<Link
									href="/page/login"
									onClick={() => setMenuOpen(false)}
									className="block w-full px-4 py-3 text-center text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-2xl transition-all"
								>
									<span className="flex items-center justify-center gap-2">
										<LogIn className="w-4 h-4" />
										Login
									</span>
								</Link>
								<Link
									href="/page/signup"
									onClick={() => setMenuOpen(false)}
									className="block w-full px-4 py-3 text-center text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-2xl shadow-lg shadow-violet-500/30 hover:shadow-xl transition-all duration-200"
								>
									<span className="flex items-center justify-center gap-2">
										<UserPlus className="w-4 h-4" />
										Sign Up
									</span>
								</Link>
							</>
						)}
					</div>
				</div>
			)}

			{/* Spacer for content below */}
			<div className="h-24"></div>
		</>
	);
}
