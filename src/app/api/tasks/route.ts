import { connectToDatabase } from '@/lib/mongodb';
import { Task } from '@/models/Task';
import { NextResponse } from 'next/server';

// GET /api/tasks
export async function GET() {
  try {
    await connectToDatabase();
    const tasks = await Task.find().sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (err) {
    console.error('❌ GET /api/tasks failed:', err);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const title = body.title?.trim();

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    await connectToDatabase();

    const newTask = await Task.create({ title });
    return NextResponse.json(newTask, { status: 201 });
  } catch (err) {
    console.error('❌ POST /api/tasks failed:', err);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
