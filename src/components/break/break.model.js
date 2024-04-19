import { Schema, model } from 'mongoose';
import crypto from 'crypto';

const BreakSchema = new Schema({
  uuid: {
    type: String,
    unique: true,
    default: crypto.randomUUID(),
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session',
    required: true,
  },
});

export default model('Break', BreakSchema);
