import { Schema, model } from 'mongoose';
import { hash } from 'bcryptjs';

const userSchema = new Schema({
  name: String,
  phone: { type: String, unique: true },
  password: String,
  role : { type : String,  enum: ['Customer', 'admin'], default : "Customer"},
  isBlocked : { type : Boolean , default: false}
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = hash(this.password, 10);
  next();
});

export default model('User', userSchema);
