// src/app/page.js
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		// Redirect to login page if not logged in
		redirect("/page/login");
	}

	// Redirect logged-in user to dashboard
	redirect("/page/dashboard");
}
