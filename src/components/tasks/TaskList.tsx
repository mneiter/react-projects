"use client";

import { Task } from "@/types/task";

interface TaskListProps {
    tasks: Task[];
    toggleTask: (id: string) => void;
    removeTask: (id: string) => void;
}

export const TaskList = ({ tasks, toggleTask, removeTask }: TaskListProps) => {
    if (tasks.length === 0) {
        return <p className="text-gray-500">No tasks yet.</p>;
    }

    return (
        <ul className="space-y-2">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className="flex items-center justify-between p-2 border rounded"
                >
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="accent-blue-500"
                        />
                        <span className={task.completed ? "line-through text-gray-400" : ""}>
                            {task.title}
                        </span>
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
