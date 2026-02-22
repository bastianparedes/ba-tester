import { Injectable } from '@nestjs/common';
import type mongoose from 'mongoose';
import type { TypeRole } from '../../../domain/types';
import { connect } from './mongodb/client';
import Roles from './mongodb/models/Role';
import Users from './mongodb/models/User';

const withMapId = <T extends { _id: mongoose.Types.ObjectId }>(obj: T): Omit<T, '_id'> & { id: string } => {
  const { _id, ...rest } = obj;
  return {
    ...rest,
    id: _id.toString(),
  };
};

@Injectable()
export class RoleRepository {
  get = async (filters: { id?: string; name?: string } = {}): Promise<TypeRole | null> => {
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

  create = async (data: { name: string; description: string; permissions: string[] }): Promise<TypeRole> => {
    const newRole = new Roles(data);
    const result = (await newRole.save()).toJSON();
    return withMapId(result);
  };

  update = async (
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
    if (!updatedRole) throw new Error('Updated recently role not found');
    return withMapId(updatedRole);
  };

  getAll = async (): Promise<TypeRole[]> => {
    await connect();
    const roles = await Roles.find().lean();
    return roles.map((role) => withMapId(role));
  };

  getMany = async (filters: { id?: string; name?: string } = {}): Promise<TypeRole[]> => {
    await connect();
    const { id, ...rest } = filters;

    const query = {
      ...rest,
      ...(id ? { _id: id } : {}),
    };

    const roles = await Roles.find(query).lean();
    return roles.map((role) => withMapId(role));
  };

  remove = async ({ roleId }: { roleId: string }) => {
    await connect();
    const deletedRole = await Roles.findByIdAndDelete(roleId);
    if (!deletedRole) throw new Error(`Role (${roleId}) doesn't exist`);

    await Users.updateMany({ 'roles.roleId': roleId }, { $pull: { roles: { roleId } } });
  };
}
