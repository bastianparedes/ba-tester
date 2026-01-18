'use client';

import { Edit } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { useDialogStore } from '@/app/_common/contexts/Dialog/state';
import { useTranslationContext } from '@/app/_common/contexts/Translation';
import { useUser } from '@/app/_common/contexts/User';
import constants from '@/config/constants';
import type { TypeTenant } from '@/domain/types';
import { apiCaller } from '@/libs/restClient';

type Props = {
  initialTenants: TypeTenant[];
};

export function ClientPage({ initialTenants }: Props) {
  const user = useUser();
  const { translation } = useTranslationContext();
  const getDataFromForm = useDialogStore((state) => state.getDataFromForm);
  const [tenants, setTenants] = useState(initialTenants);

  const getTenantFromDialog = async (initialData: { name: string; description: string; domain: string }) => {
    const data = await getDataFromForm(
      {
        title: translation.tenants.createTenantTitle,
      },
      {
        name: {
          label: translation.tenants.name,
          type: 'text',
          value: initialData.name,
          required: true,
        },
        description: {
          label: translation.tenants.description,
          type: 'textarea',
          value: initialData.description,
        },
        domain: {
          label: translation.tenants.domain,
          type: 'text',
          value: initialData.domain,
          required: true,
        },
      },
    );
    return data;
  };

  const createTenant = async () => {
    const data = await getTenantFromDialog({
      name: '',
      description: '',
      domain: '',
    });
    if (!data) return;
    const result = await apiCaller.tenants.create({
      body: {
        name: data.name,
        description: data.description,
        domain: data.domain,
      },
    });
    if (!result.ok) return;
    const newTenant = await result.json();
    setTenants([...tenants, newTenant]);
  };

  const editTenant = async (tenant: TypeTenant, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = await getDataFromForm(
      {
        title: translation.tenants.editTenantTitle,
      },
      {
        name: {
          label: translation.tenants.name,
          type: 'text',
          value: tenant.name,
          required: true,
        },
        description: {
          label: translation.tenants.description,
          type: 'textarea',
          value: tenant.description,
        },
        domain: {
          label: translation.tenants.domain,
          type: 'text',
          value: tenant.domain,
          required: true,
        },
      },
    );
    if (!data) return;

    const result = await apiCaller.tenants.update({
      pathParams: { tenantId: tenant.id },
      body: {
        name: data.name,
        description: data.description,
        domain: data.domain,
      },
    });
    if (!result.ok) return;

    const updatedTenant = await result.json();
    setTenants(
      tenants.map((t) => {
        if (t.id === tenant.id) return updatedTenant;
        return t;
      }),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{translation.tenants.tenants}</h1>
          <button
            type="button"
            disabled={!user.permissions.canCreateTenant}
            onClick={() => createTenant()}
            className="bg-blue-600 hover:enabled:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition disabled:opacity-80 disabled:cursor-not-allowed"
          >
            {translation.tenants.createTenant}
          </button>
        </div>

        {tenants.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{translation.tenants.noTenants}</h3>
            <p className="text-gray-500 mb-6">{translation.tenants.noTenantsDescription}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tenants.map((tenant) => (
              <a
                key={tenant.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 relative group"
                href={user.permissions.canReadCampaign ? constants.pages.campaigns({ tenantId: tenant.id }) : ''}
              >
                {user.permissions.canUpdateTenant && (
                  <button
                    type="button"
                    onClick={(e) => editTenant(tenant, e)}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Editar tenant"
                  >
                    <Edit />
                  </button>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 pr-8">{tenant.name}</h3>
                <p className="text-sm text-blue-600 mb-3">{tenant.domain}</p>
                <p className="text-gray-600 text-sm">{tenant.description}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
