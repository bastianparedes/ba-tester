'use client';

import React, { useState } from 'react';
import { Shield, Users, Settings, FileText, Database, Key, Plus, Trash2, Save } from 'lucide-react';

export default function Page() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Administrador', color: 'bg-red-500' },
    { id: 2, name: 'Editor', color: 'bg-blue-500' },
    { id: 3, name: 'Moderador', color: 'bg-green-500' },
    { id: 4, name: 'Usuario', color: 'bg-gray-500' },
  ]);

  const [permissions] = useState([
    { id: 1, name: 'Gestionar usuarios', description: 'Crear, editar y eliminar cuentas de usuario', icon: Users },
    {
      id: 2,
      name: 'Configurar sistema',
      description: 'Modificar configuraciones generales del sistema',
      icon: Settings,
    },
    { id: 3, name: 'Publicar contenido', description: 'Crear y publicar artículos y contenido nuevo', icon: FileText },
    { id: 4, name: 'Editar contenido', description: 'Modificar contenido existente sin publicar', icon: FileText },
    { id: 5, name: 'Eliminar contenido', description: 'Borrar contenido permanentemente del sistema', icon: FileText },
    {
      id: 6,
      name: 'Acceder base de datos',
      description: 'Realizar consultas directas a la base de datos',
      icon: Database,
    },
    { id: 7, name: 'Gestionar roles', description: 'Crear y modificar roles y sus permisos', icon: Shield },
    { id: 8, name: 'Ver reportes', description: 'Acceder a reportes y estadísticas del sistema', icon: FileText },
    { id: 9, name: 'Gestionar API keys', description: 'Crear, revocar y administrar claves de API', icon: Key },
  ]);

  const [rolePermissions, setRolePermissions] = useState({
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    2: [3, 4, 5, 8],
    3: [4, 5, 8],
    4: [3, 8],
  });

  const [selectedRole, setSelectedRole] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [savedPermissions, setSavedPermissions] = useState({
    1: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    2: [3, 4, 5, 8],
    3: [4, 5, 8],
    4: [3, 8],
  });

  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];

  const addRole = () => {
    if (newRoleName.trim()) {
      const newId = Math.max(...roles.map((r) => r.id)) + 1;
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const newRole = { id: newId, name: newRoleName.trim(), color: randomColor };
      setRoles([...roles, newRole]);
      setRolePermissions({ ...rolePermissions, [newId]: [] });
      setSavedPermissions({ ...savedPermissions, [newId]: [] });
      setNewRoleName('');
      setShowAddModal(false);
      setSelectedRole(newId);
      setHasUnsavedChanges(false);
    }
  };

  const deleteRole = (roleId, e) => {
    e.stopPropagation();
    if (roles.length === 1) return;

    const updatedRoles = roles.filter((r) => r.id !== roleId);
    setRoles(updatedRoles);

    const updatedPermissions = { ...rolePermissions };
    delete updatedPermissions[roleId];
    setRolePermissions(updatedPermissions);

    const updatedSavedPermissions = { ...savedPermissions };
    delete updatedSavedPermissions[roleId];
    setSavedPermissions(updatedSavedPermissions);

    if (selectedRole === roleId) {
      setSelectedRole(updatedRoles[0].id);
    }
    setHasUnsavedChanges(false);
  };

  const changeRole = (roleId) => {
    // Restaurar permisos sin guardar antes de cambiar de rol
    setRolePermissions({ ...savedPermissions });
    setSelectedRole(roleId);
    setHasUnsavedChanges(false);
  };

  const togglePermission = (permissionId) => {
    setRolePermissions((prev) => {
      const currentPerms = prev[selectedRole] || [];
      const hasPermission = currentPerms.includes(permissionId);

      return {
        ...prev,
        [selectedRole]: hasPermission
          ? currentPerms.filter((id) => id !== permissionId)
          : [...currentPerms, permissionId],
      };
    });
    setHasUnsavedChanges(true);
  };

  const savePermissions = () => {
    setSavedPermissions({ ...rolePermissions });
    setHasUnsavedChanges(false);
  };

  const hasPermission = (permissionId) => {
    return (rolePermissions[selectedRole] || []).includes(permissionId);
  };

  const currentRole = roles.find((r) => r.id === selectedRole);

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
            onClick={() => setShowAddModal(true)}
            className="w-full p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Agregar rol</span>
          </button>

          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => changeRole(role.id)}
              className={`w-full text-left p-4 rounded-lg transition-all group ${
                selectedRole === role.id
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{role.name}</div>
                  <div className="text-sm text-gray-500">
                    {(rolePermissions[role.id] || []).length} permisos asignados
                  </div>
                </div>
                <button
                  onClick={(e) => deleteRole(role.id, e)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-100 rounded-lg"
                  title="Eliminar rol"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Panel derecho - Permisos */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentRole.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Activa o desactiva los permisos para este rol</p>
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

        <div className="p-6">
          <div className="space-y-3">
            {permissions.map((permission) => {
              const Icon = permission.icon;
              const isActive = hasPermission(permission.id);

              return (
                <div
                  key={permission.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{permission.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{permission.description}</p>
                    </div>

                    <button
                      onClick={() => togglePermission(permission.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        isActive ? 'bg-blue-600' : 'bg-gray-300'
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

      {/* Modal para agregar rol */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Agregar nuevo rol</h3>
            <input
              type="text"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addRole()}
              placeholder="Nombre del rol"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewRoleName('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={addRole}
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
}
