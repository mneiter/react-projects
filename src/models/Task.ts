import mongoose from 'mongoose';

// Define the Task schema
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// Use existing model if it exists (hot reload safe)
export const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
