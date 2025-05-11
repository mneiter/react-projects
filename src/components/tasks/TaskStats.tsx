"use client";

interface Props {
    total: number;
    active: number;
    completed: number;
}

export const TaskStats = ({ total, active, completed }: Props) => {
    return (
        <div className="text-sm text-gray-700 mb-4 flex gap-4">
            <span>Total: <strong>{total}</strong></span>
            <span>Active: <strong>{active}</strong></span>
            <span>Completed: <strong>{completed}</strong></span>
        </div>
    );
};
