import type mongoose from 'mongoose';

export function withMapId<T extends { _id: mongoose.Types.ObjectId }>(obj: T): Omit<T, '_id'> & { id: string } {
  const { _id, ...rest } = obj;
  return {
    ...rest,
    id: _id.toString(),
  };
}
