// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";

export const authOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email and password required");
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) throw new Error("No user found");

				const isValid = await bcrypt.compare(
					credentials.password,
					user.password
				);
				if (!isValid) throw new Error("Invalid password");

				return { id: user.id, name: user.name, email: user.email };
			},
		}),
	],
	session: { strategy: "jwt" },
	pages: {
		signIn: "/page/login",
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
