import mongoose from 'mongoose';
import env from '@/libs/env';
import { flatPermissions, flatSuperAdminOnlyPermissions } from '@/libs/permissions';
import constants from '@/config/constants';

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
    description: { type: String, unique: true, required: true },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const Roles: mongoose.Model<IRole> = mongoose.models.Role || mongoose.model<IRole>('Role', rolesSchema);

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

export const Users: mongoose.Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', usersSchema);

mongoose
  .connect(env.DATABASE_URL_MONGODB)
  .then(async () => {
    const superAdminRole = await Roles.findOneAndUpdate(
      { name: constants.superAdminRoleName },
      {
        name: constants.superAdminRoleName,
        description: 'Access to all',
        permissions: [...flatPermissions, ...flatSuperAdminOnlyPermissions],
      },
      { upsert: true, new: true },
    );

    Promise.all(
      env.SUPER_ADMINS.map((superAdmin) =>
        Users.findOneAndUpdate(
          { email: superAdmin.email },
          {
            $setOnInsert: {
              name: superAdmin.name,
              email: superAdmin.email,
              passwordHash: superAdmin.password,
              role: superAdminRole._id,
            },
          },
          { upsert: true, new: true },
        ),
      ),
    );
  })
  .catch((err) => console.error('Error in conection to MongoDB:', err));

export { mongoose };
