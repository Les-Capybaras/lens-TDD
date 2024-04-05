import {Schema, model} from "mongoose";
import crypto from 'crypto';

const TaskSchema = new Schema({
  uuid: {
        type: String,
        unique: true,
        default: crypto.randomUUID()
  },
  completed: {
    type: Boolean,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  }
})

export default model("Task", TaskSchema);