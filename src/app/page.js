// src/app/page.js
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/page/login");
	}

	redirect("/page/dashboard");
}
