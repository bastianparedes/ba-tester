import type { TypeRole } from '@/types/domain';
import { connect } from '../client';
import Roles from '../models/Role';
import Users from '../models/User';
import { withMapId } from './utils';

export const create = async (data: {
  name: string;
  description: string;
  permissions: string[];
}): Promise<TypeRole> => {
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
  await connect();
  const updatedRole = await Roles.findByIdAndUpdate(roleId, updates, {
    new: true,
  });
  return updatedRole;
};

export const get = async (
  filters: { id?: string; name?: string } = {},
): Promise<TypeRole | null> => {
  await connect();
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
  await connect();
  const roles = await Roles.find().lean();
  return roles.map((role) => withMapId(role));
};

export const getMany = async (
  filters: { id?: string; name?: string } = {},
): Promise<TypeRole[]> => {
  await connect();
  const { id, ...rest } = filters;

  const query = {
    ...rest,
    ...(id ? { _id: id } : {}),
  };

  const roles = await Roles.find(query).lean();
  return roles.map((role) => withMapId(role));
};

export const remove = async ({ roleId }: { roleId: string }) => {
  await connect();
  const deletedRole = await Roles.findByIdAndDelete(roleId);
  if (!deletedRole) throw new Error(`Role (${roleId}) doesn't exist`);

  await Users.updateMany(
    { 'roles.roleId': roleId },
    { $pull: { roles: { roleId } } },
  );
};
