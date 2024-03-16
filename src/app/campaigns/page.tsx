'use client';

import React, { useEffect, useState } from 'react';

import IndexComponents from './components';
import { FiltersProvider } from './components/context/filters';
import commonConstants from '../../../config/common/constants';
import constants from '../../../config/constants';
import { useLocalStorage } from '../../../utils/customHook';
import Loader from '../common/Loader';

const Index = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filterByStatusList, setFilterByStatusList] = useLocalStorage<
    (typeof commonConstants)['campaignStatus'][number][]
  >('filterByStatusList', [
    commonConstants.status.inactive,
    commonConstants.status.active
  ]);
  const [filterByname, setFilterByName] = useLocalStorage('filterByName', '');
  const [orderBy, setOrderBy] = useLocalStorage('orderBy', 'lastModifiedDate');
  const [order, setOrder] = useLocalStorage<'asc' | 'desc'>('order', 'desc');
  const [quantity, setQuantity] = useLocalStorage('quantity', 15);
  const [page, setPage] = useLocalStorage('page', 0);
  const [count, setCount] = useLocalStorage('count', 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(constants.api.campaign.read, {
        body: JSON.stringify({
          args: {
            name: filterByname,
            order,
            orderBy,
            page,
            quantity,
            statusList: filterByStatusList
          }
        }),
        method: 'POST'
      });

      const json = await response.json();
      setCampaigns(json.response.campaigns);
      setCount(json.response.count);
      setLoading(false);
    })();
  }, [
    filterByStatusList,
    filterByname,
    order,
    orderBy,
    page,
    quantity,
    setCount,
    setLoading
  ]);

  useEffect(() => {
    setPage(0);
  }, [filterByStatusList, filterByname, quantity, setPage]);

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
      {loading && <Loader />}
      <IndexComponents campaigns={campaigns} />
    </FiltersProvider>
  );
};

export default Index;
