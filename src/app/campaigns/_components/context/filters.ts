import constate from 'constate';
import { TypeOrderBy, TypeStatus, TypeOrderDirection } from '@/types/db';

interface Props {
  filterByStatusList: TypeStatus[];
  filterByname: string;
  order: TypeOrderDirection;
  orderBy: string;
  quantity: number;
  page: number;
  count: number;
  setFilterByStatusList: (arg0: (arg1: TypeStatus[]) => typeof arg1) => void;
  setFilterByName: (arg0: (arg1: string) => typeof arg1) => void;
  setOrder: (arg0: (arg1: TypeOrderDirection) => typeof arg1) => void;
  setOrderBy: (arg0: (arg1: TypeOrderBy) => typeof arg1) => void;
  setPage: (arg0: (arg1: number) => typeof arg1) => void;
  setQuantity: (arg0: (arg1: number) => typeof arg1) => void;
}

const useFilters = ({
  filterByStatusList,
  filterByname,
  order,
  orderBy,
  page,
  quantity,
  count,
  setFilterByStatusList,
  setFilterByName,
  setOrder,
  setOrderBy,
  setPage,
  setQuantity,
}: Props) => {
  const addToFilterByStatusList = (newStatus: TypeStatus) => {
    if (filterByStatusList.includes(newStatus)) return;
    setFilterByStatusList((previousState) => structuredClone([...previousState, newStatus]));
  };

  const removeFromFilterByStatusList = (oldStatus: TypeStatus) => {
    if (!filterByStatusList.includes(oldStatus)) return;
    setFilterByStatusList((previousState) => previousState.filter((status) => status !== oldStatus));
  };

  return {
    addToFilterByStatusList,
    count,
    filterByStatusList,
    filterByname,
    order,
    orderBy,
    page,
    quantity,
    removeFromFilterByStatusList,
    setFilterByName,
    setOrder,
    setOrderBy,
    setPage,
    setQuantity,
  };
};

const [FiltersProvider, useFiltersContext] = constate(useFilters);
export { FiltersProvider, useFiltersContext };
