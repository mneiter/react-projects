"use client";

import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import { AddTaskForm } from "./tasks/AddTaskForm";
import { TaskList } from "./tasks/TaskList";
import { TaskStats } from "./tasks/TaskStats";

export const TaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    // Load tasks from FastAPI backend
    useEffect(() => {
        fetch("http://localhost:8000/tasks")
            .then((res) => res.json())
            .then((data) => {
                setTasks(data);
                setIsLoading(false);
            });
    }, []);

    // Create a new task
    const addTask = async (title: string) => {
        const res = await fetch("http://localhost:8000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });
        const newTask = await res.json();
        setTasks((prev) => [...prev, newTask]);
    };

    // Toggle task completed status
    const toggleTask = async (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        const res = await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: !task.completed }),
        });

        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    };

    // Edit task title
    const editTask = async (id: string, title: string) => {
        const res = await fetch(`http://localhost:8000/tasks/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        });
        const updated = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    };

    // Delete a task
    const removeTask = async (id: string) => {
        await fetch(`http://localhost:8000/tasks/${id}`, { method: "DELETE" });
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    const total = tasks.length;
    const active = tasks.filter((t) => !t.completed).length;
    const completed = tasks.filter((t) => t.completed).length;

    return (
        <>
            <AddTaskForm addTask={addTask} />

            <div className="flex gap-2 mb-2">
                {(["all", "active", "completed"] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded ${filter === f ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                            }`}
                    >
                        {f[0].toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <TaskStats total={total} active={active} completed={completed} />

            {isLoading ? (
                <p className="text-gray-500 italic">Loading tasks...</p>
            ) : (
                <TaskList
                    tasks={filteredTasks}
                    toggleTask={toggleTask}
                    removeTask={removeTask}
                    editTask={editTask}
                    isClient={true}
                />
            )}
        </>
    );
};
