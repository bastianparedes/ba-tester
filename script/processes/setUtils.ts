import commonConstants from '../../config/common/constants';
import type { ba_tester } from '../types';
import cookie from '../utils/cookie';

declare global {
  interface Window {
    ba_tester: ba_tester;
  }
}

declare const INYECTED_CAMPAIGNS_DATA: typeof window.ba_tester.campaignsData;

const getDevice = () => {
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    );
  return isMobile
    ? commonConstants.devices.mobile
    : commonConstants.devices.desktop;
};

const script = () => {
  window.ba_tester = {
    campaignsData:
      undefined as unknown as typeof window.ba_tester.campaignsData,
    cookie,
    device: getDevice()
  };
};

export default script;
