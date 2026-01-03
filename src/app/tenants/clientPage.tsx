'use client';

import type React from 'react';
import { useState } from 'react';
import constants from '@/config/constants';
import { useDialog } from '@/app/_common/contexts/Dialog';
import { TypeTenant } from '@/types/db';
import api from '@/app/api';
import { useTranslationContext } from '@/app/_common/contexts/Translation';

type Props = {
  initialTenants: TypeTenant[];
};

export function ClientPage({ initialTenants }: Props) {
  const { translation } = useTranslationContext();
  const dialog = useDialog();
  const [tenants, setTenants] = useState(initialTenants);

  const getTenantFromDialog = async (initialData: { name: string; description: string; domain: string }) => {
    const data = await dialog.getDataFromForm(
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
    const data = await getTenantFromDialog({ name: '', description: '', domain: '' });
    if (!data) return;
    const result = await api.createTenant({
      body: {
        name: data.name,
        description: data.description,
        domain: data.domain,
      },
    });
    if (!result.ok) return;
    const { data: newTenant } = await result.json();
    setTenants([...tenants, newTenant]);
  };

  const editTenant = async (tenant: TypeTenant, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const data = await dialog.getDataFromForm(
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

    const result = await api.updateTenant({
      pathParams: { tenantId: tenant.id },
      body: {
        name: data.name,
        description: data.description,
        domain: data.domain,
      },
    });
    if (!result.ok) return;

    const { data: updatedTenant } = await result.json();
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
            onClick={() => createTenant()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            {translation.tenants.createTenant}
          </button>
        </div>

        {tenants.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{translation.tenants.noTenants}</h3>
            <p className="text-gray-500 mb-6">{translation.tenants.noTenantsDescription}</p>
            <button
              onClick={() => createTenant()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              {translation.tenants.noTenantsCreateFirst}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tenants.map((tenant) => (
              <a
                key={tenant.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 relative group"
                href={constants.pages.campaigns({ tenantId: tenant.id })}
              >
                <button
                  onClick={(e) => editTenant(tenant, e)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Editar tenant"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
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
