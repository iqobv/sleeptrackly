import { Schema, model } from "mongoose";

const userSleepStatusSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  isSleeping: {
    type: Boolean,
    default: false,
  },
  sleepStart: {
    type: Date,
    default: null,
  },
});

const UserSleepStatus = model("userSleepStatus", userSleepStatusSchema);

export default UserSleepStatus;
