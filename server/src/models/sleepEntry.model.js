import { Schema, model } from "mongoose";

const sleepEntrySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  sleepStart: {
    type: Date,
    required: true,
  },
  sleepEnd: {
    type: Date,
    required: true,
  },
  sleepDuration: {
    type: Number,
    required: true,
  },
  dateForChart: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SleepEntry = model("sleepEntry", sleepEntrySchema);

export default SleepEntry;
