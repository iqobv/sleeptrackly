import { Schema, model } from "mongoose";
import dayjs from "dayjs";

const dateSchema = new Schema(
  {
    localeDate: {
      type: String,
      default: () => dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
    },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const sleepEntrySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  sleepStart: dateSchema,
  sleepEnd: dateSchema,
  sleepDuration: {
    type: Number,
    required: true,
  },
  dateForChart: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SleepEntry = model("sleepEntry", sleepEntrySchema);

export default SleepEntry;
