import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, unique: true, trim: true }
  },
  { timestamps: true }
);

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;
