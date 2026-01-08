'use client';

import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { TypeRole } from '@/types/db';
import { flatPermissions } from '@/libs/permissions';
import { useDialogStore } from '@/app/_common/contexts/Dialog/state';
import { Switch } from '@/app/_common/components/switch';
import api from '@/app/api';

type Props = {
  initialRoles: TypeRole[];
};

export function ClientPage({ initialRoles }: Props) {
  const getDataFromForm = useDialogStore((state) => state.getDataFromForm);
  const [roles, setRoles] = useState(initialRoles);

  const [selectedRoleId, setSelectedRole] = useState<string | null>(null);

  const addRole = async () => {
    const data = await getDataFromForm(
      {
        title: 'Nuevo rol',
      },
      {
        name: {
          label: 'Nombre',
          type: 'text',
          value: '',
          required: true,
        },
        description: {
          label: 'Descripción',
          type: 'textarea',
          value: '',
          required: true,
        },
      },
    );
    if (!data) return;
    const apiResult = await api.roles.create({
      body: {
        name: data.name,
        description: data.description,
        permissions: [],
      },
    });

    if (apiResult.ok)
      setRoles((currentState) => [
        ...currentState,
        {
          id: String(currentState.length),
          name: data.name,
          description: data.description,
          permissions: [],
        },
      ]);
  };

  const deleteRole = (roleId: string) => {
    api.role
    setRoles((currentState) => currentState.filter((role) => role.id !== roleId));
  };

  const togglePermission = ({ roleId, permission }: { roleId: string; permission: string }) => {
    setRoles((currentState) =>
      currentState.map((role) => {
        if (role.id === roleId) {
          const newPermissions = role.permissions.includes(permission)
            ? role.permissions.filter((p) => p !== permission)
            : [...role.permissions, permission];
          return {
            ...role,
            permissions: newPermissions,
          };
        }
        return role;
      }),
    );
  };

  const savePermissions = () => {};

  const currentRole = roles.find((r) => r.id === selectedRoleId);

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Panel izquierdo - Roles */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Roles</h2>
          <p className="text-sm text-gray-500 mt-1">Selecciona un rol para gestionar sus permisos</p>
        </div>

        <div className="p-4 space-y-2">
          <button
            onClick={() => addRole()}
            className="w-full p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Agregar rol</span>
          </button>

          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`w-full text-left p-4 rounded-lg transition-all group ${
                selectedRoleId === role.id
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{role.name}</div>
                  <div className="text-sm text-gray-500">{role.permissions.length} permisos asignados</div>
                </div>
                <div
                  onClick={() => deleteRole(role.id)}
                  className="transition-all p-2 bg-red-100 hover:bg-red-200 rounded-lg"
                  title="Eliminar rol"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Panel derecho - Permisos */}
      {currentRole && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentRole.name}</h2>
                <p className="text-sm text-gray-500 mt-1">Activa o desactiva los permisos para este rol</p>
              </div>
              <button
                onClick={savePermissions}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all 'bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="w-5 h-5" />
                <span>Guardar cambios</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {flatPermissions.map((permission) => {
                const isActive = currentRole.permissions.includes(permission);

                return (
                  <div
                    key={permission}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{permission}</h3>
                        <p className="text-sm text-gray-500 mt-1">Descripción del permiso</p>
                      </div>
                      <Switch
                        checked={isActive}
                        onChange={() => togglePermission({ roleId: currentRole.id, permission })}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
