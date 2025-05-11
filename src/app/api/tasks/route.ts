import { Task } from '@/types/task';
import { nanoid } from 'nanoid';
import { NextResponse } from 'next/server';

const tasks: Task[] = [];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const body = await req.json();
  const title = body.title?.trim();

  if (!title) {
    return NextResponse.json({ error: 'Title required' }, { status: 400 });
  }

  const newTask: Task = {
    id: nanoid(),
    title,
    completed: false,
  };

  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const task = tasks.find((t) => t.id === params.id);

  if (!task) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  if (body.title !== undefined) {
    task.title = body.title;
  }
  if (body.completed !== undefined) {
    task.completed = body.completed;
  }

  return NextResponse.json(task);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const index = tasks.findIndex((t) => t.id === params.id);

  if (index === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  tasks.splice(index, 1);
  return NextResponse.json({ success: true });
}
