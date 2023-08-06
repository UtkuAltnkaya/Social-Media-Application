import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  user_id: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true, maxLength: 15 },
  name: { type: String, require: true },
  surname: { type: String, require: true },
});

const User = mongoose.model('User', userSchema);

export default User;
