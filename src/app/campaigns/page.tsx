'use client';

import React, { useEffect, useState } from 'react';

import IndexComponents from './_components';
import { FiltersProvider } from './_components/context/filters';
import commonConstants from '../../config/common/constants';
import type { TypeCampaign } from '@/types/databaseObjects';
import Loader from './_components/Loader';
import api from '@/app/api/client';

const Page = () => {
  const [campaigns, setCampaigns] = useState<TypeCampaign[]>([]);
  const [filterByStatusList, setFilterByStatusList] = useState<(typeof commonConstants)['campaignStatus'][number][]>([
    commonConstants.status.inactive,
    commonConstants.status.active,
  ]);
  const [filterByname, setFilterByName] = useState('');
  const [orderBy, setOrderBy] = useState<'status' | 'name' | 'id'>('name');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [quantity, setQuantity] = useState(15);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await api.getCampaigns({
        queryParams: {
          name: filterByname,
          orderBy: orderBy,
          orderDirection: order,
          page: page,
          quantity: quantity,
          statusList: filterByStatusList,
        },
      });
      if (!response.ok) {
        setIsLoading(false);
        return;
      }
      const json = await response.json();
      setCampaigns(json.data.campaigns);
      setCount(json.data.count);
      setIsLoading(false);
    })();
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
      {isLoading && <Loader />}
      <IndexComponents campaigns={campaigns} />
    </FiltersProvider>
  );
};

export default Page;
