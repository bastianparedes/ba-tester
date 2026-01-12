'use client';

import { useState, useEffect, useReducer } from 'react';
import { ChevronUp, ChevronDown, PlusCircle } from 'lucide-react';
import api from '@/app/api';
import { type TypeStatus, TypeCampaign, TypeOrderBy, TypeOrderDirection } from '@/types/domain/index';
import config from '@/config/constants';
import commonConstants from '@/config/common/constants';
import Pagination from '@mui/material/Pagination';
import { useTranslationContext } from '@/app/_common/contexts/Translation';
import { useUser } from '@/app/_common/contexts/User';
import { Button } from '@/app/_common/components/button';

type UiState = {
  sortConfig: { key: TypeOrderBy; direction: TypeOrderDirection };
  statusFilter: TypeStatus[];
  nameFilter: string;
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
};

type UiAction =
  | { type: 'SET_SORT'; payload: TypeOrderBy }
  | { type: 'SET_STATUS_FILTER'; payload: TypeStatus }
  | { type: 'SET_NAME_FILTER'; payload: string }
  | { type: 'SET_ITEMS_PER_PAGE'; payload: number }
  | { type: 'SET_TOTAL_ITEMS'; payload: number }
  | { type: 'SET_CURRENT_PAGE'; payload: number };

