"use client";

import { Task } from "@/types/task";
import { logger } from "@/utils/logger";
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

            logger.log("Fetched tasks:", data);
            if (!Array.isArray(data)) {
                logger.error("Invalid data format:", data);
                setIsLoading(false);
                return;
            }
            setTasks(data);
            setIsLoading(false);
        };
        loadTasks();
    }, []);

    const addTask = async (title: string) => {
        logger.log("Adding new task with title:", title);
        try {
            const newTask = await createTask(title);
            logger.log("New task created:", newTask);
            setTasks((prev) => [...prev, newTask]);
        } catch (error) {
            logger.error("Error creating task:", error);
        }
    };

    const toggleTask = async (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (!task) {
            logger.warn(`Task with id ${id} not found.`);
            return;
        }
        logger.log(`Toggling task with id ${id}. Current state:`, task);
        task.completed = !task.completed;
        const updated = await updateTask(id, task);
        logger.log(`Task with id ${id} updated. New state:`, updated);
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
