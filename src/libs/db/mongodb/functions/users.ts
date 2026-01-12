import { IRole, Roles, Users } from '../client';
import { withMapId } from './utils';
import { TypeUser } from '@/types/domain';

export const create = async (data: { name: string; email: string; passwordHash: string; role: { id: string } }) => {
  const role = await Roles.findById(data.role.id).lean();
  if (!role) throw new Error(`Role (${data.role.id}) doesn't exist when creating user`);

  const newUser = new Users({ ...data, role: role._id });
  await newUser.save();
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
  const updatedUser = await Users.findByIdAndUpdate(userId, { ...updates, role: updates.role.id }, { new: true })
    .select('-passwordHash')
    .populate<{ role: IRole }>('role')
    .lean();
  if (!updatedUser) throw new Error(`user (${userId}) doesn't exist`);
  return withMapId(updatedUser);
};

export const get = async ({ userId }: { userId: string }): Promise<TypeUser | null> => {
  const user = await Users.findById(userId).select('-passwordHash').populate<{ role: IRole }>('role').lean();
  if (!user) return null;
  const userPopulated = withMapId({
    ...user,
    role: withMapId(user.role),
  });
  return userPopulated;
};

export const getForLogin = async ({ email }: { email: string }) => {
  const user = await Users.findOne({ email }).lean();
  if (!user) throw new Error(`user with email (${email}) doesn't exist`);
  return { id: user._id.toString(), email: user.email, passwordHash: user.passwordHash };
};

export const getAll = async (): Promise<TypeUser[]> => {
  const users = await Users.find().select('-passwordHash').populate<{ role: IRole }>('role').lean();
  const safeUsers = users.map((user) =>
    withMapId({
      ...user,
      role: withMapId(user.role),
    }),
  );
  return safeUsers;
};

export const getMany = async (filters: { id?: string; name?: string; role?: string }): Promise<TypeUser[]> => {
  const users = await Users.find(filters).select('-passwordHash').populate<{ role: IRole }>('role').lean();
  const safeUsers = users.map((user) =>
    withMapId({
      ...user,
      role: withMapId(user.role),
    }),
  );
  return safeUsers;
};

export const remove = async ({ userId }: { userId: string }) => {
  await Users.findByIdAndDelete(userId);
};
