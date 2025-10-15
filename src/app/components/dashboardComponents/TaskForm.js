// src/app/components/TaskForm.js
export default function TaskForm({
	input_task_title,
	set_input_task_title,
	input_task_description,
	set_input_task_description,
	handle_add_new_task,
	is_loading_task,
	error_message,
}) {
	return (
		<form
			onSubmit={handle_add_new_task}
			className="bg-card border border-border p-5 rounded-xl mb-6"
		>
			<div className="flex flex-row items-center justify-between gap-3 border-0 w-fit mb-4">
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
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</div>
				<h2 className="text-lg font-bold text-text">Add New Task</h2>
			</div>
			<div className="flex flex-col sm:flex-row gap-3">
				<input
					type="text"
					value={input_task_title}
					onChange={(e) => set_input_task_title(e.target.value)}
					placeholder="Task title"
					className="border border-border bg-surface px-3 py-2 rounded-lg w-full text-text focus:outline-none focus:ring-2 focus:ring-accent"
				/>
				<input
					type="text"
					value={input_task_description}
					onChange={(e) => set_input_task_description(e.target.value)}
					placeholder="Description (optional)"
					className="border border-border bg-surface px-3 py-2 rounded-lg w-full text-text focus:outline-none focus:ring-2 focus:ring-accent"
				/>
				<button
					type="submit"
					disabled={is_loading_task}
					className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent-light transition-colors whitespace-nowrap disabled:opacity-50"
				>
					{is_loading_task ? "Adding..." : "Add Task"}
				</button>
			</div>
			{error_message && (
				<p className="text-danger text-sm mt-3">{error_message}</p>
			)}
		</form>
	);
}
