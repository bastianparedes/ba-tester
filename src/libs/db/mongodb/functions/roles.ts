import { Roles, Users } from '../client';
import { withMapId } from './utils';
import { TypeRole } from '@/types/domain';

export const create = async (data: { name: string; description: string; permissions: string[] }): Promise<TypeRole> => {
  const newRole = new Roles(data);
  const result = (await newRole.save()).toJSON();
  return withMapId(result);
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

export const get = async (filters: { id?: string; name?: string } = {}): Promise<TypeRole | null> => {
  const { id, ...rest } = filters;

  const query = {
    ...rest,
    ...(id ? { _id: id } : {}),
  };

  const role = await Roles.findOne(query).lean();
  if (!role) return null;

  return withMapId(role);
};

export const getAll = async (): Promise<TypeRole[]> => {
  const roles = await Roles.find().lean();
  return roles.map((role) => withMapId(role));
};

export const getMany = async (filters: { id?: string; name?: string } = {}): Promise<TypeRole[]> => {
  const { id, ...rest } = filters;

  const query = {
    ...rest,
    ...(id ? { _id: id } : {}),
  };

  const roles = await Roles.find(query).lean();
  return roles.map((role) => withMapId(role));
};

export const remove = async ({ roleId }: { roleId: string }) => {
  const deletedRole = await Roles.findByIdAndDelete(roleId);
  if (!deletedRole) throw new Error(`Role (${roleId}) doesn't exist`);

  await Users.updateMany({ 'roles.roleId': roleId }, { $pull: { roles: { roleId } } });
};
