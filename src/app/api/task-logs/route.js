// src/app/api/task-logs/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
	try {
		const { searchParams } = new URL(req.url);
		const taskId = searchParams.get("taskId");

		if (!taskId) {
			return NextResponse.json(
				{ error: "taskId is required" },
				{ status: 400 }
			);
		}

		const logs = await prisma.taskLog.findMany({
			where: { taskId: parseInt(taskId) },
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(logs);
	} catch (error) {
		console.error("GET /task-logs error:", error);
		return NextResponse.json(
			{ error: "Failed to get task logs" },
			{ status: 500 }
		);
	}
}
