'use client';

import React, { useState } from 'react';
import { Save, User, Lock } from 'lucide-react';

interface Role {
  id: number;
  name: string;
}

interface Permission {
  id: number;
  name: string;
  description: string;
}

interface UserType {
  id: number;
  name: string;
  email: string;
  roleIds: number[];
  extraPermissions: number[];
}

interface RolePermissionsMap {
  [roleId: number]: number[];
}

interface UserExtraPermissionsMap {
  [userId: number]: number[];
}

export const ClientPage: React.FC = () => {
  const [roles] = useState<Role[]>([
    { id: 1, name: 'Administrador' },
    { id: 2, name: 'Editor' },
    { id: 3, name: 'Moderador' },
    { id: 4, name: 'Usuario' },
  ]);

  const [permissions] = useState<Permission[]>([
    { id: 1, name: 'Gestionar usuarios', description: 'Crear, editar y eliminar cuentas de usuario' },
    { id: 2, name: 'Configurar sistema', description: 'Modificar configuraciones generales del sistema' },
    { id: 3, name: 'Publicar contenido', description: 'Crear y publicar artículos y contenido nuevo' },
    { id: 4, name: 'Editar contenido', description: 'Modificar contenido existente sin publicar' },
    { id: 5, name: 'Eliminar contenido', description: 'Borrar contenido permanentemente del sistema' },
    { id: 6, name: 'Acceder base de datos', description: 'Realizar consultas directas a la base de datos' },
    { id: 7, name: 'Gestionar roles', description: 'Crear y modificar roles y sus permisos' },
    { id: 8, name: 'Ver reportes', description: 'Acceder a reportes y estadísticas del sistema' },
    { id: 9, name: 'Gestionar API keys', description: 'Crear, revocar y administrar claves de API' },
  ]);

  const [rolePermissions] = useState<RolePermissionsMap>({
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    2: [3, 4, 5, 8],
    3: [4, 5, 8],
    4: [3, 8],
  });

  const [users, setUsers] = useState<UserType[]>([
    { id: 1, name: 'Juan Pérez', email: 'juan@empresa.com', roleIds: [1], extraPermissions: [] },
    { id: 2, name: 'María González', email: 'maria@empresa.com', roleIds: [2, 3], extraPermissions: [1] },
    { id: 3, name: 'Carlos Rodríguez', email: 'carlos@empresa.com', roleIds: [4], extraPermissions: [4, 5] },
    { id: 4, name: 'Ana Martínez', email: 'ana@empresa.com', roleIds: [3], extraPermissions: [] },
  ]);

  const [selectedUser, setSelectedUser] = useState<number>(1);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [savedExtraPermissions, setSavedExtraPermissions] = useState<UserExtraPermissionsMap>({
    1: [],
    2: [1],
    3: [4, 5],
    4: [],
  });

  const addUser = (): void => {
    if (newUserName.trim() && newUserEmail.trim()) {
      const newId = Math.max(...users.map((u) => u.id)) + 1;
      const newUser: UserType = {
        id: newId,
        name: newUserName.trim(),
        email: newUserEmail.trim(),
        roleIds: [],
        extraPermissions: [],
      };
      setUsers([...users, newUser]);
      setSavedExtraPermissions({ ...savedExtraPermissions, [newId]: [] });
      setNewUserName('');
      setNewUserEmail('');
      setShowAddModal(false);
      setSelectedUser(newId);
      setHasUnsavedChanges(false);
    }
  };

  const deleteUser = (userId: number, e: React.MouseEvent): void => {
    e.stopPropagation();
    if (users.length === 1) return;

    const updatedUsers = users.filter((u) => u.id !== userId);
    setUsers(updatedUsers);

    const updatedSavedPermissions = { ...savedExtraPermissions };
    delete updatedSavedPermissions[userId];
    setSavedExtraPermissions(updatedSavedPermissions);

    if (selectedUser === userId) {
      setSelectedUser(updatedUsers[0].id);
    }
    setHasUnsavedChanges(false);
  };

  const changeUser = (userId: number): void => {
    const updatedUsers = users.map((u) =>
      u.id === selectedUser ? { ...u, extraPermissions: savedExtraPermissions[selectedUser] || [] } : u,
    );
    setUsers(updatedUsers);
    setSelectedUser(userId);
    setHasUnsavedChanges(false);
  };

  const toggleRole = (roleId: number): void => {
    const updatedUsers = users.map((u) => {
      if (u.id === selectedUser) {
        const hasRole = u.roleIds.includes(roleId);
        return {
          ...u,
          roleIds: hasRole ? u.roleIds.filter((id) => id !== roleId) : [...u.roleIds, roleId],
        };
      }
      return u;
    });
    setUsers(updatedUsers);
    setHasUnsavedChanges(true);
  };

  const toggleExtraPermission = (permissionId: number): void => {
    const currentUser = users.find((u) => u.id === selectedUser);
    if (!currentUser) return;

    const updatedUsers = users.map((u) => {
      if (u.id === selectedUser) {
        const hasPermission = u.extraPermissions.includes(permissionId);
        return {
          ...u,
          extraPermissions: hasPermission
            ? u.extraPermissions.filter((id) => id !== permissionId)
            : [...u.extraPermissions, permissionId],
        };
      }
      return u;
    });
    setUsers(updatedUsers);
    setHasUnsavedChanges(true);
  };

  const savePermissions = (): void => {
    const currentUser = users.find((u) => u.id === selectedUser);
    if (currentUser) {
      setSavedExtraPermissions({
        ...savedExtraPermissions,
        [selectedUser]: currentUser.extraPermissions,
      });
    }
    setHasUnsavedChanges(false);
  };

  const getPermissionsFromRoles = (roleIds: number[]): number[] => {
    const permissionsSet = new Set<number>();
    roleIds.forEach((roleId) => {
      const perms = rolePermissions[roleId] || [];
      perms.forEach((permId) => permissionsSet.add(permId));
    });
    return Array.from(permissionsSet);
  };

  const isPermissionFromRole = (permissionId: number, roleIds: number[]): boolean => {
    return getPermissionsFromRoles(roleIds).includes(permissionId);
  };

  const hasPermission = (permissionId: number): boolean => {
    const currentUser = users.find((u) => u.id === selectedUser);
    if (!currentUser) return false;

    return (
      isPermissionFromRole(permissionId, currentUser.roleIds) || currentUser.extraPermissions.includes(permissionId)
    );
  };

  const currentUser = users.find((u) => u.id === selectedUser);

  if (!currentUser) return null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Panel izquierdo - Usuarios */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Usuarios</h2>
          <p className="text-sm text-gray-500 mt-1">Selecciona un usuario para gestionar sus permisos</p>
        </div>

        <div className="p-4 space-y-2">
          {users.map((user) => {
            const totalPermissions = new Set([...getPermissionsFromRoles(user.roleIds), ...user.extraPermissions]).size;

            return (
              <button
                key={user.id}
                onClick={() => changeUser(user.id)}
                className={`w-full text-left p-4 rounded-lg transition-all group ${
                  selectedUser === user.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-white border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500 mb-1">{user.email}</div>
                    <div className="flex flex-wrap gap-1 mb-1">
                      {user.roleIds.map((roleId) => {
                        const role = roles.find((r) => r.id === roleId);
                        return role ? (
                          <span key={roleId} className="text-xs px-2 py-0.5 rounded-full text-white bg-blue-600">
                            {role.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                    <div className="text-xs text-gray-500">{totalPermissions} permisos totales</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel derecho - Roles y Permisos */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <User className="w-6 h-6 text-gray-700" />
                <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
              </div>
              <p className="text-sm text-gray-500">{currentUser.email}</p>
            </div>
            <button
              onClick={savePermissions}
              disabled={!hasUnsavedChanges}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                hasUnsavedChanges
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Save className="w-5 h-5" />
              <span>Guardar cambios</span>
            </button>
          </div>
        </div>

        {/* Sección de Roles */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Roles Asignados</h3>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => {
              const isAssigned = currentUser.roleIds.includes(role.id);
              return (
                <button
                  key={role.id}
                  onClick={() => toggleRole(role.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    isAssigned
                      ? `bg-blue-600 text-white`
                      : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {role.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sección de Permisos */}
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Permisos</h3>
          <p className="text-sm text-gray-500 mb-4">
            Los permisos bloqueados provienen de los roles asignados. Los permisos desbloqueados son permisos
            adicionales.
          </p>
          <div className="space-y-3">
            {permissions.map((permission) => {
              const isFromRole = isPermissionFromRole(permission.id, currentUser.roleIds);
              const isActive = hasPermission(permission.id);
              const isExtraPermission = currentUser.extraPermissions.includes(permission.id);

              return (
                <div
                  key={permission.id}
                  className={`bg-white border rounded-lg p-4 transition-shadow ${
                    isFromRole ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 flex items-start space-x-3">
                      {isFromRole && <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{permission.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{permission.description}</p>
                        {isFromRole && (
                          <p className="text-xs text-blue-600 mt-1">
                            Proviene de:{' '}
                            {currentUser.roleIds
                              .filter((roleId) => rolePermissions[roleId]?.includes(permission.id))
                              .map((roleId) => roles.find((r) => r.id === roleId)?.name)
                              .join(', ')}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => !isFromRole && toggleExtraPermission(permission.id)}
                      disabled={isFromRole}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        isFromRole
                          ? 'bg-blue-400 cursor-not-allowed'
                          : isExtraPermission
                            ? 'bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                            : 'bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal para agregar usuario */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Agregar nuevo usuario</h3>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Nombre completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              autoFocus
            />
            <input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addUser()}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewUserName('');
                  setNewUserEmail('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={addUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
