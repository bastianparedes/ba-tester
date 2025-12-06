import React from 'react';

import commonConstants from '../../../../../../../../config/common/constants';
import type { TypeCampaignExtended } from '@/types/databaseObjects';
import { useTranslationContext } from '../../../../../../_contexts/useTranslation';

interface Props {
  requirement: TypeCampaignExtended['requirements']['data']['children'][number];
  setCampaign: (
    campaign: (TypeCampaignExtended: TypeCampaignExtended) => TypeCampaignExtended,
  ) => void;
}

const Element = ({ setCampaign, requirement }: Props) => {
  const translation = useTranslationContext();
  if (
    requirement.type !== 'cookie' &&
    requirement.type !== 'localStorage' &&
    requirement.type !== 'sessionStorage' &&
    requirement.type !== 'queryParam'
  )
    throw new Error('Type cookie or localStorage or sessionStorage or queryParam expected in requirement');

  const comparatorPermittedValues = [
    commonConstants.comparisons.contains,
    commonConstants.comparisons.doesNotContain,
    commonConstants.comparisons.exists,
    commonConstants.comparisons.doesNotExist,
    commonConstants.comparisons.is,
    commonConstants.comparisons.isNot,
  ];

  const handleOnChangeName = (event: React.FocusEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    requirement.data.name = newName;
    setCampaign((campaign) => {
      return structuredClone(campaign);
    });
  };

  const handleOnChangeComparator = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newComparator = event.target.value as (typeof comparatorPermittedValues)[number];
    requirement.data.comparator = newComparator;

    if (requirement.data.comparator === 'exists' || requirement.data.comparator === 'doesNotExist')
      requirement.data = {
        comparator: requirement.data.comparator,
        name: requirement.data.name,
      };

    setCampaign((campaign) => {
      return structuredClone(campaign);
    });
  };

  const handleOnChangeValue = (event: React.FocusEvent<HTMLInputElement>) => {
    if (
      requirement.data.comparator !== commonConstants.comparisons.contains &&
      requirement.data.comparator !== commonConstants.comparisons.doesNotContain &&
      requirement.data.comparator !== commonConstants.comparisons.is &&
      requirement.data.comparator !== commonConstants.comparisons.isNot
    )
      return;
    const newValue = event.target.value;
    requirement.data.value = newValue;
    setCampaign((campaign) => {
      return structuredClone(campaign);
    });
  };

  return (
    <>
      <input
        value={requirement.data.name}
        onChange={handleOnChangeName}
        placeholder={translation.common.requirement.placeholder[requirement.type].name}
        type="text"
      />
      <select onChange={handleOnChangeComparator} value={requirement.data.comparator}>
        {comparatorPermittedValues.map((value) => (
          <option key={value} value={value}>
            {translation.common.requirement.comparator[value]}
          </option>
        ))}
      </select>
      {(requirement.data.comparator === commonConstants.comparisons.contains ||
        requirement.data.comparator === commonConstants.comparisons.doesNotContain ||
        requirement.data.comparator === commonConstants.comparisons.is ||
        requirement.data.comparator === commonConstants.comparisons.isNot) && (
        <input
          value={requirement.data.value}
          onChange={handleOnChangeValue}
          placeholder={translation.common.requirement.placeholder[requirement.type].value}
          type="text"
        />
      )}
    </>
  );
};

export default Element;
