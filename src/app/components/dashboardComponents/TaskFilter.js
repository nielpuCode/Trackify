// src/app/components/TaskFilter.js
import { Search, Filter, X } from "lucide-react";

export default function TaskFilter({
	selected_task_status_filter,
	set_selected_task_status_filter,
	search_query_filter,
	set_search_query_filter,
}) {
	return (
		<div className="mb-8">
			<div className="bg-white border border-gray-100 rounded-2xl shadow-lg shadow-violet-500/5 p-6">
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="flex-1">
						{/* Search Filter Area */}
						<div className="relative group">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
							<input
								value={search_query_filter}
								onChange={(e) => set_search_query_filter(e.target.value)}
								placeholder="Search tasks, descriptions..."
								className="w-full pl-12 pr-10 py-3.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent focus:bg-white transition-all placeholder:text-gray-400"
							/>
						</div>
					</div>

					<div className="lg:w-64">
						{/* Dropdown Filter Area */}
						<div className="relative">
							<Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-600 pointer-events-none" />
							<select
								id="status_filter_dropdown"
								value={selected_task_status_filter}
								onChange={(e) =>
									set_selected_task_status_filter(e.target.value)
								}
								className="w-full appearance-none pl-11 pr-10 py-3.5 text-sm font-medium bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent cursor-pointer transition-all hover:shadow-md hover:shadow-violet-500/10"
							>
								<option value="All">All Tasks</option>
								<option value="Belum Dimulai">Belum Dimulai</option>
								<option value="Sedang Dikerjakan">In Progress</option>
								<option value="Selesai">Completed</option>
							</select>
							<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
								<svg
									className="w-4 h-4 text-violet-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
