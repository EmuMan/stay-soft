import mongoose from "mongoose";

const PromptSchema = new mongoose.Schema({
  question: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  numYes: { type: Number, default: 0 },
  numNo: { type: Number, default: 0 },
  dateOpened: { type: Date, required: true },
  dateClosed: { type: Date},
  yesPool: { type: Number, default: 0 },
  noPool: { type: Number, default: 0 },
  resolution: { type: Boolean },
  comments: [{ type: String }],
});

export default mongoose.model("Prompt", PromptSchema);
