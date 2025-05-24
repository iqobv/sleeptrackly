import { Schema } from "mongoose";

export const taskItemSchema = new Schema({
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  description: { type: String, required: true },
  targetValue: { type: Number, default: null },
  completedValue: { type: Number, default: null },
  isCompleted: { type: Boolean, default: false },
});
