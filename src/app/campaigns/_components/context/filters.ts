import constate from 'constate';

type permittedStatus = 'inactive' | 'active' | 'deleted';

interface Props {
  filterByStatusList: permittedStatus[];
  filterByname: string;
  order: 'asc' | 'desc';
  orderBy: string;
  quantity: number;
  page: number;
  count: number;
  setFilterByStatusList: (arg0: (arg1: permittedStatus[]) => typeof arg1) => void;
  setFilterByName: (arg0: (arg1: string) => typeof arg1) => void;
  setOrder: (arg0: (arg1: 'asc' | 'desc') => typeof arg1) => void;
  setOrderBy: (arg0: (arg1: 'status' | 'name' | 'id') => typeof arg1) => void;
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
  const addToFilterByStatusList = (newStatus: permittedStatus) => {
    if (filterByStatusList.includes(newStatus)) return;
    setFilterByStatusList((previousState) => structuredClone([...previousState, newStatus]));
  };

  const removeFromFilterByStatusList = (oldStatus: permittedStatus) => {
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
