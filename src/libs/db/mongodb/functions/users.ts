import { Roles, Users } from '../models';

export const create = async (data: {
  name: string;
  email: string;
  passwordHash: string;
  role: {
    id: string;
  };
}) => {
  const rawRole = await Roles.findById(data.role.id).lean();
  if (!rawRole) throw new Error(`Role (${data.role.id}) doesn't exist when creating user`);
  const { _id, ...rest } = rawRole;
  const role = {
    ...rest,
    id: _id.toString(),
  };

  const newUser = new Users({ ...data, role });
  await newUser.save();
};

export const update = async (
  { userId }: { userId: string },
  updates: {
    name: string;
    email: string;
    permissions: string[];
    roles: {
      id: string;
    }[];
  },
) => {
  const updatedUser = await Users.findByIdAndUpdate(userId, updates, { new: true });
  return updatedUser;
};

export const get = async ({ userId }: { userId: string }) => {
  const user = await Users.findById(userId).select('-passwordHash');
  if (!user) throw new Error(`user (${userId}) doesn't exist`);
  return {
    ...user,
    id: user._id.toString(),
  };
};

export const getAll = async () => {
  const users = await Users.find().select('-passwordHash');
  return users.map((user) => ({
    ...user,
    id: user._id.toString(),
  }));
};

export const remove = async ({ userId }: { userId: string }) => {
  await Users.findByIdAndDelete(userId);
};
