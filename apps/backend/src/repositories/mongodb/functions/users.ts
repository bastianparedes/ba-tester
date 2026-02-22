import type { TypeUser } from '../../../../../domain/types';
import { getPasswordHashed } from '../../../libs/auth/password';
import { connect } from '../client';
import Roles, { type IRole } from '../models/Role';
import Users from '../models/User';
import { withMapId } from './utils';

export const get = async ({ userId }: { userId: string }): Promise<TypeUser | null> => {
  await connect();
  const user = await Users.findById(userId).select('-passwordHash').populate<{ role: IRole }>('role').lean();
  if (!user) return null;
  const userPopulated = withMapId({
    ...user,
    role: withMapId(user.role),
  });
  return userPopulated;
};

export const create = async (data: { name: string; email: string; password: string; role: { id: string } }) => {
  await connect();
  const role = await Roles.findById(data.role.id).lean();
  if (!role) throw new Error(`Role (${data.role.id}) doesn't exist when creating user`);

  const passwordHash = getPasswordHashed(data.password);
  const newUser = new Users({ ...data, passwordHash, role: role._id });
  const result = await newUser.save();
  const gettedUser = await get({ userId: result._id.toString() });
  if (!gettedUser) throw new Error('Could not get recently created user');
  return gettedUser;
};

export const update = async (
  { userId }: { userId: string },
  updates: {
    name: string;
    email: string;
    role: {
      id: string;
    };
  },
) => {
  await connect();
  const updatedUser = await Users.findByIdAndUpdate(userId, { ...updates, role: updates.role.id }, { new: true });
  if (!updatedUser) throw new Error(`user (${userId}) doesn't exist`);

  const user = await get({ userId });
  if (!user) throw new Error('Could not get recently updated user');
  return user;
};

export const getForLogin = async ({ email }: { email: string }) => {
  await connect();
  const user = await Users.findOne({ email }).lean();
  if (!user) throw new Error(`user with email (${email}) doesn't exist`);
  return {
    id: user._id.toString(),
    email: user.email,
    passwordHash: user.passwordHash,
  };
};

export const getAll = async (): Promise<TypeUser[]> => {
  await connect();
  const users = await Users.find().select('-passwordHash').populate<{ role: IRole }>('role').lean();
  const safeUsers = users.map((user) =>
    withMapId({
      ...user,
      role: withMapId(user.role),
    }),
  );
  return safeUsers;
};

export const getMany = async (filters: { id?: string; name?: string; role?: string } = {}): Promise<TypeUser[]> => {
  await connect();
  const { id, ...rest } = filters;

  const query = {
    ...rest,
    ...(id ? { _id: id } : {}),
  };

  const users = await Users.find(query).select('-passwordHash').populate<{ role: IRole }>('role').lean();

  return users.map((user) =>
    withMapId({
      ...user,
      role: withMapId(user.role),
    }),
  );
};

export const remove = async ({ userId }: { userId: string }) => {
  await connect();
  await Users.findByIdAndDelete(userId);
};
