"use client";

import { useTaskStore } from "@/store/taskStore";
import { Task } from "@/types/task";
import { useState } from "react";
import { AddTaskForm } from "./tasks/AddTaskForm";
import { TaskList } from "./tasks/TaskList";
import { TaskStats } from "./tasks/TaskStats";

type Filter = "all" | "active" | "completed";

export const TaskManager = () => {
    const { tasks, addTask, toggleTask, removeTask, isClient } = useTaskStore();
    const [filter, setFilter] = useState<Filter>("all");

    // Filtered tasks
    const filteredTasks: Task[] = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    // Calculate task stats
    const total = tasks.length;
    const active = tasks.filter((t) => !t.completed).length;
    const completed = tasks.filter((t) => t.completed).length;

    return (
        <>
            <AddTaskForm addTask={addTask} />

            {/* Filter buttons */}
            <div className="flex gap-2 mb-2">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                >
                    All
                </button>
                <button
                    onClick={() => setFilter("active")}
                    className={`px-3 py-1 rounded ${filter === "active" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                >
                    Active
                </button>
                <button
                    onClick={() => setFilter("completed")}
                    className={`px-3 py-1 rounded ${filter === "completed" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                        }`}
                >
                    Completed
                </button>
            </div>

            {/* Task counter */}
            <TaskStats total={total} active={active} completed={completed} />

            {/* Task list */}
            <TaskList
                tasks={filteredTasks}
                toggleTask={toggleTask}
                removeTask={removeTask}
                isClient={isClient}
            />
        </>
    );
};
