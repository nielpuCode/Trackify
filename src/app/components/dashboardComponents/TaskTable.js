// src/app/components/TaskTable.js
"use client";
import { useState } from "react";

export default function TaskTable({
	filtered_task_list,
	handle_update_task_status,
	handle_delete_task,
	handle_view_task_logs,
}) {
	const [editing_task_id, set_editing_task_id] = useState(null);
	const [edit_title_input, set_edit_title_input] = useState("");
	const [edit_description_input, set_edit_description_input] = useState("");

	function formatDateTime(dateString) {
		const date = new Date(dateString);
		return date.toLocaleString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	}

	function timeAgo(dateString) {
		const now = new Date();
		const date = new Date(dateString);
		const diffMs = now - date;
		const diffSec = Math.floor(diffMs / 1000);
		const diffMin = Math.floor(diffSec / 60);
		const diffHr = Math.floor(diffMin / 60);
		const diffDay = Math.floor(diffHr / 24);

		if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
		if (diffHr > 0) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
		if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
		return "just now";
	}

	const getStatusColor = (status) => {
		if (status === "Belum Dimulai") {
			return "bg-muted/10 text-muted border-muted/20";
		} else if (status === "Sedang Dikerjakan") {
			return "bg-accent/10 text-accent border-accent/20";
		} else if (status === "Selesai") {
			return "bg-success/10 text-success border-success/20";
		} else {
			return "bg-muted/10 text-muted border-muted/20";
		}
	};

	const getStatusIcon = (status) => {
		if (status === "Belum Dimulai") {
			return (
				<svg
					className="w-4 h-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			);
		} else if (status === "Sedang Dikerjakan") {
			return (
				<svg
					className="w-4 h-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13 10V3L4 14h7v7l9-11h-7z"
					/>
				</svg>
			);
		} else if (status === "Selesai") {
			return (
				<svg
					className="w-4 h-4"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			);
		}
		return null;
	};

	const handle_save_edit_task = async (task_id) => {
		try {
			await fetch(`/api/tasks/${task_id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: edit_title_input,
					description: edit_description_input,
				}),
			});
			set_editing_task_id(null);
			window.location.reload();
		} catch (error) {
			console.error("Failed to update task:", error);
		}
	};

	if (filtered_task_list.length === 0) {
		return (
			<div className="bg-card border border-border rounded-2xl p-16 text-center cursor-default">
				<div className="w-20 h-20 rounded-full bg-surface mx-auto mb-4 flex items-center justify-center">
					<svg
						className="w-10 h-10 text-muted"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
						/>
					</svg>
				</div>
				<p className="text-text text-lg font-semibold mb-2">No Tasks Found</p>
				<p className="text-muted text-sm">
					Try creating a new task to get started
				</p>
			</div>
		);
	}

	return (
		<div>
			{/* For desktop view */}
			<div className="hidden lg:block bg-card border border-border rounded-2xl overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-border bg-accent">
								<th className="px-4 py-4 text-left text-xs font-bold text-white uppercase cursor-default">
									Title
								</th>
								<th className="px-4 py-4 text-left text-xs font-bold text-white uppercase cursor-default">
									Description
								</th>
								<th className="px-4 py-4 text-left text-xs font-bold text-white uppercase cursor-default">
									Status
								</th>
								<th className="px-4 py-4 text-left text-xs font-bold text-white uppercase cursor-default">
									Created
								</th>
								<th className="px-4 py-4 text-left text-xs font-bold text-white uppercase cursor-default">
									Updated
								</th>
								<th className="px-4 py-4 text-right text-xs font-bold text-white uppercase cursor-default">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{filtered_task_list.map((task) => (
								<tr
									key={task.id}
									className="hover:bg-surface transition-colors"
								>
									<td className="px-4 py-4">
										{editing_task_id === task.id ? (
											<input
												type="text"
												value={edit_title_input}
												onChange={(e) => set_edit_title_input(e.target.value)}
												className="border border-border bg-surface rounded-lg px-3 py-2 w-full text-sm text-text cursor-text focus:outline-none focus:ring-2 focus:ring-accent"
											/>
										) : (
											<p className="font-semibold text-text cursor-default">
												{task.title}
											</p>
										)}
									</td>

									<td className="px-4 py-4">
										{editing_task_id === task.id ? (
											<textarea
												value={edit_description_input}
												onChange={(e) =>
													set_edit_description_input(e.target.value)
												}
												className="border border-border bg-surface rounded-lg px-3 py-2 w-full text-sm text-text cursor-text focus:outline-none focus:ring-2 focus:ring-accent"
												rows="2"
											/>
										) : (
											<p className="text-sm text-muted cursor-default max-w-xs">
												{task.description || (
													<span className="italic">No description</span>
												)}
											</p>
										)}
									</td>

									<td className="px-4 py-4">
										<span
											className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${getStatusColor(
												task.status
											)} cursor-default`}
										>
											{getStatusIcon(task.status)}
											{task.status}
										</span>
									</td>

									<td className="px-4 py-4">
										<p className="text-xs text-muted cursor-default">
											{formatDateTime(task.createdAt)}
										</p>
									</td>

									<td className="px-4 py-4">
										<p className="text-xs text-muted cursor-default">
											{timeAgo(task.updatedAt)}
										</p>
									</td>

									<td className="px-4 py-4">
										<div className="flex items-center justify-end gap-2">
											{editing_task_id === task.id ? (
												<>
													<button
														onClick={() => handle_save_edit_task(task.id)}
														className="px-3 py-2 bg-success text-white text-xs font-medium rounded-lg hover:bg-success/90 transition-colors cursor-pointer"
													>
														Save
													</button>
													<button
														onClick={() => set_editing_task_id(null)}
														className="px-3 py-2 bg-muted/20 text-text text-xs font-medium rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
													>
														Cancel
													</button>
												</>
											) : (
												<>
													<button
														onClick={() =>
															handle_update_task_status(task.id, task.status)
														}
														className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors cursor-pointer"
														title="Update Status"
													>
														<svg
															className="w-4 h-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M13 10V3L4 14h7v7l9-11h-7z"
															/>
														</svg>
													</button>

													<button
														onClick={() => {
															set_editing_task_id(task.id);
															set_edit_title_input(task.title);
															set_edit_description_input(
																task.description || ""
															);
														}}
														className="p-2 bg-surface text-text rounded-lg hover:bg-muted/10 transition-colors cursor-pointer"
														title="Edit"
													>
														<svg
															className="w-4 h-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
															/>
														</svg>
													</button>

													<button
														onClick={() =>
															handle_view_task_logs(task.id, task.title)
														}
														className="p-2 bg-surface text-text rounded-lg hover:bg-muted/10 transition-colors cursor-pointer"
														title="Logs"
													>
														<svg
															className="w-4 h-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
															/>
														</svg>
													</button>

													<button
														onClick={() => handle_delete_task(task.id)}
														className="p-2 bg-danger/10 text-danger rounded-lg hover:bg-danger/20 transition-colors cursor-pointer"
														title="Delete"
													>
														<svg
															className="w-4 h-4"
															fill="none"
															stroke="currentColor"
															viewBox="0 0 24 24"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																strokeWidth={2}
																d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
															/>
														</svg>
													</button>
												</>
											)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* For mobile view */}
			<div className="lg:hidden space-y-4">
				{filtered_task_list.map((task) => (
					<div
						key={task.id}
						className="bg-card border border-border rounded-2xl p-5"
					>
						{editing_task_id === task.id ? (
							<div className="space-y-3">
								<div>
									<label className="block text-xs font-medium text-text mb-2 cursor-default">
										Title
									</label>
									<input
										type="text"
										value={edit_title_input}
										onChange={(e) => set_edit_title_input(e.target.value)}
										className="w-full border border-border bg-surface rounded-lg px-3 py-2 text-sm text-text cursor-text focus:outline-none focus:ring-2 focus:ring-accent"
									/>
								</div>
								<div>
									<label className="block text-xs font-medium text-text mb-2 cursor-default">
										Description
									</label>
									<textarea
										value={edit_description_input}
										onChange={(e) => set_edit_description_input(e.target.value)}
										className="w-full border border-border bg-surface rounded-lg px-3 py-2 text-sm text-text cursor-text focus:outline-none focus:ring-2 focus:ring-accent"
										rows="3"
									/>
								</div>
								<div className="flex gap-2 pt-2">
									<button
										onClick={() => handle_save_edit_task(task.id)}
										className="flex-1 px-4 py-2 bg-success text-white text-sm font-medium rounded-lg hover:bg-success/90 transition-colors cursor-pointer"
									>
										Save
									</button>
									<button
										onClick={() => set_editing_task_id(null)}
										className="flex-1 px-4 py-2 bg-muted/20 text-text text-sm font-medium rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
									>
										Cancel
									</button>
								</div>
							</div>
						) : (
							<>
								<div className="mb-4">
									<h3 className="font-bold text-text text-base mb-2 cursor-default">
										{task.title}
									</h3>
									<p className="text-sm text-muted cursor-default">
										{task.description || (
											<span className="italic">No description</span>
										)}
									</p>
								</div>

								<div className="flex items-center justify-between mb-4">
									<span
										className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border ${getStatusColor(
											task.status
										)} cursor-default`}
									>
										{getStatusIcon(task.status)}
										{task.status}
									</span>
								</div>

								<div className="mb-4 space-y-1">
									<p className="text-xs text-muted cursor-default">
										Created: {formatDateTime(task.createdAt)}
									</p>
									<p className="text-xs text-muted cursor-default">
										Updated: {timeAgo(task.updatedAt)}
									</p>
								</div>

								<div className="grid grid-cols-2 gap-2">
									<button
										onClick={() =>
											handle_update_task_status(task.id, task.status)
										}
										className="px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm font-medium cursor-pointer"
									>
										Update Status
									</button>
									<button
										onClick={() => {
											set_editing_task_id(task.id);
											set_edit_title_input(task.title);
											set_edit_description_input(task.description || "");
										}}
										className="px-4 py-2 bg-surface text-text rounded-lg hover:bg-muted/10 transition-colors text-sm font-medium border border-border cursor-pointer"
									>
										Edit
									</button>
									<button
										onClick={() => handle_view_task_logs(task.id, task.title)}
										className="px-4 py-2 bg-surface text-text rounded-lg hover:bg-muted/10 transition-colors text-sm font-medium border border-border cursor-pointer"
									>
										View Logs
									</button>
									<button
										onClick={() => handle_delete_task(task.id)}
										className="px-4 py-2 bg-danger/10 text-danger rounded-lg hover:bg-danger/20 transition-colors text-sm font-medium cursor-pointer"
									>
										Delete
									</button>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
