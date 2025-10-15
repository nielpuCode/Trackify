// src/app/components/TaskForm.js
import { Plus, Sparkles, AlertCircle } from "lucide-react";

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
		<div className="mt-6">
			<form
				onSubmit={handle_add_new_task}
				className="relative bg-gradient-to-br from-white to-violet-50/30 border border-violet-100 rounded-3xl p-6 overflow-hidden"
			>
				{/* Form Fields */}
				<div className="relative space-y-4">
					{/* Task Title */}
					<div className="group">
						<label className="block text-sm font-semibold text-gray-700 mb-2">
							Task Title <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<input
								type="text"
								value={input_task_title}
								onChange={(e) => set_input_task_title(e.target.value)}
								placeholder="e.g., Design new landing page"
								required
								className="w-full px-4 py-3.5 text-sm bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all placeholder:text-gray-400"
							/>
						</div>
					</div>

					{/* Task Description */}
					<div className="group">
						<label className="block text-sm font-semibold text-gray-700 mb-2">
							Description{" "}
							<span className="text-gray-400 text-xs font-normal">
								(optional)
							</span>
						</label>
						<div className="relative">
							<textarea
								value={input_task_description}
								onChange={(e) => set_input_task_description(e.target.value)}
								placeholder="Add more details about this task..."
								rows="3"
								className="w-full px-4 py-3.5 text-sm bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all placeholder:text-gray-400 resize-none"
							/>
						</div>
					</div>

					{/* Submit Button */}
					<div className="pt-2">
						<button
							type="submit"
							disabled={is_loading_task || !input_task_title.trim()}
							className="w-full sm:w-auto relative group overflow-hidden px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transition-all duration-200"
						>
							<span className="relative z-10 flex items-center justify-center gap-2">
								{is_loading_task ? (
									<>
										<svg
											className="animate-spin w-5 h-5"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										<span>Creating Task...</span>
									</>
								) : (
									<>
										<Plus className="w-5 h-5" />
										<span>Add Task</span>
									</>
								)}
							</span>
							<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
						</button>
					</div>

					{/* Error Message */}
					{error_message && (
						<div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
							<AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
							<div className="flex-1">
								<p className="text-sm font-medium text-red-800">Error</p>
								<p className="text-sm text-red-600 mt-0.5">{error_message}</p>
							</div>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
