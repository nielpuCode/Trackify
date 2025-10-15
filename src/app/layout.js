import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata = {
	title: "Trackify",
	description: "Team Task Manager Platform Internal",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0 w-full min-h-fit`}
			>
				<Providers>
					<Navbar />
					{children}
					<Toaster position="top-center" reverseOrder={false} />
				</Providers>
			</body>
		</html>
	);
}
