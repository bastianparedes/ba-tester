'use client';

import React, { useEffect, useState } from 'react';

import IndexComponents from './_components';
import { FiltersProvider } from './_components/context/filters';
import commonConstants from '../../../config/common/constants';
import { trpcClient } from '../../../lib/trpc/client';
import type { CampaignWithDate } from '../../../types/databaseObjects';
import Loader from './_components/Loader';

const Page = () => {
  const [campaigns, setCampaigns] = useState<CampaignWithDate[]>([]);
  const [filterByStatusList, setFilterByStatusList] = useState<
    (typeof commonConstants)['campaignStatus'][number][]
  >([commonConstants.status.inactive, commonConstants.status.active]);
  const [filterByname, setFilterByName] = useState('');
  const [orderBy, setOrderBy] = useState<
    'status' | 'name' | 'id' | 'lastModifiedDate'
  >('lastModifiedDate');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [quantity, setQuantity] = useState(15);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const getCampaigns = trpcClient.getCampaigns.useMutation({
    onSettled(data, error) {
      if (error !== null) return;
      if (data === undefined) return;
      setCampaigns(data.campaigns);
      setCount(data.count);
    }
  });

  useEffect(() => {
    getCampaigns.mutate({
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
      {(getCampaigns.isPending || isLoading) && <Loader />}
      <IndexComponents campaigns={campaigns} />
    </FiltersProvider>
  );
};

export default Page;
