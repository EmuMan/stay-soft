import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  points: { type: Number, default: 0 },
  betsWon: { type: Number, default: 0 },
  betsLost: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  respondents: { type: Number, default: 0 }
});

export default mongoose.model('User', UserSchema);
