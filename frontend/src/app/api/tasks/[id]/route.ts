import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import { Task } from '../../../../models/Task';

// PATCH /api/tasks/[id]
export async function PATCH(req: Request, context: { params: { id: string } }) {
  const id = context.params.id;

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    const body = await req.json();
    await connectToDatabase();

    const updated = await Task.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error('PATCH /api/tasks failed:', err);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id]
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const id = context.params.id;

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/tasks failed:', err);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
