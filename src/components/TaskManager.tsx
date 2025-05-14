"use client";

import { Task } from "@/types/task";
import { useEffect, useState } from "react";
import {
    createTask,
    deleteTask,
    fetchTasks,
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
            const data = await fetchTasks();
            setTasks(data);
            setIsLoading(false);
        };
        loadTasks();
    }, []);

    const addTask = async (title: string) => {
        const newTask = await createTask(title);
        setTasks((prev) => [...prev, newTask]);
    };

    const toggleTask = async (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) return;
        const updated = await updateTask(id, { completed: !task.completed });
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    };

    const editTask = async (id: string, title: string) => {
        const updated = await updateTask(id, { title });
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    };

    const removeTask = async (id: string) => {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    return (
        <>
            <AddTaskForm addTask={addTask} />
            <FilterButtons filter={filter} setFilter={setFilter} />
            <TaskStats tasks={tasks} />

            {isLoading ? (
                <p className="text-gray-500 italic">Loading tasks...</p>
            ) : (
                <TaskList
                    tasks={filteredTasks}
                    toggleTask={toggleTask}
                    removeTask={removeTask}
                    editTask={editTask}
                    isClient={true}
                    filter={filter}
                />
            )}
        </>
    );
};
