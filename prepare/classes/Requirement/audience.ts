import commonConstants from '../../../config/common/constants';
import { audienceRecords } from '../../config/globalObjects';
import type { ba_tester } from '../../types';
import Audience from '../Audience';

type RequirementData = (
  | ba_tester['audiencesData']
  | ba_tester['campaignsData']
)[number]['requirements']['data']['children'][number];

const requirementAudience = async (requirement: RequirementData) => {
  if (requirement.type !== 'audience')
    throw new Error('Type audience expected in requirement');
  const id = requirement.data.id;
  if (id === undefined) return false;
  if (id in audienceRecords) return audienceRecords[id];

  const audienceData = window.ba_tester.audiencesData.find(
    (audienceInlist) => audienceInlist.id === id
  );
  if (audienceData === undefined) return false;
  if (audienceData.status === commonConstants.status.deleted) return true;

  const audience = new Audience(audienceData.requirements);
  const result = await audience.evaluate();
  audienceRecords[id] = result;
  return result;
};

export default requirementAudience;
