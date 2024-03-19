'use client';

import React, { useEffect, useState } from 'react';

import IndexComponents from './components';
import { FiltersProvider } from './components/context/filters';
import commonConstants from '../../../config/common/constants';
import { trpcClient } from '../../../lib/trpc/client';
import type { AudienceWithDate } from '../../../types/databaseObjects';
import { useLocalStorage } from '../../../utils/customHook';
import Loader from '../common/Loader';

const Index = () => {
  const [audiences, setAudiences] = useState<AudienceWithDate[]>([]);
  const [filterByStatusList, setFilterByStatusList] = useLocalStorage<
    (typeof commonConstants)['campaignStatus'][number][]
  >('filterByStatusList', [
    commonConstants.status.inactive,
    commonConstants.status.active
  ]);
  const [filterByname, setFilterByName] = useLocalStorage('filterByName', '');
  const [orderBy, setOrderBy] = useLocalStorage<
    'status' | 'name' | 'id' | 'lastModifiedDate'
  >('orderBy', 'lastModifiedDate');
  const [order, setOrder] = useLocalStorage<'asc' | 'desc'>('order', 'desc');
  const [quantity, setQuantity] = useLocalStorage('quantity', 15);
  const [page, setPage] = useLocalStorage('page', 0);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useLocalStorage('count', 0);
  const getAudiences = trpcClient.getAudiences.useMutation({
    onSettled(data, error) {
      if (error !== null) return;
      if (data === undefined) return;
      setAudiences(data.audiences);
      setCount(data.count);
    }
  });

  useEffect(() => {
    getAudiences.mutate({
      name: filterByname,
      orderBy: orderBy,
      orderDirection: order,
      page: page,
      quantity: quantity,
      statusList: filterByStatusList
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByStatusList, filterByname, order, orderBy, page, quantity]);

  useEffect(() => {
    setPage(0);
  }, [filterByStatusList, filterByname, quantity, setPage]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <FiltersProvider
      count={count}
      filterByStatusList={filterByStatusList}
      filterByname={filterByname}
      order={order}
      orderBy={orderBy}
      page={page}
      quantity={quantity}
      setFilterByStatusList={setFilterByStatusList}
      setFilterByName={setFilterByName}
      setOrder={setOrder}
      setOrderBy={setOrderBy}
      setPage={setPage}
      setQuantity={setQuantity}
    >
      {(getCampaigns.isLoading || isLoading) && <Loader />}
      <IndexComponents audiences={audiences} />
    </FiltersProvider>
  );
};

export default Index;
