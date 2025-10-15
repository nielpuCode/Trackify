// src/app/components/TaskLogsModal.js
export default function TaskLogsModal({
	show_task_log_modal,
	set_show_task_log_modal,
	selected_task_title,
	selected_task_log,
}) {
	if (!show_task_log_modal) return null;

	return (
		<div className="fixed inset-0 bg-dark/70 flex justify-center items-center p-4 z-50 cursor-default">
			<div className="bg-card rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden border border-border">
				{/* Header */}
				<div className="bg-gradient-to-r from-accent to-accent-light p-6 text-white">
					<div className="flex items-start justify-between gap-4">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
								<svg
									className="w-6 h-6"
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
							</div>
							<div>
								<h3 className="text-2xl font-bold mb-1">Activity Logs</h3>
								<p className="text-white/90 text-sm font-medium">
									{selected_task_title}
								</p>
							</div>
						</div>
						<button
							onClick={() => set_show_task_log_modal(false)}
							className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-xl transition-colors flex-shrink-0 cursor-pointer"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Content */}
				<div className="p-6 max-h-[calc(85vh-200px)] overflow-y-auto">
					{selected_task_log.length === 0 ? (
						<div className="text-center py-16">
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
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
							<p className="text-text text-lg font-semibold mb-2">
								No Activity Yet
							</p>
							<p className="text-muted text-sm">
								This task doesn't have any recorded activity logs
							</p>
						</div>
					) : (
						<div className="space-y-3">
							{selected_task_log.map((log_item, index) => (
								<div
									key={log_item.id}
									className="bg-surface border border-border rounded-2xl p-5 hover:shadow-sm transition-shadow"
								>
									<div className="flex items-start gap-4">
										<div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
											<svg
												className="w-5 h-5 text-accent"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-text font-medium mb-2 leading-relaxed">
												{log_item.message}
											</p>
											<div className="flex items-center gap-2 text-xs text-muted">
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
												<span>
													{new Date(log_item.createdAt).toLocaleString(
														"en-US",
														{
															dateStyle: "medium",
															timeStyle: "short",
														}
													)}
												</span>
											</div>
										</div>
										{index === 0 && (
											<span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-lg">
												Latest
											</span>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="p-6 bg-surface border-t border-border">
					<button
						onClick={() => set_show_task_log_modal(false)}
						className="w-full bg-text text-white font-semibold py-3.5 rounded-xl hover:bg-text/90 transition-colors cursor-pointer"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
