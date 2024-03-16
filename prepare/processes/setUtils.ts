import commonConstants from '../../config/common/constants';
import type { ba_tester } from '../types';
import cookie from '../utils/cookie';

declare global {
  interface Window {
    _satellite?: {
      track?: (arg0: string) => void;
    };
    ba_tester: ba_tester;
  }
}

declare const INYECTED_AUDIENCES_DATA: typeof window.ba_tester.audiencesData;
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

const satelliteTrack = (arg: string) => {
  const interval = setInterval(() => {
    if (window?._satellite?.track !== undefined) {
      window._satellite.track(arg);
      clearInterval(interval);
    }
  }, 100);
};

const script = () => {
  window.ba_tester = {
    audiencesData: INYECTED_AUDIENCES_DATA,
    campaignsData: INYECTED_CAMPAIGNS_DATA,
    cookie,
    device: getDevice(),
    satelliteTrack
  };
};

export default script;
