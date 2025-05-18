"use client";

import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import {
    createTask,
    deleteTask,
    getTasks,
    updateTask,
} from "./../sevicies/tasksService";
import { AddTaskForm } from "./tasks/AddTaskForm";
import { FilterButtons } from "./tasks/FilterButtons";
import { TaskList } from "./tasks/TaskList";
import { TaskStats } from "./tasks/TaskStats";

export const TaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const data = await getTasks();
                if (!Array.isArray(data)) throw new Error("Invalid response");
                setTasks(data);
            } catch (err) {
                console.error("[loadTasks] Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadTasks();
    }, []);

    const handleAddTask = async (title: string) => {
        try {
            const newTask = await createTask({ title });
            setTasks((prev) => [...prev, newTask]);
        } catch (err) {
            console.error("[handleAddTask] Error:", err);
        }
    };

    const handleToggleTask = async (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        try {
            task.completed = !task.completed
            const updated = await updateTask(id, task);
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        } catch (err) {
            console.error("[handleToggleTask] Error:", err);
        }
    };

    const handleEditTask = async (id: string, title: string) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        try {
            task.title = title
            const updated = await updateTask(id, task);
            setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        } catch (err) {
            console.error("[handleEditTask] Error:", err);
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            await deleteTask(id);
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
            console.error("[handleDeleteTask] Error:", err);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "all") return true;
        return filter === "active" ? !task.completed : task.completed;
    });

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-6">
            <AddTaskForm addTask={handleAddTask} />
            <FilterButtons filter={filter} setFilter={setFilter} />
            <TaskStats tasks={tasks} />
            {isLoading ? (
                <p>Loading tasks...</p>
            ) : (
                <TaskList
                    tasks={filteredTasks}
                    toggleTask={handleToggleTask}
                    removeTask={handleDeleteTask}
                    editTask={handleEditTask}
                    isClient={true}
                    filter={filter}
                />
            )}
        </div>
    );
};
