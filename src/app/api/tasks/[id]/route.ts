import { NextResponse } from 'next/server';
import { tasks } from '../route';

export async function PATCH(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();

  const task = tasks.find((t) => t.id === id);

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

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  tasks.splice(index, 1);
  return NextResponse.json({ success: true });
}
