import React from 'react';

import { useFiltersContext } from './context/filters';
import Filters from './Filters';
import Header from './Header';
import { getDateString } from './index.helper';
import StatusSpan from './StatusSpan';
import styles from './styles.module.scss';
import constants from '../../../../config/constants';
import type { AudienceWithDate } from '../../../../types/databaseObjects';
import { useTranslationContext } from '../../common/context/useTranslation';
import Table from '../../common/Table';

interface Props {
  audiences: AudienceWithDate[];
}

const IndexComponents = ({ audiences }: Props) => {
  const { order, orderBy, setOrder, setOrderBy } = useFiltersContext();
  const translation = useTranslationContext();

  const columns = [
    {
      id: constants.database.audience.id,
      label: translation.audiences.audiencesTable.id,
      width: 10
    },
    {
      id: constants.database.audience.name,
      label: translation.audiences.audiencesTable.audienceName,
      width: 50
    },
    {
      id: constants.database.audience.status,
      label: translation.audiences.audiencesTable.status,
      width: 20
    },
    {
      id: constants.database.audience.lastModifiedDate,
      label: translation.audiences.audiencesTable.lastModified,
      width: 20
    }
  ];

  const rows = audiences.map((audience) => ({
    href: constants.pages.audience + '?id=' + String(audience.id),
    id: Number(audience.id),
    labels: [
      audience.id,
      audience.name,
      <StatusSpan status={audience.status} key={audience.status} />,
      getDateString(audience.lastModifiedDate)
    ]
  }));

  return (
    <>
      <Header />
      <main className={styles.audiencesContainer}>
        <Table
          columns={columns}
          orderInfo={{
            order,
            orderBy,
            setOrder,
            setOrderBy
          }}
          rows={rows}
        />
        <Filters />
      </main>
    </>
  );
};

export default IndexComponents;
