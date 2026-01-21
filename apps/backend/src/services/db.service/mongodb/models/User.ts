import mongoose from 'mongoose';
import type { IRole } from './Role';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  role: mongoose.Types.ObjectId | IRole;
  createdAt: Date;
  updatedAt: Date;
}

const usersSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
  },
  { timestamps: true },
);

const Users: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', usersSchema);

export default Users;
