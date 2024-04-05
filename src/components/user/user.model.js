import {Schema, model} from "mongoose";
import crypto from 'crypto';

const UserSchema = new Schema({
  uuid: {
        type: String,
        unique: true,
        default: crypto.randomUUID()
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  }
})

export default model("User", UserSchema);