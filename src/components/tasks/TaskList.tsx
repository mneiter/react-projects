"use client";

import { useTaskStore } from "@/store/taskStore";

export const TaskList = () => {
    const tasks = useTaskStore((state) => state.tasks);

    return (
        <ul className="space-y-2">
            {tasks.map((task) => (
                <li key={task.id} className="p-2 border rounded">
                    {task.title}
                </li>
            ))}
        </ul>
    );
};
