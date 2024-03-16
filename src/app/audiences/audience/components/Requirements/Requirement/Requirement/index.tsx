import React from 'react';

import PageViewsHistory from './PageViewsHistory';
import commonConstants from '../../../../../../../../config/common/constants';
import type { AudienceExtendedWithoutDate } from '../../../../../../../../types/databaseObjects';

interface Props {
  requirement: Exclude<
    AudienceExtendedWithoutDate['requirements']['data']['children'][number],
    { type: 'node' }
  >;
  setAudience: (
    audience: (
      AudienceExtendedWithoutDate: AudienceExtendedWithoutDate
    ) => AudienceExtendedWithoutDate
  ) => void;
}

const Element = ({ setAudience, requirement }: Props) => {
  const requirements = {
    [commonConstants.requirementTypes.pageViewsHistory]: PageViewsHistory
  };

  const Requirement = requirements[requirement.type];
  return <Requirement setAudience={setAudience} requirement={requirement} />;
};

export default Element;
