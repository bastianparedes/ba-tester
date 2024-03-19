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
  if (requirement.type !== 'url')
    throw new Error('Type url expected in requirement');

  const translation = useTranslationContext();
  const comparatorPermittedValues = [
    commonConstants.comparisons.contains,
    commonConstants.comparisons.doesNotContain,
    commonConstants.comparisons.is,
    commonConstants.comparisons.isNot
  ];

  const handleOnChangeValue = (event: React.FocusEvent<HTMLInputElement>) => {
    setCampaign((campaign) => {
      const newValue = event.target.value;
      requirement.data.value = newValue;
      return structuredClone(campaign);
    });
  };

  const handleOnChangeComparator = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newComparator = event.target
      .value as (typeof comparatorPermittedValues)[number];
    requirement.data.comparator = newComparator;
    setCampaign((campaign) => {
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
      <input
        value={requirement.data.value}
        onChange={handleOnChangeValue}
        placeholder={translation.common.requirement.type[requirement.type]}
        type="text"
      />
    </>
  );
};

export default Element;
