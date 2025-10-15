// src/app/dashboard/page.js
"use client";

import { useState, useEffect } from "react";
import SummarySection from "@/app/components/dashboardComponents/SummarySection";
import TaskForm from "@/app/components/dashboardComponents/TaskForm";
import TaskFilter from "@/app/components/dashboardComponents/TaskFilter";
import TaskTable from "@/app/components/dashboardComponents/TaskTable";
import TaskLogsModal from "@/app/components/dashboardComponents/TaskLogsModal";

export default function DashboardPage() {
	const [list_of_all_tasks, set_list_of_all_tasks] = useState([]);
	const [filtered_task_list, set_filtered_task_list] = useState([]);
	const [selected_task_status_filter, set_selected_task_status_filter] =
		useState("All");

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

	useEffect(() => {
		if (selected_task_status_filter === "All") {
			set_filtered_task_list(list_of_all_tasks);
		} else {
			const result = list_of_all_tasks.filter((one_task_item) => {
				return one_task_item.status === selected_task_status_filter;
			});
			set_filtered_task_list(result);
		}

		update_summary_task_data(list_of_all_tasks);
	}, [list_of_all_tasks, selected_task_status_filter]);

	async function load_all_tasks_from_server() {
		try {
			const res = await fetch("/api/tasks");
			const data = await res.json();
			set_list_of_all_tasks(data);
			update_summary_task_data(data);
		} catch (err) {
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
			set_error_message_text("Please type the task title");
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
				set_task_title_input_value("");
				set_task_description_input_value("");
				load_all_tasks_from_server();
			} else {
				set_error_message_text("Failed to create task (server issue)");
			}
		} catch (error) {
			set_error_message_text("Something went wrong while creating task");
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

		await fetch(`/api/tasks/${task_id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ status: next_status_value }),
		});

		load_all_tasks_from_server();
	}

	async function handle_delete_task(task_id) {
		const confirm_delete = confirm(
			"Are you sure you want to delete this task?"
		);
		if (!confirm_delete) {
			return;
		}

		try {
			await fetch(`/api/tasks/${task_id}`, { method: "DELETE" });
			load_all_tasks_from_server();
		} catch (error) {
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
		} catch (error) {
			console.log("Error fetching task logs:", error);
		}
	}

	return (
		<div className="min-h-screen bg-[#f4f0ff] p-6">
			<SummarySection summary_of_tasks={summary_task_data} />

			<TaskForm
				input_task_title={task_title_input_value}
				set_input_task_title={set_task_title_input_value}
				input_task_description={task_description_input_value}
				set_input_task_description={set_task_description_input_value}
				handle_add_new_task={handle_add_new_task}
				is_loading_task={is_loading_state}
				error_message={error_message_text}
			/>

			<TaskFilter
				selected_task_status_filter={selected_task_status_filter}
				set_selected_task_status_filter={set_selected_task_status_filter}
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
