// src/app/components/TaskFilter.js
export default function TaskFilter({
	selected_task_status_filter,
	set_selected_task_status_filter,
}) {
	return (
		<div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-card border border-border rounded-2xl p-5">
			<div>
				<h2 className="text-2xl font-bold text-text">Tasks</h2>
				<p className="text-sm text-muted mt-1">
					Manage and track your team tasks
				</p>
			</div>
			<div className="flex items-center gap-3">
				<label
					htmlFor="status_filter_dropdown"
					className="text-sm font-medium text-text whitespace-nowrap cursor-default"
				>
					Filter by:
				</label>
				<select
					id="status_filter_dropdown"
					value={selected_task_status_filter}
					onChange={(e) => set_selected_task_status_filter(e.target.value)}
					className="border border-border bg-surface rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer min-w-[160px]"
				>
					<option value="All">All Tasks</option>
					<option value="Belum Dimulai">Belum Dimulai</option>
					<option value="Sedang Dikerjakan">In Progress</option>
					<option value="Selesai">Completed</option>
				</select>
			</div>
		</div>
	);
}
