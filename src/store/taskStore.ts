'use client';

import { Task } from '@/types/task';
import { nanoid } from 'nanoid';
import { create } from 'zustand';

interface TaskState {
  tasks: Task[];
  addTask: (title: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  addTask: (title: string) =>
    set((state) => ({
      tasks: [...state.tasks, { id: nanoid(), title, completed: false }],
    })),
}));
