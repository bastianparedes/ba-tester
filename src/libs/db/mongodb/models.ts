import mongoose from './client';

const rolesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: { type: [String], required: true },
  },
  { timestamps: true },
);
const Roles = mongoose.models.Role || mongoose.model('Role', rolesSchema);

const roleSubSchema = new mongoose.Schema(
  {
    roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: { type: [String], required: true },
  },
  { _id: false },
);
const usersSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    roles: { type: roleSubSchema, required: true },
  },
  { timestamps: true },
);
const Users = mongoose.models.User || mongoose.model('User', usersSchema);

export { Roles, Users };
