"use client";

interface FilterButtonsProps {
    filter: "all" | "active" | "completed";
    setFilter: (value: "all" | "active" | "completed") => void;
}

export const FilterButtons = ({ filter, setFilter }: FilterButtonsProps) => {
    const baseStyle = "px-3 py-1 rounded border";
    const activeStyle = "bg-blue-600 text-white border-blue-600";
    const inactiveStyle = "bg-white text-gray-700 border-gray-300";

    return (
        <div className="flex gap-2 mb-4">
            <button
                onClick={() => setFilter("all")}
                className={`${baseStyle} ${filter === "all" ? activeStyle : inactiveStyle}`}
            >
                All
            </button>
            <button
                onClick={() => setFilter("active")}
                className={`${baseStyle} ${filter === "active" ? activeStyle : inactiveStyle}`}
            >
                Active
            </button>
            <button
                onClick={() => setFilter("completed")}
                className={`${baseStyle} ${filter === "completed" ? activeStyle : inactiveStyle}`}
            >
                Completed
            </button>
        </div>
    );
};
