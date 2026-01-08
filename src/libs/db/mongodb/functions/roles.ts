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
  const role = await Roles.findById(roleId).lean();
  if (!role) throw new Error(`Role (${roleId}) doesn't exist`);
  const { _id, ...rest } = role;
  return {
    ...rest,
    id: _id.toString(),
  };
};

export const getAll = async () => {
  const roles = await Roles.find().lean();
  return roles.map(({ _id, ...rest }) => ({
    ...rest,
    id: _id.toString(),
  }));
};

export const remove = async ({ roleId }: { roleId: string }) => {
  const deletedRole = await Roles.findByIdAndDelete(roleId);
  if (!deletedRole) throw new Error(`Role (${roleId}) doesn't exist`);

  await Users.updateMany({ 'roles.roleId': roleId }, { $pull: { roles: { roleId } } });
};
