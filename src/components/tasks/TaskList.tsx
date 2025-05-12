"use client";

import { Task } from "@/types/task";
import { useState } from "react";

interface Props {
    tasks: Task[];
    toggleTask: (id: string) => void;
    removeTask: (id: string) => void;
    editTask: (id: string, newTitle: string) => void;
    isClient: boolean;
}

export const TaskList = ({ tasks, toggleTask, removeTask, editTask, isClient }: Props) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedTitle, setEditedTitle] = useState("");

    if (!isClient) {
        return <p className="text-gray-500 italic">Loading tasks...</p>;
    }

    if (tasks.length === 0) {
        return <p className="text-gray-500">No tasks yet.</p>;
    }

    const handleEditStart = (task: Task) => {
        setEditingId(task.id);
        setEditedTitle(task.title);
    };

    const handleEditSave = () => {
        if (editedTitle.trim()) {
            editTask(editingId!, editedTitle.trim());
            setEditingId(null);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleEditSave();
        if (e.key === "Escape") setEditingId(null);
    };

    return (
        <ul className="space-y-2">
            {tasks.map((task) => (
                <li key={task.id}
                    className="flex items-center justify-between p-2 border rounded"
                >
                    <div className="flex items-center gap-2 w-full">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)} // ← здесь task.id должен быть определён
                            className="accent-blue-500"
                        />

                        {editingId === task.id ? (
                            <input
                                value={editedTitle}
                                onChange={(e) => setEditedTitle(e.target.value)}
                                onBlur={handleEditSave}
                                onKeyDown={handleKeyDown}
                                autoFocus
                                className="border rounded px-2 py-1 w-full"
                            />
                        ) : (
                            <span
                                className={`flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}
                                onDoubleClick={() => handleEditStart(task)}
                            >
                                {task.title}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={() => removeTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete task"
                    >
                        🗑
                    </button>
                </li>
            ))}
        </ul>
    );
};
