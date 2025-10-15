// src/app/api/tasks/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
	const { id } = await params;
	try {
		const task = await prisma.task.findUnique({
			where: { id: parseInt(id) },
		});
		return NextResponse.json(task);
	} catch (error) {
		console.error("GET /tasks/[id] error:", error);
		return NextResponse.json({ error: "Failed to get task" }, { status: 500 });
	}
}

export async function PUT(req, { params }) {
	const { id } = await params;
	try {
		const body = await req.json();

		const updatedTask = await prisma.task.update({
			where: { id: parseInt(id) },
			data: body,
		});

		await prisma.taskLog.create({
			data: {
				message: `Task "${updatedTask.title}" was updated.`,
				taskId: updatedTask.id,
			},
		});

		return NextResponse.json(updatedTask);
	} catch (error) {
		console.error("PUT /tasks/[id] error:", error);
		return NextResponse.json(
			{ error: "Failed to update task" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req, { params }) {
	const { id } = await params;

	try {
		const taskId = parseInt(id);

		// To delete the log first from taskLog database
		await prisma.taskLog.deleteMany({
			where: { taskId },
		});

		// then delete the task from the task database
		await prisma.task.delete({
			where: { id: taskId },
		});

		return NextResponse.json(
			{ message: "Task deleted successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("DELETE /tasks/[id] error:", error);
		return NextResponse.json(
			{ error: "Failed to delete task" },
			{ status: 500 }
		);
	}
}
