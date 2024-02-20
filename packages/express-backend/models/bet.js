import mongoose from 'mongoose';

const BetSchema = new mongoose.Schema({
  question: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  numberOfParticipants: { type: Number, default: 0 }
});

export default mongoose.model('Bet', BetSchema);
