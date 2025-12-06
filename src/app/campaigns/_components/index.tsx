import React from 'react';

import { useFiltersContext } from './context/filters';
import Filters from './Filters';
import Header from './Header';
import StatusSpan from './StatusSpan';
import styles from './styles.module.scss';
import constants from '../../../config/constants';
import type { TypeCampaign } from '@/types/databaseObjects';
import { useTranslationContext } from '../_contexts/useTranslation';
import Table from './Table';
import Pagination from '@mui/material/Pagination';

interface Props {
  campaigns: TypeCampaign[];
}

const IndexComponents = ({ campaigns }: Props) => {
  const translation = useTranslationContext();
  const { order, orderBy, setOrder, setOrderBy, quantity, page, count, setPage } = useFiltersContext();

  const columns = [
    {
      id: constants.database.campaign.id,
      label: translation.campaigns.camapaignsTable.id,
      width: 10,
    },
    {
      id: constants.database.campaign.name,
      label: translation.campaigns.camapaignsTable.campaignName,
      width: 50,
    },
    {
      id: constants.database.campaign.status,
      label: translation.campaigns.camapaignsTable.status,
      width: 20,
    },
  ];

  const rows = campaigns.map((campaign) => ({
    href: constants.pages.campaign + '?id=' + String(campaign.id),
    id: Number(campaign.id),
    labels: [campaign.id, campaign.name, <StatusSpan status={campaign.status} key={campaign.status} />],
  }));

  const totalPages = Math.floor(count / quantity);

  const handleOnChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(() => Number(value - 1));
  };

  return (
    <>
      <Header />
      <main className={styles.campaignsContainer}>
        <div className={styles['table-and-pagination']}>
          <Table
            columns={columns}
            orderInfo={{
              order,
              orderBy,
              setOrder,
              setOrderBy: setOrderBy as any,
            }}
            rows={rows}
          />
          <div className={styles.pagination}>
            <Pagination count={totalPages + 1} page={page + 1} onChange={handleOnChange} />
          </div>
        </div>
        <Filters />
      </main>
    </>
  );
};

export default IndexComponents;
