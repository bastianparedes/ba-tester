import React from 'react';

import { useFiltersContext } from './context/filters';
import Filters from './Filters';
import Header from './Header';
import { getDateString } from './index.helper';
import StatusSpan from './StatusSpan';
import styles from './styles.module.scss';
import constants from '../../../../config/constants';
import type { CampaignWithDate } from '../../../../types/databaseObjects';
import { useTranslationContext } from '../../common/context/useTranslation';
import Table from '../../common/Table';

interface Props {
  campaigns: CampaignWithDate[];
}

const IndexComponents = ({ campaigns }: Props) => {
  const translation = useTranslationContext();
  const { order, orderBy, setOrder, setOrderBy } = useFiltersContext();

  const columns = [
    {
      id: constants.database.campaign.id,
      label: translation.campaigns.camapaignsTable.id,
      width: 10
    },
    {
      id: constants.database.campaign.name,
      label: translation.campaigns.camapaignsTable.campaignName,
      width: 50
    },
    {
      id: constants.database.campaign.status,
      label: translation.campaigns.camapaignsTable.status,
      width: 20
    },
    {
      id: constants.database.campaign.lastModifiedDate,
      label: translation.campaigns.camapaignsTable.lastModified,
      width: 20
    }
  ];

  const rows = campaigns.map((campaign) => ({
    href: constants.pages.campaign + '?id=' + String(campaign.id),
    id: Number(campaign.id),
    labels: [
      campaign.id,
      campaign.name,
      <StatusSpan status={campaign.status} key={campaign.status} />,
      getDateString(campaign.lastModifiedDate)
    ]
  }));

  return (
    <>
      <Header />
      <main className={styles.campaignsContainer}>
        <Table
          columns={columns}
          orderInfo={{
            order,
            orderBy,
            setOrder,
            setOrderBy: setOrderBy as any
          }}
          rows={rows}
        />
        <Filters />
      </main>
    </>
  );
};

export default IndexComponents;
