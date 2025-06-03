"use client";

import { useMemo } from "react";
import { Task } from "../../types/task";

interface TaskStatsProps {
    tasks: Task[];
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
    // Calculate total, active and completed counts using useMemo
    const { total, active, completed } = useMemo(() => {
        const total = tasks.length;
        const active = tasks.filter((task) => !task.completed).length;
        const completed = tasks.filter((task) => task.completed).length;
        return { total, active, completed };
    }, [tasks]);

    return (
        <div className="mb-4 text-sm text-gray-700 space-x-4">
            <span>Total: <strong>{total}</strong></span>
            <span>Active: <strong>{active}</strong></span>
            <span>Completed: <strong>{completed}</strong></span>
        </div>
    );
};
