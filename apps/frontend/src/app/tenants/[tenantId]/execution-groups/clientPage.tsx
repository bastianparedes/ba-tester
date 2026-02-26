'use client';

import Pagination from '@mui/material/Pagination';
import { ChevronDown, ChevronUp, Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useEffect, useReducer, useState } from 'react';
import { Button } from '@/app/_common/components/button';
import { useDialogStore } from '@/app/_common/contexts/Dialog/state';
import { useTranslationContext } from '@/app/_common/contexts/Translation';
import { useUser } from '@/app/_common/contexts/User';
import config from '@/config/constants';
import { quantitiesAvailable } from '@/domain/config';
import type { TypeDirection, TypeExecutionGroup, TypeOrderExecutionGroupsBy } from '@/domain/types';
import { apiCaller } from '@/libs/restClient';

type UiState = {
  sortConfig: { key: TypeOrderExecutionGroupsBy; direction: TypeDirection };
  nameFilter: string;
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
};

type UiAction =
  | { type: 'SET_SORT'; payload: TypeOrderExecutionGroupsBy }
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

  const [executionGroups, setExecutionGroups] = useState<(TypeExecutionGroup & { campaignsCount: number })[]>([]);
  const [state, dispatch] = useReducer(
    (state: UiState, action: UiAction): UiState => {
      switch (action.type) {
        case 'SET_SORT': {
          if (state.sortConfig.key !== action.payload)
            return {
              ...state,
              sortConfig: { key: action.payload, direction: 'asc' },
              currentPage: 0,
            };

          const newDirection = {
            asc: 'desc' as const,
            desc: 'asc' as const,
          }[state.sortConfig.direction];
          return {
            ...state,
            sortConfig: { ...state.sortConfig, direction: newDirection },
            currentPage: 0,
          };
        }
        case 'SET_NAME_FILTER':
          return { ...state, nameFilter: action.payload };
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
      nameFilter: '',
      itemsPerPage: quantitiesAvailable[0],
      totalItems: 0,
      currentPage: 0,
    },
  );

  const queryCampaigns = async (
    args: Partial<{
      textSearch: string;
      orderBy: 'name' | 'id';
      orderDirection: TypeDirection;
      page: number;
      quantity: number;
    }> = {},
  ) => {
    const result = await apiCaller.executionGroups.getMany({
      pathParams: { tenantId },
      queryParams: {
        textSearch: state.nameFilter,
        orderBy: state.sortConfig.key,
        orderDirection: state.sortConfig.direction,
        page: state.currentPage,
        quantity: state.itemsPerPage,
        ...args,
      },
    });

    if (result.ok) {
      const json = await result.json();
      setExecutionGroups(json.executionGroups);
      dispatch({ type: 'SET_TOTAL_ITEMS', payload: json.count });
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

  const SortIcon = ({ column }: { column: TypeOrderExecutionGroupsBy }) => {
    if (state.sortConfig.key !== column) {
      return <span className="text-slate-400 ml-1">⇅</span>;
    }
    return state.sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4 ml-1 inline" /> : <ChevronDown className="w-4 h-4 ml-1 inline" />;
  };

  const confirm = useDialogStore((state) => state.confirm);

  const deleteExecutionGroup = async ({ executionGroup }: { executionGroup: TypeExecutionGroup }) => {
    const result = await confirm({
      title: `Delete execution group (id: ${executionGroup.id}) "${executionGroup.name}"`,
      description: 'You are about to delete an execution group and this change can not be undone. Are you sure tou want to delete this execution group?',
    });
    if (!result) return;
    await apiCaller.executionGroups.delete({ pathParams: { tenantId, executionGroupId: executionGroup.id } });
    location.reload();
  };

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{translation.executionGroups.headerTitle}</h1>
            <p className="text-slate-600">{translation.executionGroups.headerSubTitle}</p>
          </div>
          <Button
            disabled={!user.permissions.canCreateCampaign}
            href={user.permissions.canCreateCampaign ? config.pages.executionGroup({ tenantId, executionGroupId: undefined }) : undefined}
          >
            <PlusCircle />
            {translation.executionGroups.createButton}
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
                    {translation.executionGroups.tableId}
                    <SortIcon column="id" />
                  </th>
                  <th
                    onClick={() => dispatch({ type: 'SET_SORT', payload: 'name' })}
                    className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-slate-700 transition-colors select-none"
                  >
                    {translation.executionGroups.tableName}
                    <SortIcon column="name" />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">{translation.executionGroups.tableQuantityCampaigns}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Modify</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {executionGroups.length > 0 ? (
                  executionGroups.map((executionGroup) => (
                    <tr key={executionGroup.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-700 font-medium">
                        <a
                          href={
                            user.permissions.canReadCampaign
                              ? config.pages.executionGroup({
                                  tenantId,
                                  executionGroupId: executionGroup.id,
                                })
                              : ''
                          }
                        >
                          {executionGroup.id}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-semibold">
                        <a
                          href={
                            user.permissions.canReadCampaign
                              ? config.pages.executionGroup({
                                  tenantId,
                                  executionGroupId: executionGroup.id,
                                })
                              : ''
                          }
                        >
                          {executionGroup.name}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-slate-900 font-semibold">
                        <a
                          href={
                            user.permissions.canReadCampaign
                              ? config.pages.executionGroup({
                                  tenantId,
                                  executionGroupId: executionGroup.id,
                                })
                              : ''
                          }
                        >
                          {executionGroup.campaignsCount}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-left">
                        <button
                          type="button"
                          disabled={!user.permissions.canUpdateExecutionGroup}
                          onClick={() => {
                            location.href = config.pages.executionGroup({
                              tenantId,
                              executionGroupId: executionGroup.id,
                            });
                          }}
                          className="p-3 text-blue-500 hover:enabled:bg-blue-200 rounded-lg transition-colors disabled:opacity-80 disabled:cursor-not-allowed"
                        >
                          <Pencil size={20} />
                        </button>
                      </td>
                      <td className="px-6 py-4 text-left">
                        <button
                          type="button"
                          disabled={!user.permissions.canDeleteExecutionGroup}
                          onClick={() => deleteExecutionGroup({ executionGroup })}
                          className="p-3 text-red-500 hover:bg-red-200 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      {translation.executionGroups.noData}
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
        <h2 className="text-xl font-bold text-slate-900 mb-6">{translation.executionGroups.filtersTitle}</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onApplyFilters();
          }}
        >
          <div className="mb-6">
            <span className="block text-sm font-semibold text-slate-700 mb-2">{translation.executionGroups.filtersText}</span>
            <input
              type="text"
              value={state.nameFilter}
              onChange={(e) => dispatch({ type: 'SET_NAME_FILTER', payload: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <span className="block text-sm font-semibold text-slate-700 mb-2">{translation.executionGroups.filtersQuantity}</span>
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
              {quantitiesAvailable.map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
            {translation.executionGroups.applyFilters}
          </button>
        </form>
      </div>
    </div>
  );
}
