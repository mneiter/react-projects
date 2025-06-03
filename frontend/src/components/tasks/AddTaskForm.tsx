"use client";

import { useRef, useState } from "react";

interface AddTaskFormProps {
    addTask: (title: string) => void;
}

export const AddTaskForm = ({ addTask }: AddTaskFormProps) => {
    const [title, setTitle] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() === "") return;

        addTask(title.trim());
        setTitle("");

        // 🔁 Вернуть фокус в поле
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
                ref={inputRef} // 👈 подключаем ref
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task"
                className="flex-1 px-3 py-2 border rounded"
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add
            </button>
        </form>
    );
};
