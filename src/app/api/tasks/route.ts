import { Task } from '@/types/task';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

// Temporary in-memory store (shared with [id]/route.ts via export)
export const tasks: Task[] = [];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();
  const title = body.title?.trim();

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  const newTask: Task = {
    id: nanoid(),
    title,
    completed: false,
  };

  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}
