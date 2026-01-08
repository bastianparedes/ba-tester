import Custom from './Custom';
import Device from './Device';
import Storage from './Storage';
import Url from './Url';
import commonConstants from '@/config/common/constants';
import type { TypeCampaign } from '@/types/domain';

interface Props {
  requirement: Exclude<TypeCampaign['requirements']['data']['children'][number], { type: 'node' }>;
  setCampaign: (campaign: (TypeCampaign: TypeCampaign) => TypeCampaign) => void;
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
