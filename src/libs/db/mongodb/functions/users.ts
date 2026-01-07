import { Users } from '../models';

export const create = async (data: {
  name: string;
  email: string;
  passwordHash: string;
  permissions: string[];
  roles: {
    roleId: string;
    name: string;
    description: string;
    permissions: string[];
  }[];
}) => {
  const newUser = new Users(data);
  await newUser.save();
  return newUser;
};

export const updateUser = async (
  { userId }: { userId: string },
  updates: {
    name: string;
    email: string;
    permissions: string[];
    roles: {
      roleId: string;
      name: string;
      description: string;
      permissions: string[];
    }[];
  },
) => {
  const updatedUser = await Users.findByIdAndUpdate(userId, updates, { new: true });
  return updatedUser;
};

export const get = async ({ userId }: { userId: string }) => {
  const user = await Users.findById(userId).select('-passwordHash');
  if (!user) return null;
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
