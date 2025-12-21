import { comparatorResolver } from './comparatorResolver';
import commonConstants from '../../../config/common/constants';
import { type TypeDeviceRequirement } from '@/types/db/requirement';

const requirementDevice = (requirement: TypeDeviceRequirement) => {
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
