import React from 'react';

import commonConstants from '../../../../../../../../../config/common/constants';
import type { CampaignExtendedWithoutDate } from '../../../../../../../../../types/databaseObjects';
import { useTranslationContext } from '../../../../../../_contexts/useTranslation';

interface Props {
  requirement: CampaignExtendedWithoutDate['requirements']['data']['children'][number];
  setCampaign: (
    campaign: (
      CampaignExtendedWithoutDate: CampaignExtendedWithoutDate
    ) => CampaignExtendedWithoutDate
  ) => void;
}

const Element = ({ setCampaign, requirement }: Props) => {
  const translation = useTranslationContext();

  if (requirement.type !== 'device')
    throw new Error('Type device expected in requirement');

  const comparatorPermittedValues = [
    commonConstants.comparisons.is,
    commonConstants.comparisons.isNot
  ];
  const devicePermittedValues = [
    commonConstants.devices.desktop,
    commonConstants.devices.mobile
  ];

  const handleOnChangeComparator = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newComparator = event.target
      .value as (typeof comparatorPermittedValues)[number];
    setCampaign((campaign) => {
      requirement.data.comparator = newComparator;
      return structuredClone(campaign);
    });
  };

  const handleOnChangeDevice = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newDevice = event.target
      .value as (typeof devicePermittedValues)[number];
    setCampaign((campaign) => {
      requirement.data.device = newDevice;
      return structuredClone(campaign);
    });
  };

  return (
    <>
      <select
        onChange={handleOnChangeComparator}
        value={requirement.data.comparator}
      >
        {comparatorPermittedValues.map((value) => (
          <option key={value} value={value}>
            {translation.common.requirement.comparator[value]}
          </option>
        ))}
      </select>
      <select onChange={handleOnChangeDevice} value={requirement.data.device}>
        {devicePermittedValues.map((value) => (
          <option key={value} value={value}>
            {translation.common.requirement.device[value]}
          </option>
        ))}
      </select>
    </>
  );
};

export default Element;
