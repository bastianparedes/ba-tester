import mongoose from './client';

/* =======================
  ROLES
======================= */

export interface IRole extends mongoose.Document {
  name: string;
  description: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const rolesSchema = new mongoose.Schema<IRole>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: { type: [String], required: true },
  },
  { timestamps: true },
);

export const Roles: mongoose.Model<IRole> = mongoose.models.Role || mongoose.model<IRole>('Role', rolesSchema);

/* =======================
  USERS
======================= */

export interface IRoleSub {
  roleId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  permissions: string[];
}

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  passwordHash: string;
  roles: IRoleSub[];
  createdAt: Date;
  updatedAt: Date;
}

const roleSubSchema = new mongoose.Schema<IRoleSub>(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: { type: [String], required: true },
  },
  { _id: false },
);

const usersSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    roles: { type: [roleSubSchema], required: true },
  },
  { timestamps: true },
);

export const Users: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', usersSchema);
