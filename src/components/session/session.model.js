import { Schema, model } from "mongoose";
import crypto from 'crypto';

const SessionSchema = new Schema({
  id: {
    type: String,
    unique: true,
    default: crypto.randomUUID()
  },
  startDate: {
    type: Date,
    required: true,
  },
  stopDate: {
    type: Date,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
})

export default model("Session", SessionSchema);