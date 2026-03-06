import { TypeRole } from './role';

export type TypeUser = {
  id: number;
  name: string;
  email: string;
  roleId: TypeRole['id'];
  role: TypeRole;
};

export type TypeUserUpdatable = Pick<TypeUser, 'name' | 'email' | 'roleId'>;
