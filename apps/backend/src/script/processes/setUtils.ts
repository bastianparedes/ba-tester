import commonConstants from '../../../../domain/constants';
import type { TypeBaTester } from '../types';
import cookie from '../utils/cookie';

declare global {
  interface Window {
    ba_tester: TypeBaTester;
  }
}

const getDevice = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
  return isMobile ? commonConstants.devices.mobile : commonConstants.devices.desktop;
};

export const setUtils = () => {
  window[commonConstants.windowKey] = {
    ...(window[commonConstants.windowKey] ?? {}),
    cookie,
    device: getDevice(),
  };
};
