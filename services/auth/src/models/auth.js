import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Auth = mongoose.model('Auth', authSchema);

export default Auth;
