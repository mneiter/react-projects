"use client";

import { useState } from "react";

interface Props {
    addTask: (title: string) => void;
}

export const AddTaskForm = ({ addTask }: Props) => {
    const [title, setTitle] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            addTask(title.trim());
            setTitle("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
            <input
                type="text"
                placeholder="Add a new task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded px-3 py-1 flex-1"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
                Add
            </button>
        </form>
    );
};
