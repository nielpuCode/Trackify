// src/app/components/navbar.js
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { LogOut, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
	const { data: session, status } = useSession();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-border">
			<div className="max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
				{/* Left Section: Logo + Brand */}
				<Link href="/" className="flex items-center gap-2 group">
					<div className="relative w-9 h-9">
						<Image
							src="/main-logo.png"
							alt="Trackify Logo"
							fill
							className="object-contain transition-transform duration-200 group-hover:scale-105 rounded-full"
							sizes="40px"
							priority
						/>
					</div>
					<span className="text-lg sm:text-xl font-bold tracking-tight group-hover:text-accent-light text-accent transition-colors italic">
						Trackify
					</span>
				</Link>

				{/* Desktop Nav */}
				<div className="hidden md:flex items-center gap-5">
					{status === "loading" ? (
						<p className="text-gray-400 text-sm">Loading...</p>
					) : session?.user ? (
						<>
							<span className="text-sm text-gray-700">
								👋 Hello, <strong>{session.user.name}</strong>
							</span>
							<button
								onClick={() => signOut({ callbackUrl: "/page/login" })}
								className="flex items-center gap-1 text-sm font-medium text-danger hover:text-red-600 bg-red-50 px-3 py-1.5 rounded-lg transition-all duration-200"
							>
								<LogOut className="w-4 h-4" />
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								href="/page/login"
								className="flex items-center gap-1 text-sm text-gray-700 hover:text-accent transition-colors"
							>
								<LogIn className="w-4 h-4" />
								Login
							</Link>
							<Link
								href="/page/signup"
								className="flex items-center gap-1 text-sm text-gray-700 hover:text-accent transition-colors"
							>
								<UserPlus className="w-4 h-4" />
								Signup
							</Link>
						</>
					)}
				</div>

				{/* Mobile Menu Button */}
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					className="md:hidden text-gray-700 hover:text-accent transition-colors"
				>
					{menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>

			{/* Mobile Dropdown */}
			{menuOpen && (
				<div className="md:hidden border-t border-border bg-white/95 backdrop-blur-md shadow-sm">
					<div className="flex flex-col items-center py-4 space-y-3">
						{status === "loading" ? (
							<p className="text-gray-400 text-sm">Loading...</p>
						) : session?.user ? (
							<>
								<span className="text-sm text-gray-700">
									👋 Hello, <strong>{session.user.name}</strong>
								</span>
								<button
									onClick={() => signOut({ callbackUrl: "/page/login" })}
									className="flex items-center gap-2 text-sm font-medium text-danger hover:text-red-600 bg-red-50 px-3 py-2 rounded-lg transition-all duration-200"
								>
									<LogOut className="w-4 h-4" />
									Logout
								</button>
							</>
						) : (
							<>
								<Link
									href="/page/login"
									className="flex items-center gap-2 text-sm text-gray-700 hover:text-accent transition-colors"
									onClick={() => setMenuOpen(false)}
								>
									<LogIn className="w-4 h-4" />
									Login
								</Link>
								<Link
									href="/page/signup"
									className="flex items-center gap-2 text-sm text-gray-700 hover:text-accent transition-colors"
									onClick={() => setMenuOpen(false)}
								>
									<UserPlus className="w-4 h-4" />
									Signup
								</Link>
							</>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}
