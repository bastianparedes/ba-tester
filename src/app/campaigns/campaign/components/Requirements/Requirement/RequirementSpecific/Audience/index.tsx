import React from 'react';

import styles from './styles.module.scss';
import type { CampaignExtendedWithoutDate } from '../../../../../../../../../types/databaseObjects';

interface Props {
  audiences: {
    id: number;
    name: string;
  }[];
  requirement: CampaignExtendedWithoutDate['requirements']['data']['children'][number];
  setCampaign: (
    campaign: (
      CampaignExtendedWithoutDate: CampaignExtendedWithoutDate
    ) => CampaignExtendedWithoutDate
  ) => void;
}

const Element = ({ audiences, setCampaign, requirement }: Props) => {
  if (requirement.type !== 'audience')
    throw new Error('Type audience expected in requirement');

  const handleOnChangeIdAudience = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newIdAudience = JSON.parse(event.target.value) as number | undefined;
    requirement.data.id = newIdAudience;
    setCampaign((campaign) => {
      return structuredClone(campaign);
    });
  };

  return (
    <>
      <select
        onChange={handleOnChangeIdAudience}
        value={requirement.data.id}
        className={styles.select}
      >
        {audiences.length === 0 ? (
          <option value={undefined}>No Audiences available</option>
        ) : (
          audiences.map((audience) => (
            <option key={audience.id} value={audience.id}>
              {audience.id}: {audience.name}
            </option>
          ))
        )}
      </select>
    </>
  );
};

export default Element;
