import { Roles, Users } from '../models';

export const create = async (data: { name: string; description: string; permissions: string[] }) => {
  const newRole = new Roles(data);

  await newRole.save();
};

export const update = async (
  { roleId }: { roleId: string },
  updates: {
    name: string;
    description: string;
    permissions: string[];
  },
) => {
  const updatedRole = await Roles.findByIdAndUpdate(roleId, updates, { new: true });
  return updatedRole;
};

export const get = async ({ roleId }: { roleId: string }) => {
  const role = await Roles.findById(roleId);
  if (!role) return null;
  return {
    ...role,
    id: role._id.toString(),
  };
};

export const getAll = async () => {
  const roles = await Roles.find();
  return roles.map((role) => ({
    ...role,
    id: role._id.toString(),
  }));
};

export const remove = async ({ roleId }: { roleId: string }) => {
  const deletedRole = await Roles.findByIdAndDelete(roleId);
  if (!deletedRole) return;

  await Users.updateMany({ 'roles.roleId': roleId }, { $pull: { roles: { roleId } } });
};
