import mongoose from 'mongoose';

const BetSchema = new mongoose.Schema({
  promptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  decision: { type: Boolean, required: true },
  amount: { type: Number, required: true }
})

export default mongoose.model('Bet', BetSchema);
