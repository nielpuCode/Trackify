// src/middleware.js
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const token = req.nextauth?.token;

		if (!token) {
			const loginUrl = new URL("/page/login", req.url);
			loginUrl.searchParams.set("callbackUrl", req.url);
			return NextResponse.redirect(loginUrl);
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token }) => !!token,
		},
		secret: process.env.NEXTAUTH_SECRET,
	}
);

export const config = {
	matcher: ["/page/dashboard/:path*"],
};
