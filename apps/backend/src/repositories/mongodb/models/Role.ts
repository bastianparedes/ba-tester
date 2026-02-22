import mongoose from 'mongoose';

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

const Roles: mongoose.Model<IRole> = mongoose.models.Role || mongoose.model<IRole>('Role', rolesSchema);

export default Roles;
