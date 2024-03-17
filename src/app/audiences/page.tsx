'use client';

import React, { useEffect, useState } from 'react';

import IndexComponents from './components';
import { FiltersProvider } from './components/context/filters';
import commonConstants from '../../../config/common/constants';
import constants from '../../../config/constants';
import Loader from '../common/Loader';

const Index = () => {
  const [audiences, setAudiences] = useState([]);
  const [filterByStatusList, setFilterByStatusList] = useState<
    (typeof commonConstants)['audienceStatus'][number][]
  >([commonConstants.status.active]);
  const [filterByname, setFilterByName] = useState('');
  const [orderBy, setOrderBy] = useState('lastModifiedDate');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [quantity, setQuantity] = useState(15);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch(constants.api.audience.read, {
        body: JSON.stringify({
          args: {
            name: filterByname.toLocaleLowerCase(),
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
      setAudiences(json.response.audiences);
      setCount(json.response.count);
      setLoading(false);
    })();
  }, [filterByStatusList, filterByname, order, orderBy, page, quantity]);

  useEffect(() => {
    setPage(0);
  }, [filterByStatusList, filterByname, quantity]);

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
      <IndexComponents audiences={audiences} />
    </FiltersProvider>
  );
};

export default Index;
