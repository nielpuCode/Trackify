// src/app/components/SummarySection.js
export default function SummarySection({ summary_of_tasks }) {
	return (
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
			<div className="bg-card border border-border p-6 rounded-2xl hover:shadow-sm transition-shadow cursor-default">
				<div className="flex items-center gap-3 mb-2">
					<div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
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
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						</svg>
					</div>
					<div>
						<p className="text-xs text-muted uppercase tracking-wide font-medium">
							Total
						</p>
						<p className="text-2xl font-bold text-text">
							{summary_of_tasks.total_task}
						</p>
					</div>
				</div>
			</div>

			<div className="bg-card border border-border p-6 rounded-2xl hover:shadow-sm transition-shadow cursor-default">
				<div className="flex items-center gap-3 mb-2">
					<div className="w-10 h-10 rounded-xl bg-muted/10 flex items-center justify-center">
						<svg
							className="w-5 h-5 text-muted"
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
					</div>
					<div>
						<p className="text-xs text-muted uppercase tracking-wide font-medium">
							Belum Selesai
						</p>
						<p className="text-2xl font-bold text-text">
							{summary_of_tasks.count_of_task_not_started}
						</p>
					</div>
				</div>
			</div>

			<div className="bg-card border border-border p-6 rounded-2xl hover:shadow-sm transition-shadow cursor-default">
				<div className="flex items-center gap-3 mb-2">
					<div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
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
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
					</div>
					<div>
						<p className="text-xs text-muted uppercase tracking-wide font-medium">
							Progress
						</p>
						<p className="text-2xl font-bold text-text">
							{summary_of_tasks.count_of_task_in_progress}
						</p>
					</div>
				</div>
			</div>

			<div className="bg-card border border-border p-6 rounded-2xl hover:shadow-sm transition-shadow cursor-default">
				<div className="flex items-center gap-3 mb-2">
					<div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
						<svg
							className="w-5 h-5 text-success"
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
					</div>
					<div>
						<p className="text-xs text-muted uppercase tracking-wide font-medium">
							Selesai
						</p>
						<p className="text-2xl font-bold text-text">
							{summary_of_tasks.count_of_task_completed}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