type PageProps = {
  tenantId: number;
};
export function ClientPage({ tenantId }: PageProps) {
  const user = useUser();
  const { translation } = useTranslationContext();

  const [campaigns, setCampaigns] = useState<TypeCampaign[]>([]);
  const [state, dispatch] = useReducer(
    (state: UiState, action: UiAction): UiState => {
      switch (action.type) {
        case 'SET_SORT': {
          if (state.sortConfig.key !== action.payload)
            return { ...state, sortConfig: { key: action.payload, direction: 'asc' }, currentPage: 0 };

          const newDirection = {
            asc: 'desc' as const,
            desc: 'asc' as const,
          }[state.sortConfig.direction];
          return { ...state, sortConfig: { ...state.sortConfig, direction: newDirection }, currentPage: 0 };
        }
        case 'SET_NAME_FILTER':
          return { ...state, nameFilter: action.payload };
        case 'SET_STATUS_FILTER': {
          if (state.statusFilter.includes(action.payload)) {
            const newStatusFilter = state.statusFilter.filter((status) => status !== action.payload);
            return { ...state, statusFilter: newStatusFilter };
          }
          return { ...state, statusFilter: [...state.statusFilter, action.payload] };
        }
        case 'SET_ITEMS_PER_PAGE':
          return { ...state, itemsPerPage: action.payload };
        case 'SET_TOTAL_ITEMS':
          return { ...state, totalItems: action.payload };
        case 'SET_CURRENT_PAGE':
          return { ...state, currentPage: action.payload };
        default:
          return state;
      }
    },
    {
      sortConfig: { key: 'id', direction: 'asc' },
      statusFilter: ['active', 'inactive'],
      nameFilter: '',
      itemsPerPage: config.quantitiesAvailable[0],
      totalItems: 0,
      currentPage: 0,
    },
  );

  const queryCampaigns = async (
    args: Partial<{
      textSearch: string;
      orderBy: 'name' | 'id' | 'status';
      orderDirection: TypeOrderDirection;
      page: number;
      quantity: number;
      statusList: TypeStatus[];
    }> = {},
  ) => {
    const result = await api.campaigns.getMany({
      pathParams: { tenantId },
      queryParams: {
        textSearch: state.nameFilter,
        orderBy: state.sortConfig.key,
        orderDirection: state.sortConfig.direction,
        page: state.currentPage,
        quantity: state.itemsPerPage,
        statusList: state.statusFilter,
        ...args,
      },
    });

    if (result.ok) {
      const json = await result.json();
      setCampaigns(json.data.campaigns);
      dispatch({ type: 'SET_TOTAL_ITEMS', payload: json.data.count });
    }
  };
  const totalPages = Math.ceil(state.totalItems / state.itemsPerPage);

  useEffect(() => {
    queryCampaigns();
  }, [state.currentPage, state.sortConfig]);

  const onApplyFilters = () => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 0 });
    queryCampaigns({ page: 0 });
  };

  const getStatusColor = (status: TypeStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'deleted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const SortIcon = ({ column }: { column: TypeOrderBy }) => {
    if (state.sortConfig.key !== column) {
      return <span className="text-slate-400 ml-1">⇅</span>;
    }
    return state.sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4 ml-1 inline" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1 inline" />
    );
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{translation.campaigns.headerTitle}</h1>
            <p className="text-slate-600">{translation.campaigns.headerSubTitle}</p>
          </div>
          <Button
            disabled={!user.permissions.canCreateCampaign}
            href={
              user.permissions.canCreateCampaign
                ? config.pages.campaign({ tenantId, campaignId: undefined })
                : undefined
            }
          >
            <PlusCircle />
            {translation.campaigns.createCampaignButton}
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th
                    onClick={() => dispatch({ type: 'SET_SORT', payload: 'id' })}
                    className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-slate-700 transition-colors select-none"
                  >
                    {translation.campaigns.tableId}
                    <SortIcon column="id" />
                  </th>
                  <th
                    onClick={() => dispatch({ type: 'SET_SORT', payload: 'name' })}
                    className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-slate-700 transition-colors select-none"
                  >
                    {translation.campaigns.tableName}
                    <SortIcon column="name" />
                  </th>
                  <th
                    onClick={() => dispatch({ type: 'SET_SORT', payload: 'status' })}
                    className="px-6 py-4 text-center text-sm font-semibold cursor-pointer hover:bg-slate-700 transition-colors select-none"
                  >
                    {translation.campaigns.tableStatus}
                    <SortIcon column="status" />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {campaigns.length > 0 ? (
                  campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-700 font-medium">
                        <a
                          href={
                            user.permissions.canReadCampaign
                              ? config.pages.campaign({ tenantId, campaignId: campaign.id })
                              : ''
                          }
                        >
                          {campaign.id}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-semibold">
                        <a
                          href={
                            user.permissions.canReadCampaign
                              ? config.pages.campaign({ tenantId, campaignId: campaign.id })
                              : ''
                          }
                        >
                          {campaign.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(campaign.status)}`}
                        >
                          <a
                            href={
                              user.permissions.canReadCampaign
                                ? config.pages.campaign({ tenantId, campaignId: campaign.id })
                                : ''
                            }
                          >
                            {translation.campaigns.status[campaign.status]}
                          </a>
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-slate-500">
                      {translation.campaigns.noData}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Paginación */}
        <div className="mt-6 flex items-center justify-center bg-white rounded-lg shadow p-4">
          <Pagination count={totalPages} page={state.currentPage + 1} onChange={() => {}} />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">{translation.campaigns.filtersTitle}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onApplyFilters();
          }}
        >
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {translation.campaigns.filtersText}
            </label>
            <input
              type="text"
              value={state.nameFilter}
              onChange={(e) => dispatch({ type: 'SET_NAME_FILTER', payload: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {translation.campaigns.filtersStatus}
            </label>
            <div className="space-y-2">
              {commonConstants.campaignStatus.map((status) => (
                <label key={status} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={state.statusFilter.includes(status)}
                    onChange={() => dispatch({ type: 'SET_STATUS_FILTER', payload: status })}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-slate-700">{translation.campaigns.status[status]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {translation.campaigns.filtersQuantity}
            </label>
            <select
              value={state.itemsPerPage}
              onChange={(e) =>
                dispatch({
                  type: 'SET_ITEMS_PER_PAGE',
                  payload: Number(e.target.value),
                })
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {config.quantitiesAvailable.map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            {translation.campaigns.applyFilters}
          </button>
        </form>
      </div>
    </div>
  );
}
