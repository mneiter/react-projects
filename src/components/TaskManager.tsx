"use client";
import { useTaskStore } from "@/store/taskStore";
import { AddTaskForm } from "./tasks/AddTaskForm";
import { TaskList } from "./tasks/TaskList";

export const TaskManager = () => {
    const { tasks, addTask, toggleTask, removeTask } = useTaskStore();

    return (
        <>
            <AddTaskForm addTask={addTask} />
            <TaskList
                tasks={tasks}
                toggleTask={toggleTask}
                removeTask={removeTask}
            />
        </>
    );
};
