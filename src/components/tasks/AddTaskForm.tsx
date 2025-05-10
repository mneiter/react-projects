"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface AddTaskFormProps {
    addTask: (title: string) => void;
}

export const AddTaskForm = ({ addTask }: AddTaskFormProps) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTask(title.trim());
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="border rounded px-2 py-1 w-full"
            />
            <Button type="submit">Add</Button>
        </form>
    );
};
