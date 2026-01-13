import mongoose from 'mongoose';
import env from '@/libs/env';

export interface IRole extends mongoose.Document {
  name: string;
  description: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const rolesSchema = new mongoose.Schema<IRole>(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String, required: false, default: '' },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Roles: mongoose.Model<IRole> =
  mongoose.models.Role || mongoose.model<IRole>('Role', rolesSchema);

/* =======================
  USERS
======================= */

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

export const Users: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', usersSchema);

mongoose
  .connect(env.DATABASE_URL_MONGODB)
  .then(() => console.log('Connecting to mongoDB'))
  .catch((err) => console.error('Error in conection to MongoDB:', err));

export { mongoose };
