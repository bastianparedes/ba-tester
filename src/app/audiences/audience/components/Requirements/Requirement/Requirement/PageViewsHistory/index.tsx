import type { AudienceExtendedWithoutDate } from '../../../../../../../../../types/databaseObjects';

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

const Element = ({ requirement }: Props) => {
  if (requirement.type !== 'pageViewsHistory')
    throw new Error('Type device expected in requirement');
  return null;
};

export default Element;
