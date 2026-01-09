'use client';

import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { TypeUser, TypeRole } from '@/types/domain';
import { useDialogStore } from '@/app/_common/contexts/Dialog/state';
import api from '@/app/api';
import { useRouter } from 'next/navigation';

type Props = {
  initialUsers: TypeUser[];
  roles: TypeRole[];
};

export function ClientPage({ initialUsers, roles }: Props) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const getDataFromForm = useDialogStore((state) => state.getDataFromForm);
  const confirm = useDialogStore((state) => state.confirm);

  const handleAdd = async () => {
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
          options: roles.map((role) => ({ label: role.name, value: role.id })),
          value: roles[0].id,
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
    if (apiResponse.ok) return router.refresh();
  };

  const handleEdit = async ({ user }: { user: TypeUser }) => {
    const data = await getDataFromForm(
      {
        title: 'Nuevo rol',
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
        },
        roleId: {
          label: 'Role',
          type: 'select',
          options: roles.map((role) => ({ label: role.name, value: role.id })),
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
        roleId: data.roleId,
      },
      pathParams: { userId: user.id },
    });
    if (apiResponse.ok) return router.refresh();
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
              disabled={roles.length === 0}
              className="group relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
            >
              <Plus size={20} /> Agregar Usuario
              {roles.length === 0 && (
                <span className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Create roles first
                </span>
              )}
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
                        onClick={() => handleEdit({ user })}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition inline-flex items-center gap-1"
                      >
                        <Pencil size={16} />
                        Editar
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleDelete({ user })}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition inline-flex items-center gap-1"
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
