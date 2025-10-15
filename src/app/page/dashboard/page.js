"use client";

import { useState, useEffect } from "react";
import SummarySection from "@/app/components/dashboardComponents/SummarySection";
import TaskForm from "@/app/components/dashboardComponents/TaskForm";
import TaskFilter from "@/app/components/dashboardComponents/TaskFilter";
import TaskTable from "@/app/components/dashboardComponents/TaskTable";
import TaskLogsModal from "@/app/components/dashboardComponents/TaskLogsModal";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function DashboardPage() {
	const [list_of_all_tasks, set_list_of_all_tasks] = useState([]);
	const [filtered_task_list, set_filtered_task_list] = useState([]);
	const [selected_task_status_filter, set_selected_task_status_filter] =
		useState("All");
	const [search_query_filter, set_search_query_filter] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");

	const [showForm, setShowForm] = useState(false);

	const [task_title_input_value, set_task_title_input_value] = useState("");
	const [task_description_input_value, set_task_description_input_value] =
		useState("");
	const [error_message_text, set_error_message_text] = useState("");
	const [is_loading_state, set_is_loading_state] = useState(false);

	const [is_task_log_modal_open, set_is_task_log_modal_open] = useState(false);
	const [selected_task_log_data, set_selected_task_log_data] = useState([]);
	const [selected_task_title, set_selected_task_title] = useState("");

	const [summary_task_data, set_summary_task_data] = useState({
		total_task: 0,
		count_of_task_not_started: 0,
		count_of_task_in_progress: 0,
		count_of_task_completed: 0,
	});

	useEffect(() => {
		load_all_tasks_from_server();
	}, []);

	// Debounce search input
	useEffect(() => {
		const timeout_theBouncer = setTimeout(() => {
			setDebouncedSearch(search_query_filter);
		}, 500);
		return () => clearTimeout(timeout_theBouncer);
	}, [search_query_filter]);

	// Handle filters
	useEffect(() => {
		const theResult = list_of_all_tasks.filter((foundTask) => {
			const statusMatches =
				selected_task_status_filter === "All" ||
				foundTask.status === selected_task_status_filter;

			const queryMatcher =
				debouncedSearch === "" ||
				foundTask.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
				foundTask.description
					.toLowerCase()
					.includes(debouncedSearch.toLowerCase());

			return statusMatches && queryMatcher;
		});

		set_filtered_task_list(theResult);
		update_summary_task_data(list_of_all_tasks);
	}, [list_of_all_tasks, selected_task_status_filter, debouncedSearch]);

	async function load_all_tasks_from_server() {
		try {
			const res = await fetch("/api/tasks");
			const data = await res.json();
			set_list_of_all_tasks(data);
			update_summary_task_data(data);
		} catch (err) {
			toast.error("Failed to load tasks from server.");
			set_error_message_text("Failed to get tasks from server");
		}
	}

	function update_summary_task_data(task_array) {
		const total = task_array.length;
		const not_started = task_array.filter(
			(t) => t.status === "Belum Dimulai"
		).length;
		const in_progress = task_array.filter(
			(t) => t.status === "Sedang Dikerjakan"
		).length;
		const completed = task_array.filter((t) => t.status === "Selesai").length;

		set_summary_task_data({
			total_task: total,
			count_of_task_not_started: not_started,
			count_of_task_in_progress: in_progress,
			count_of_task_completed: completed,
		});
	}

	async function handle_add_new_task(event) {
		event.preventDefault();

		if (!task_title_input_value) {
			toast.error("⚠️ Please type the task title first!");
			return;
		}

		set_is_loading_state(true);

		try {
			const res = await fetch("/api/tasks", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: task_title_input_value,
					description: task_description_input_value,
				}),
			});

			if (res.ok) {
				toast.success("Task created successfully!");
				set_task_title_input_value("");
				set_task_description_input_value("");
				setShowForm(false);
				load_all_tasks_from_server();
			} else {
				toast.error("❌ Failed to create task (server issue).");
			}
		} catch (error) {
			toast.error("❌ Something went wrong while creating the task.");
		}

		set_is_loading_state(false);
	}

	async function handle_update_task_status(task_id, current_status_value) {
		let next_status_value = "Belum Dimulai";

		if (current_status_value === "Belum Dimulai") {
			next_status_value = "Sedang Dikerjakan";
		} else if (current_status_value === "Sedang Dikerjakan") {
			next_status_value = "Selesai";
		}

		try {
			await fetch(`/api/tasks/${task_id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ status: next_status_value }),
			});

			toast.success(`Task status updated to "${next_status_value}"`);
			load_all_tasks_from_server();
		} catch {
			toast.error("❌ Failed to update task status.");
		}
	}

	async function handle_delete_task(task_id) {
		const confirm_delete = confirm(
			"Are you sure you want to delete this task?"
		);
		if (!confirm_delete) {
			toast("🟣 Task deletion cancelled.");
			return;
		}

		try {
			await fetch(`/api/tasks/${task_id}`, { method: "DELETE" });
			toast.success("🗑️ Task deleted successfully!");
			load_all_tasks_from_server();
		} catch (error) {
			toast.error("❌ Error deleting task.");
			console.log("Error deleting task:", error);
		}
	}

	async function handle_view_task_logs(task_id, title_value) {
		set_is_task_log_modal_open(true);
		set_selected_task_title(title_value);

		try {
			const res = await fetch(`/api/task-logs?taskId=${task_id}`);
			const logs = await res.json();
			set_selected_task_log_data(logs);
			toast(`📋 Viewing logs for: ${title_value}`);
		} catch (error) {
			toast.error("❌ Failed to fetch task logs.");
			console.log("Error fetching task logs:", error);
		}
	}

	return (
		<div className="min-h-screen bg-[#f4f0ff] p-6">
			<SummarySection summary_of_tasks={summary_task_data} />

			<div className="relative bg-gradient-to-br from-white to-violet-50/30 border border-violet-100 rounded-3xl p-6 shadow-xl shadow-violet-500/5 overflow-hidden mb-6">
				{/* Header */}
				<div
					onClick={(e) => setShowForm(!showForm)}
					className="relative flex items-center gap-3 cursor-pointer select-none"
				>
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl blur-sm opacity-50"></div>
						<div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
							<Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
						</div>
					</div>
					<div>
						<h2 className="text-xl sm:text-2xl font-bold text-gray-900">
							Create New Task
						</h2>
						<p className="text-xs sm:text-sm text-gray-500 mt-0.5">
							Add a task to your team workflow
						</p>
					</div>
				</div>

				{showForm && (
					<TaskForm
						input_task_title={task_title_input_value}
						set_input_task_title={set_task_title_input_value}
						input_task_description={task_description_input_value}
						set_input_task_description={set_task_description_input_value}
						handle_add_new_task={handle_add_new_task}
						is_loading_task={is_loading_state}
						error_message={error_message_text}
					/>
				)}
			</div>

			<TaskFilter
				selected_task_status_filter={selected_task_status_filter}
				set_selected_task_status_filter={set_selected_task_status_filter}
				search_query_filter={search_query_filter}
				set_search_query_filter={set_search_query_filter}
			/>

			<TaskTable
				filtered_task_list={filtered_task_list}
				handle_update_task_status={handle_update_task_status}
				handle_delete_task={handle_delete_task}
				handle_view_task_logs={handle_view_task_logs}
			/>

			<TaskLogsModal
				show_task_log_modal={is_task_log_modal_open}
				set_show_task_log_modal={set_is_task_log_modal_open}
				selected_task_title={selected_task_title}
				selected_task_log={selected_task_log_data}
			/>
		</div>
	);
}
