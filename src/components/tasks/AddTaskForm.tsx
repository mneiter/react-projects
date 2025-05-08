"use client";

import { Button } from "@/components/ui/Button";
import { useTaskStore } from "@/store/taskStore";
import { useState } from "react";

export const AddTaskForm = () => {
    const [title, setTitle] = useState("");
    const addTask = useTaskStore((state) => state.addTask);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addTask(title);
            setTitle("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded px-2 py-1 w-full"
                placeholder="Enter task title"
            />
            <Button type="submit">Add</Button>
        </form>
    );
};
