import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Task } from '../types/task';

const STORAGE_KEY = 'my_tasks';

export function useTaskStore() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false); // <- NEW

  // Mark that we're running on the client
  useEffect(() => {
    setIsClient(true);

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: Task[] = JSON.parse(stored);
        setTasks(parsed);
      } catch {
        console.error('Invalid tasks in localStorage');
      }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: nanoid(),
      title: title.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: newTitle.trim() } : task
      )
    );
  };

  return {
    tasks,
    addTask,
    toggleTask,
    removeTask,
    editTask,
    isClient, // <- return this flag for conditional rendering
  };
}
