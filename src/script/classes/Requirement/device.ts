import comparatorResolver from './comparatorResolver';
import commonConstants from '../../../config/common/constants';
import type { ba_tester } from '@/script/types';

type RequirementData = ba_tester['campaignsData'][number]['requirements']['data']['children'][number];

const requirementDevice = (requirement: RequirementData) => {
  if (requirement.type !== 'device') throw new Error('Type device expected in requirement');

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent,
    );
  const device = isMobile ? commonConstants.devices.mobile : commonConstants.devices.desktop;

  return comparatorResolver({
    comparator: requirement.data.comparator,
    expectedValue: requirement.data.device,
    obtainedValue: device,
  });
};

export default requirementDevice;
