import React from 'react';

import commonConstants from '../../../../../../../../config/common/constants';
import type {
  AudienceExtendedWithoutDate,
  RequirementData
} from '../../../../../../../../types/databaseObjects';
import { useTranslationContext } from '../../../../../../common/context/useTranslation';

interface Props {
  requirement: RequirementData & {
    type: 'pageViewsHistory';
  };
  setAudience: (
    audience: (
      AudienceExtendedWithoutDate: AudienceExtendedWithoutDate
    ) => AudienceExtendedWithoutDate
  ) => void;
}

const Element = ({ setAudience, requirement }: Props) => {
  const translation = useTranslationContext();

  const comparatorHistoryPermittedValues = [
    commonConstants.typeRepetitions.atLeast,
    commonConstants.typeRepetitions.atMost,
    commonConstants.typeRepetitions.moreThan,
    commonConstants.typeRepetitions.lessThan,
    commonConstants.typeRepetitions.exactly
  ];
  const limitHistoryPermittedValues = [
    commonConstants.limitTypes.session,
    commonConstants.limitTypes.oneDay,
    commonConstants.limitTypes.oneWeek,
    commonConstants.limitTypes.oneMonth,
    commonConstants.limitTypes.threeMonths
  ];

  const repetitionsHistoryMinValue = 0;
  const repetitionsHistoryMaxValue = 999;

  const handleOnChangeComparator = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newComparator = event.target
      .value as (typeof comparatorHistoryPermittedValues)[number];
    setAudience((audience) => {
      requirement.data.comparatorHistory = newComparator;

      return structuredClone(audience);
    });
  };

  const onHandleChangleRepetitions = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    const valueAsNumber = Math.round(event.target.valueAsNumber);

    let newRepetitions = Number.isNaN(valueAsNumber) ? 0 : valueAsNumber;
    newRepetitions = Math.trunc(newRepetitions);
    if (newRepetitions < repetitionsHistoryMinValue)
      newRepetitions = repetitionsHistoryMinValue;
    else if (newRepetitions > repetitionsHistoryMaxValue)
      newRepetitions = repetitionsHistoryMaxValue;
    event.target.value = String(newRepetitions);
    requirement.data.repetitionsHistory = newRepetitions;

    setAudience((audience) => {
      return structuredClone(audience);
    });
  };

  const handleOnChangeLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = event.target
      .value as (typeof limitHistoryPermittedValues)[number];
    setAudience((audience) => {
      requirement.data.limitHistory = newLimit;

      return structuredClone(audience);
    });
  };

  return (
    <>
      <select
        onChange={handleOnChangeComparator}
        value={requirement.data.comparatorHistory}
      >
        {comparatorHistoryPermittedValues.map((value) => (
          <option key={value} value={value}>
            {translation.common.requirement.comparator[value]}
          </option>
        ))}
      </select>
      <input
        max={repetitionsHistoryMaxValue}
        min={repetitionsHistoryMinValue}
        onChange={onHandleChangleRepetitions}
        step="1"
        type="number"
        value={requirement.data.repetitionsHistory}
      />
      <span>{'time(s) within'}</span>
      <select
        onChange={handleOnChangeLimit}
        value={requirement.data.limitHistory}
      >
        {limitHistoryPermittedValues.map((value) => (
          <option key={value} value={value}>
            {translation.common.requirement.limitHistory[value]}
          </option>
        ))}
      </select>
    </>
  );
};

export default Element;
