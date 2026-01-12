'use client';

import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { TypeUser, TypeRole } from '@/types/domain';
import { useDialogStore } from '@/app/_common/contexts/Dialog/state';
import api from '@/app/api';
import { useUser } from '@/app/_common/contexts/User';
import { isRoleSuperAdmin } from '@/utils/roles';
import { getIsUserSuperAdmin } from '@/utils/user/helper';

type Props = {
  initialUsers: TypeUser[];
  roles: TypeRole[];
};

export function ClientPage({ initialUsers, roles }: Props) {
  const [users, setUsers] = useState(initialUsers);
  const getDataFromForm = useDialogStore((state) => state.getDataFromForm);
  const confirm = useDialogStore((state) => state.confirm);
  const currentUser = useUser();

  const thereAreMoreThan2SuperAdmins = users.filter((user) => getIsUserSuperAdmin(user)).length > 2;

  const handleAdd = async () => {
    const rolesToUse = roles.filter((role) => {
      if (isRoleSuperAdmin(role) && !currentUser.permissions.canCreateSuperAdmin) return false;
      return true;
    });

    const data = await getDataFromForm(
      {
        title: 'Nuevo usuario',
      },
      {
        name: {
          label: 'Nombre',
          type: 'text',
          value: '',
          required: true,
        },
        email: {
          label: 'Email',
          type: 'email',
          value: '',
          required: true,
          forbiddenValues: users.map((user) => user.email),
        },
        password: {
          label: 'Password',
          type: 'password',
          value: '',
          required: true,
        },
        roleId: {
          label: 'Role',
          type: 'select',
          options: rolesToUse.map((role) => ({ label: role.name, value: role.id })),
          value: '',
          required: true,
        },
      },
    );
    if (!data) return;

    const apiResponse = await api.users.create({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: {
          id: data.roleId,
        },
      },
    });
    if (apiResponse.ok) return window.location.reload();
  };

  const handleEdit = async ({ user }: { user: TypeUser }) => {
    const rolesToUse = roles.filter((role) => {
      if (getIsUserSuperAdmin(user)) {
        return isRoleSuperAdmin(role) || thereAreMoreThan2SuperAdmins;
      }
      return !isRoleSuperAdmin(role);
    });

    const data = await getDataFromForm(
      {
        title: `Editar usuario "${user.name}"`,
      },
      {
        name: {
          label: 'Nombre',
          type: 'text',
          value: user.name,
          required: true,
        },
        email: {
          label: 'Email',
          type: 'email',
          value: user.email,
          required: true,
          forbiddenValues: users
            .filter((userInArray) => userInArray.email !== user.email)
            .map((userInArray) => userInArray.email),
        },
        roleId: {
          label: 'Role',
          type: 'select',
          options: rolesToUse.map((role) => ({ label: role.name, value: role.id })),
          value: user.role.id,
          required: true,
        },
      },
    );
    if (!data) return;

    const apiResponse = await api.user.update({
      body: {
        name: data.name,
        email: data.email,
        role: {
          id: data.roleId,
        },
      },
      pathParams: { userId: user.id },
    });
    if (apiResponse.ok) return window.location.reload();
  };

  const handleDelete = async ({ user }: { user: TypeUser }) => {
    const result = await confirm({ title: `¿Borrar usuario "${user.name}"?` });
    if (!result) return;
    const apiResponse = await api.user.remove({ pathParams: { userId: user.id } });
    if (apiResponse.ok) setUsers((currentState) => currentState.filter((userInArray) => userInArray.id !== user.id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h1>
            <button
              onClick={handleAdd}
              disabled={!currentUser.permissions.canCreateUser}
              className="bg-blue-600 hover:enabled:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <Plus size={20} /> Agregar Usuario
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Editar
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Eliminar
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.email} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.role.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        disabled={
                          !(
                            (getIsUserSuperAdmin(user) && currentUser.permissions.canUpdateSuperAdmin) ||
                            (!getIsUserSuperAdmin(user) && currentUser.permissions.canUpdateUser)
                          )
                        }
                        onClick={() => handleEdit({ user })}
                        className="px-3 py-1 rounded inline-flex items-center gap-1 transition bg-blue-100 text-blue-700 hover:enabled:bg-blue-200 disabled:opacity-80 disabled:cursor-not-allowed"
                      >
                        <Pencil size={16} />
                        Editar
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        disabled={
                          !(
                            (getIsUserSuperAdmin(user) &&
                              currentUser.permissions.canDeleteSuperAdmin &&
                              thereAreMoreThan2SuperAdmins) ||
                            (!getIsUserSuperAdmin(user) && currentUser.permissions.canDeleteUser)
                          )
                        }
                        onClick={() => handleDelete({ user })}
                        className="px-3 py-1 rounded inline-flex items-center gap-1 transition bg-red-100 text-red-700 hover:enabled:bg-red-200 disabled:opacity-80 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} />
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
