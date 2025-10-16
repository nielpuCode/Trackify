// src/app/api/tasks/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
	try {
		const tasks = await prisma.task.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json(tasks);
	} catch (error) {
		console.error("GET /tasks error:", error);
		return NextResponse.json(
			{ error: "Failed to load tasks" },
			{ status: 500 }
		);
	}
}

export async function POST(request) {
	try {
		const { title, description } = await request.json();

		if (!title || title.trim() === "") {
			return NextResponse.json(
				{ error: "Task title is required" },
				{ status: 400 }
			);
		}

		const newTask = await prisma.task.create({
			data: {
				title,
				description,
				status: "Belum Dimulai",
			},
		});

		return NextResponse.json(newTask, { status: 201 });
	} catch (error) {
		console.error("POST /tasks error:", error);
		return NextResponse.json(
			{ error: "Failed to create task" },
			{ status: 500 }
		);
	}
}
