import commonConstants from '@/domain/constants';
import type { TypeCampaignWithOptionalId } from '@/domain/types';
import Custom from './Custom';
import Device from './Device';
import Storage from './Storage';
import Url from './Url';

interface Props {
  requirement: Exclude<TypeCampaignWithOptionalId['requirements']['data']['children'][number], { type: 'node' }>;
  setCampaign: (campaign: (TypeCampaign: TypeCampaignWithOptionalId) => TypeCampaignWithOptionalId) => void;
}

const Element = ({ setCampaign, requirement }: Props) => {
  const requirements = {
    [commonConstants.requirementTypes.cookie]: Storage,
    [commonConstants.requirementTypes.custom]: Custom,
    [commonConstants.requirementTypes.device]: Device,
    [commonConstants.requirementTypes.localStorage]: Storage,
    [commonConstants.requirementTypes.queryParam]: Storage,
    [commonConstants.requirementTypes.sessionStorage]: Storage,
    [commonConstants.requirementTypes.url]: Url,
  };

  const Requirement = requirements[requirement.type];
  return <Requirement setCampaign={setCampaign} requirement={requirement} />;
};

export default Element;
